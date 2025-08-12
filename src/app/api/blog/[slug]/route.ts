import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { blogPosts } from '@/lib/schema'
import { eq, sql } from 'drizzle-orm'

const BlogPostUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

// GET /api/blog/[slug] - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Get blog post
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1)

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await db.update(blogPosts)
      .set({ 
        viewCount: sql`${blogPosts.viewCount} + 1`,
        updatedAt: new Date()
      })
      .where(eq(blogPosts.id, post.id))

    return NextResponse.json({
      post: {
        ...post,
        viewCount: post.viewCount + 1
      }
    })
  } catch (error) {
    console.error('Blog fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// PUT /api/blog/[slug] - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const body = await request.json()
    
    // Validate the request body
    const data = BlogPostUpdateSchema.parse(body)

    // Check if post exists
    const [existingPost] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1)

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Update blog post
    const updateData: any = {
      ...data,
      updatedAt: new Date(),
    }

    // Set publishedAt if status is changing to published
    if (data.status === 'published' && existingPost.status !== 'published') {
      updateData.publishedAt = new Date()
    }

    const [updatedPost] = await db.update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.slug, slug))
      .returning()

    return NextResponse.json({
      success: true,
      post: updatedPost,
    })
  } catch (error) {
    console.error('Blog update error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid blog post data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE /api/blog/[slug] - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Check if post exists
    const [existingPost] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1)

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Delete blog post
    await db.delete(blogPosts).where(eq(blogPosts.slug, slug))

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    })
  } catch (error) {
    console.error('Blog deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}