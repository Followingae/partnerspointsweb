import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fileUploads } from '@/lib/schema'
import { uploadImageFile, validateImageFile } from '@/lib/upload'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const uploadType = (formData.get('uploadType') as string) || 'general'
    const relatedId = formData.get('relatedId') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file
    validateImageFile(file)

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload image
    const uploadResult = await uploadImageFile({
      buffer,
      originalName: file.name,
      mimeType: file.type,
      uploadType: uploadType as 'blog_image' | 'featured_image' | 'general',
    })

    // Save upload record to database
    const fileRecord = await db.insert(fileUploads).values({
      fileName: uploadResult.fileName,
      originalName: uploadResult.originalName,
      mimeType: uploadResult.mimeType,
      size: uploadResult.size,
      url: uploadResult.url,
      uploadType,
      relatedId: relatedId || null,
    }).returning()

    return NextResponse.json({
      success: true,
      file: {
        id: fileRecord[0].id,
        url: uploadResult.url,
        fileName: uploadResult.fileName,
        originalName: uploadResult.originalName,
        size: uploadResult.size,
        mimeType: uploadResult.mimeType,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Partners Points Upload API',
    endpoints: {
      'POST /api/upload': 'Upload image file'
    },
    supportedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxSize: '10MB'
  })
}