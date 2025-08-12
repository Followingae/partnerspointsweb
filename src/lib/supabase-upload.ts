import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false }
  }
)

const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'uploads'
const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!

export interface UploadOptions {
  buffer: Buffer
  originalName: string
  mimeType: string
  uploadType: 'blog_image' | 'featured_image' | 'general' | 'hero_image' | 'testimonial_image'
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

export async function uploadImageToSupabase({
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
    const fileName = `${uuidv4()}.${fileExtension}`
    const filePath = `${uploadType}/${fileName}`
    
    // Process image with Sharp for optimization
    let processedBuffer = buffer
    if (mimeType.startsWith('image/')) {
      const sharpImage = sharp(buffer)
      
      // Resize if needed
      if (maxWidth || maxHeight) {
        sharpImage.resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
      }
      
      // Optimize based on format
      if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
        sharpImage.jpeg({ quality, mozjpeg: true })
      } else if (mimeType === 'image/png') {
        sharpImage.png({ compressionLevel: 8 })
      } else if (mimeType === 'image/webp') {
        sharpImage.webp({ quality })
      }
      
      processedBuffer = await sharpImage.toBuffer()
    }

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, processedBuffer, {
        contentType: mimeType,
        duplex: 'half'
      })

    if (error) {
      console.error('Supabase upload error:', error)
      throw new Error(`Upload failed: ${error.message}`)
    }

    // Generate public URL
    const url = `${STORAGE_BASE_URL}/${STORAGE_BUCKET}/${filePath}`

    return {
      fileName: filePath,
      originalName,
      url,
      size: processedBuffer.length,
      mimeType,
    }
  } catch (error) {
    console.error('Upload error:', error)
    throw new Error('Failed to upload image to Supabase')
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
    const fileName = `${uuidv4()}.${fileExtension}`
    
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', uploadType)
    await fs.mkdir(uploadDir, { recursive: true })

    // Process image with Sharp for optimization
    let processedBuffer = buffer
    if (mimeType.startsWith('image/')) {
      const sharpImage = sharp(buffer)
      
      if (maxWidth || maxHeight) {
        sharpImage.resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
      }
      
      if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
        sharpImage.jpeg({ quality })
      } else if (mimeType === 'image/png') {
        sharpImage.png({ compressionLevel: 8 })
      } else if (mimeType === 'image/webp') {
        sharpImage.webp({ quality })
      }
      
      processedBuffer = await sharpImage.toBuffer()
    }

    // Save to local directory
    const filePath = path.join(uploadDir, fileName)
    await fs.writeFile(filePath, processedBuffer)

    const url = `/uploads/${uploadType}/${fileName}`

    return {
      fileName: `${uploadType}/${fileName}`,
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
export const uploadImageFile = process.env.NODE_ENV === 'production' 
  ? uploadImageToSupabase 
  : uploadImageLocal

// Validate image file
export function validateImageFile(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images.')
  }

  if (file.size > maxSize) {
    throw new Error('File size too large. Please upload images smaller than 10MB.')
  }

  return true
}

// Delete image from Supabase Storage
export async function deleteImageFromSupabase(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath])

    if (error) {
      console.error('Supabase delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}