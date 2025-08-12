"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Settings,
  Image as ImageIcon,
  Upload,
  Edit,
  Trash2,
  Plus,
  Star,
  Building,
  Shield
} from 'lucide-react'
import Link from 'next/link'

export default function GeneralImagesPage() {
  const [generalImages, setGeneralImages] = useState([
    {
      id: 1,
      filename: 'logo-main.svg',
      category: 'logos',
      usage: 'Main site logo',
      uploadDate: '2024-01-15',
      size: '24KB'
    },
    {
      id: 2,
      filename: 'rfm-partner-badge.png', 
      category: 'badges',
      usage: 'RFM partnership badge',
      uploadDate: '2024-01-12',
      size: '15KB'
    },
    {
      id: 3,
      filename: 'security-icon.svg',
      category: 'icons',
      usage: 'Security features icon',
      uploadDate: '2024-01-10',
      size: '8KB'
    }
  ])

  const categoryIcons = {
    logos: Building,
    badges: Star,
    icons: Shield,
    general: Settings
  }

  const categories = ['logos', 'badges', 'icons', 'general']

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
              <h1 className="font-semibold">General Images</h1>
              <p className="text-sm text-muted-foreground">Logos, icons, badges and other assets</p>
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
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Images</TabsTrigger>
            <TabsTrigger value="logos">Logos</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  All General Images
                </CardTitle>
                <CardDescription>
                  All logos, icons, badges and general purpose images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generalImages.map((image) => {
                    const CategoryIcon = categoryIcons[image.category as keyof typeof categoryIcons] || Settings
                    return (
                      <Card key={image.id} className="p-4">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-medium">{image.filename}</h3>
                            <p className="text-sm text-muted-foreground">{image.usage}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                              <CategoryIcon className="w-3 h-3" />
                              {image.category}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {image.size}
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
                    )
                  })}
                  
                  {/* Add New Card */}
                  <Card className="p-4 border-dashed border-2 border-gray-300">
                    <div className="aspect-square rounded-lg mb-4 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
                      <Plus className="w-8 h-8 mb-2" />
                      <span className="text-sm font-medium">Add New Image</span>
                    </div>
                    
                    <Button className="w-full" asChild>
                      <Link href="/admin/images/upload">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Link>
                    </Button>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 capitalize">
                    {React.createElement(categoryIcons[category as keyof typeof categoryIcons] || Settings, { className: "h-5 w-5" })}
                    {category}
                  </CardTitle>
                  <CardDescription>
                    {category === 'logos' && 'Brand logos and wordmarks'}
                    {category === 'badges' && 'Certification and partnership badges'}
                    {category === 'icons' && 'UI icons and graphics'}
                    {category === 'general' && 'Miscellaneous images and assets'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {generalImages
                      .filter(image => image.category === category)
                      .map((image) => (
                        <Card key={image.id} className="p-4">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-gray-400" />
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-medium">{image.filename}</h3>
                              <p className="text-sm text-muted-foreground">{image.usage}</p>
                            </div>
                            
                            <Badge variant="secondary" className="text-xs">
                              {image.size}
                            </Badge>
                            
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
                    
                    {generalImages.filter(image => image.category === category).length === 0 && (
                      <div className="col-span-full text-center py-12">
                        {React.createElement(categoryIcons[category as keyof typeof categoryIcons] || Settings, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" })}
                        <h3 className="text-lg font-medium mb-2 capitalize">No {category}</h3>
                        <p className="text-gray-500 mb-4">Upload images for this category</p>
                        <Button asChild>
                          <Link href="/admin/images/upload">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload {category}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}