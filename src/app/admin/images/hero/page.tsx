"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Upload, Image as ImageIcon, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface UploadedImage {
  id: string
  url: string
  fileName: string
  originalName: string
  size: number
}

export default function HeroImagesPage() {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setMessage(null)

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('uploadType', 'hero_image')

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Upload failed')
        }

        const result = await response.json()
        setImages(prev => [...prev, result.file])
      }

      setMessage({ type: 'success', text: 'Images uploaded successfully!' })
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Upload failed' 
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      // Simulate file input change
      const input = fileInputRef.current
      if (input) {
        const dt = new DataTransfer()
        Array.from(files).forEach(file => dt.items.add(file))
        input.files = dt.files
        handleFileUpload({ target: input } as React.ChangeEvent<HTMLInputElement>)
      }
    }
  }

  const handleRemoveImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to remove this image?')) return

    try {
      // For now, just remove from local state
      // In production, you'd call an API to delete from server
      setImages(prev => prev.filter(img => img.id !== imageId))
      setMessage({ type: 'success', text: 'Image removed successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to remove image' })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Link>
          </Button>
          <div>
            <h1 className="font-semibold">Hero Section Images</h1>
            <p className="text-sm text-muted-foreground">Manage background images for hero sections</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Hero Images
              </CardTitle>
              <CardDescription>
                Upload high-quality images for hero sections. Recommended size: 1920x1080px or larger.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop images here or click to browse</p>
                  <p className="text-sm text-muted-foreground">
                    Supports JPG, PNG, WebP up to 10MB each
                  </p>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="mt-4"
                >
                  {uploading ? 'Uploading...' : 'Select Images'}
                </Button>
              </div>

              {message && (
                <Alert className="mt-4" variant={message.type === 'error' ? 'destructive' : 'default'}>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Current Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Current Hero Images
              </CardTitle>
              <CardDescription>
                Manage existing hero section images
              </CardDescription>
            </CardHeader>
            <CardContent>
              {images.length === 0 ? (
                <div className="text-center py-8">
                  <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">No hero images uploaded yet</p>
                  <p className="text-sm text-muted-foreground">Upload some images to get started</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="group relative">
                      <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                        <Image
                          src={image.url}
                          alt={image.originalName}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="font-medium text-sm truncate">{image.originalName}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(image.size)}</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleRemoveImage(image.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Image Guidelines:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Use high-resolution images (1920x1080px or larger)</li>
                  <li>Keep file sizes under 2MB for optimal loading</li>
                  <li>Use landscape orientation for best results</li>
                  <li>Ensure important content is centered (safe for text overlay)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Supported Formats:</h4>
                <p className="text-sm text-muted-foreground">JPG, PNG, WebP, GIF (up to 10MB each)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}