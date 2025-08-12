import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { blogPosts } from '@/lib/schema'
import { eq, desc, and, like, sql } from 'drizzle-orm'
import slugify from 'slugify'

const BlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

// GET /api/blog - List blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'published'
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = db.select().from(blogPosts)

    // Build WHERE conditions
    const conditions = []
    if (status) {
      conditions.push(eq(blogPosts.status, status))
    }
    if (category) {
      conditions.push(eq(blogPosts.category, category))
    }
    if (search) {
      conditions.push(
        sql`(${blogPosts.title} ILIKE ${`%${search}%`} OR ${blogPosts.content} ILIKE ${`%${search}%`})`
      )
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions))
    }

    // Apply ordering and pagination
    const posts = await query
      .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset)

    // Get total count for pagination
    const totalQuery = db.select({ count: sql<number>`count(*)` }).from(blogPosts)
    if (conditions.length > 0) {
      totalQuery.where(and(...conditions))
    }
    const [{ count: total }] = await totalQuery

    return NextResponse.json({
      posts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Blog listing error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST /api/blog - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const data = BlogPostSchema.parse(body)
    
    // Generate slug from title
    const baseSlug = slugify(data.title, { lower: true, strict: true })
    
    // Check if slug exists and make it unique
    let slug = baseSlug
    let counter = 1
    while (true) {
      const existing = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1)
      if (existing.length === 0) break
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Create blog post
    const newPost = await db.insert(blogPosts).values({
      title: data.title,
      slug,
      content: data.content,
      excerpt: data.excerpt,
      featuredImage: data.featuredImage,
      category: data.category,
      tags: data.tags,
      status: data.status,
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || data.excerpt,
      publishedAt: data.status === 'published' ? new Date() : null,
    }).returning()

    return NextResponse.json({
      success: true,
      post: newPost[0],
    })
  } catch (error) {
    console.error('Blog creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid blog post data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}