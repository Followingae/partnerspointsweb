"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  FileX,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export default function ImageUploadPage() {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setErrors([])
    
    try {
      // Mock upload process for now
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newFiles = Array.from(files).map(file => file.name)
      setUploadedFiles(prev => [...prev, ...newFiles])
    } catch (error) {
      setErrors(['Failed to upload images. Please try again.'])
    } finally {
      setUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Link>
            </Button>
            <div>
              <h1 className="font-semibold">Image Upload</h1>
              <p className="text-sm text-muted-foreground">Upload new images to your site</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload">Upload Images</TabsTrigger>
            <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload New Images
                </CardTitle>
                <CardDescription>
                  Select images to upload. Supported formats: JPG, PNG, GIF, WebP
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Area */}
                <div 
                  onClick={triggerFileInput}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
                  <p className="text-gray-500 mb-4">Maximum file size: 10MB per image</p>
                  <Button disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Select Images'}
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* Upload Status */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Successfully Uploaded ({uploadedFiles.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {uploadedFiles.map((filename, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                          <ImageIcon className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{filename}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Errors */}
                {errors.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Upload Errors
                    </h4>
                    <div className="space-y-1">
                      {errors.map((error, index) => (
                        <div key={index} className="p-2 bg-red-50 text-red-700 rounded text-sm">
                          {error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Uploads</CardTitle>
                <CardDescription>
                  Images uploaded in the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedFiles.map((filename, index) => (
                      <Card key={index} className="p-4">
                        <div className="aspect-square bg-gray-100 rounded mb-3 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium truncate">{filename}</p>
                        <Badge variant="secondary" className="mt-1">
                          Mock Upload
                        </Badge>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent uploads</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}