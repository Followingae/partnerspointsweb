"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  FileText,
  Edit,
  Save,
  Eye,
  RotateCcw,
  Home,
  Building,
  Calculator,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'

export default function ContentManagePage() {
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [contentSections, setContentSections] = useState([
    {
      id: 'hero-title',
      page: 'homepage',
      section: 'Hero Section',
      title: 'Main Headline',
      content: 'Loyalty built into every transaction.',
      type: 'text',
      lastModified: '2024-01-15'
    },
    {
      id: 'hero-subtitle', 
      page: 'homepage',
      section: 'Hero Section',
      title: 'Subtitle',
      content: 'Partners Points runs exclusively inside your RFM Payment Terminal — award and redeem points in under 10 seconds, with no apps to build and no upfront costs.',
      type: 'textarea',
      lastModified: '2024-01-15'
    },
    {
      id: 'benefits-title',
      page: 'homepage', 
      section: 'Key Benefits',
      title: 'Section Title',
      content: 'Key Benefits',
      type: 'text',
      lastModified: '2024-01-12'
    },
    {
      id: 'retail-hero',
      page: 'retail',
      section: 'Hero Section', 
      title: 'Main Headline',
      content: 'Turn browsers into buyers—then into regulars.',
      type: 'text',
      lastModified: '2024-01-10'
    }
  ])

  const [tempContent, setTempContent] = useState('')

  const startEditing = (sectionId: string) => {
    const section = contentSections.find(s => s.id === sectionId)
    if (section) {
      setTempContent(section.content)
      setEditingSection(sectionId)
    }
  }

  const saveContent = (sectionId: string) => {
    setContentSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, content: tempContent, lastModified: new Date().toISOString().split('T')[0] }
          : section
      )
    )
    setEditingSection(null)
    setTempContent('')
  }

  const cancelEditing = () => {
    setEditingSection(null)
    setTempContent('')
  }

  const pageIcons = {
    homepage: Home,
    retail: Building,
    calculator: Calculator,
    faq: HelpCircle
  }

  const pages = ['homepage', 'retail', 'calculator', 'faq']

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
              <h1 className="font-semibold">Content Management</h1>
              <p className="text-sm text-muted-foreground">Edit text content across your website</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="retail">Retail</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  All Content Sections
                </CardTitle>
                <CardDescription>
                  All editable text content across your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentSections.map((section) => {
                    const PageIcon = pageIcons[section.page as keyof typeof pageIcons] || FileText
                    const isEditing = editingSection === section.id
                    
                    return (
                      <Card key={section.id} className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <PageIcon className="w-5 h-5 text-primary" />
                            <div>
                              <h3 className="font-medium">{section.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs capitalize">
                                  {section.page}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {section.section}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href="/" target="_blank">
                                <Eye className="w-3 h-3 mr-1" />
                                Preview
                              </Link>
                            </Button>
                            {!isEditing ? (
                              <Button size="sm" onClick={() => startEditing(section.id)}>
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                            ) : (
                              <div className="flex gap-1">
                                <Button size="sm" onClick={() => saveContent(section.id)}>
                                  <Save className="w-3 h-3 mr-1" />
                                  Save
                                </Button>
                                <Button size="sm" variant="outline" onClick={cancelEditing}>
                                  <RotateCcw className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {isEditing ? (
                            section.type === 'textarea' ? (
                              <Textarea
                                value={tempContent}
                                onChange={(e) => setTempContent(e.target.value)}
                                className="min-h-[100px]"
                              />
                            ) : (
                              <Input
                                value={tempContent}
                                onChange={(e) => setTempContent(e.target.value)}
                              />
                            )
                          ) : (
                            <div className="p-3 bg-gray-50 rounded border">
                              <p className={section.type === 'textarea' ? 'text-sm' : 'font-medium'}>
                                {section.content}
                              </p>
                            </div>
                          )}
                          
                          <p className="text-xs text-muted-foreground">
                            Last modified: {new Date(section.lastModified).toLocaleDateString()}
                          </p>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {pages.map(page => (
            <TabsContent key={page} value={page} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 capitalize">
                    {React.createElement(pageIcons[page as keyof typeof pageIcons] || FileText, { className: "h-5 w-5" })}
                    {page} Content
                  </CardTitle>
                  <CardDescription>
                    Edit content sections for the {page} page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contentSections
                      .filter(section => section.page === page)
                      .map((section) => {
                        const isEditing = editingSection === section.id
                        
                        return (
                          <Card key={section.id} className="p-4">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-medium">{section.title}</h3>
                                <p className="text-sm text-muted-foreground">{section.section}</p>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" asChild>
                                  <Link href={page === 'homepage' ? '/' : `/${page}`} target="_blank">
                                    <Eye className="w-3 h-3 mr-1" />
                                    Preview
                                  </Link>
                                </Button>
                                {!isEditing ? (
                                  <Button size="sm" onClick={() => startEditing(section.id)}>
                                    <Edit className="w-3 h-3 mr-1" />
                                    Edit
                                  </Button>
                                ) : (
                                  <div className="flex gap-1">
                                    <Button size="sm" onClick={() => saveContent(section.id)}>
                                      <Save className="w-3 h-3 mr-1" />
                                      Save
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={cancelEditing}>
                                      <RotateCcw className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {isEditing ? (
                                section.type === 'textarea' ? (
                                  <Textarea
                                    value={tempContent}
                                    onChange={(e) => setTempContent(e.target.value)}
                                    className="min-h-[100px]"
                                  />
                                ) : (
                                  <Input
                                    value={tempContent}
                                    onChange={(e) => setTempContent(e.target.value)}
                                  />
                                )
                              ) : (
                                <div className="p-3 bg-gray-50 rounded border">
                                  <p className={section.type === 'textarea' ? 'text-sm' : 'font-medium'}>
                                    {section.content}
                                  </p>
                                </div>
                              )}
                              
                              <p className="text-xs text-muted-foreground">
                                Last modified: {new Date(section.lastModified).toLocaleDateString()}
                              </p>
                            </div>
                          </Card>
                        )
                      })}
                    
                    {contentSections.filter(section => section.page === page).length === 0 && (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2 capitalize">No {page} content</h3>
                        <p className="text-gray-500">Content sections will appear here when available</p>
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