import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'partners-points-uploads'
const CDN_URL = process.env.CDN_URL || `https://${BUCKET_NAME}.s3.amazonaws.com`

export interface UploadOptions {
  buffer: Buffer
  originalName: string
  mimeType: string
  uploadType: 'blog_image' | 'featured_image' | 'general'
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

export interface UploadResult {
  fileName: string
  originalName: string
  url: string
  size: number
  mimeType: string
}

export async function uploadImage({
  buffer,
  originalName,
  mimeType,
  uploadType,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 85,
}: UploadOptions): Promise<UploadResult> {
  try {
    // Generate unique filename
    const fileExtension = originalName.split('.').pop()?.toLowerCase()
    const fileName = `${uploadType}/${uuidv4()}.${fileExtension}`
    
    // Process image with Sharp for optimization
    let processedBuffer = buffer
    if (mimeType.startsWith('image/')) {
      processedBuffer = await sharp(buffer)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality, mozjpeg: true })
        .png({ compressionLevel: 8 })
        .webp({ quality })
        .toBuffer()
    }

    // Upload to S3
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: processedBuffer,
        ContentType: mimeType,
        ACL: 'public-read',
        Metadata: {
          originalName,
          uploadType,
        },
      },
    })

    await upload.done()

    const url = `${CDN_URL}/${fileName}`

    return {
      fileName,
      originalName,
      url,
      size: processedBuffer.length,
      mimeType,
    }
  } catch (error) {
    console.error('Upload error:', error)
    throw new Error('Failed to upload image')
  }
}

// Alternative local file upload for development
export async function uploadImageLocal({
  buffer,
  originalName,
  mimeType,
  uploadType,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 85,
}: UploadOptions): Promise<UploadResult> {
  const fs = await import('fs/promises')
  const path = await import('path')

  try {
    // Generate unique filename
    const fileExtension = originalName.split('.').pop()?.toLowerCase()
    const fileName = `${uploadType}-${uuidv4()}.${fileExtension}`
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', uploadType)
    await fs.mkdir(uploadDir, { recursive: true })

    // Process image with Sharp for optimization
    let processedBuffer = buffer
    if (mimeType.startsWith('image/')) {
      processedBuffer = await sharp(buffer)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality })
        .png({ compressionLevel: 8 })
        .webp({ quality })
        .toBuffer()
    }

    // Save to local directory
    const filePath = path.join(uploadDir, fileName)
    await fs.writeFile(filePath, processedBuffer)

    const url = `/uploads/${uploadType}/${fileName}`

    return {
      fileName,
      originalName,
      url,
      size: processedBuffer.length,
      mimeType,
    }
  } catch (error) {
    console.error('Local upload error:', error)
    throw new Error('Failed to upload image locally')
  }
}

// Choose upload method based on environment
export const uploadImageFile = process.env.NODE_ENV === 'production' ? uploadImage : uploadImageLocal

// Validate image file
export function validateImageFile(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images.')
  }

  if (file.size > maxSize) {
    throw new Error('File size too large. Please upload images smaller than 10MB.')
  }

  return true
}