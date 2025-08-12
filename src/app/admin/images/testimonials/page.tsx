"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  Users,
  Image as ImageIcon,
  Upload,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'
import Link from 'next/link'

export default function TestimonialsImagesPage() {
  const [testimonialImages, setTestimonialImages] = useState([
    {
      id: 1,
      filename: 'customer-1.jpg',
      customerName: 'Ahmed Al-Rashid',
      title: 'Store Owner',
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      filename: 'customer-2.jpg', 
      customerName: 'Sarah Hassan',
      title: 'Restaurant Manager',
      uploadDate: '2024-01-12'
    }
  ])

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
              <h1 className="font-semibold">Testimonial Images</h1>
              <p className="text-sm text-muted-foreground">Manage customer testimonial photos</p>
            </div>
          </div>
          
          <Button asChild>
            <Link href="/admin/images/upload">
              <Plus className="w-4 h-4 mr-2" />
              Add New Image
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Testimonial Photos
            </CardTitle>
            <CardDescription>
              Photos and avatars used in customer testimonials and reviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonialImages.map((image) => (
                <Card key={image.id} className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium">{image.customerName}</h3>
                      <p className="text-sm text-muted-foreground">{image.title}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {image.filename}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      Uploaded: {new Date(image.uploadDate).toLocaleDateString()}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Upload className="w-3 h-3 mr-1" />
                        Replace
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* Add New Card */}
              <Card className="p-4 border-dashed border-2 border-gray-300">
                <div className="aspect-square rounded-lg mb-4 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
                  <Plus className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">Add New Photo</span>
                </div>
                
                <Button className="w-full" asChild>
                  <Link href="/admin/images/upload">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Link>
                </Button>
              </Card>
            </div>
            
            {testimonialImages.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No testimonial images</h3>
                <p className="text-gray-500 mb-4">Upload customer photos to showcase testimonials</p>
                <Button asChild>
                  <Link href="/admin/images/upload">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload First Image
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}