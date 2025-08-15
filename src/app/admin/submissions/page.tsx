"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  LogOut, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Users
} from 'lucide-react'
import Link from 'next/link'

interface ContactSubmission {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  message: string
  formType: string
  status: string
  metadata: any
  createdAt: string
}

interface AdminUser {
  id: string
  username: string
  email: string
  role: string
}

export default function AdminSubmissions() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [submissionsLoading, setSubmissionsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/me')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
          await fetchSubmissions()
        } else {
          router.push('/admin/login')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const fetchSubmissions = async () => {
    setSubmissionsLoading(true)
    try {
      const response = await fetch('/api/admin/submissions')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error)
    } finally {
      setSubmissionsLoading(false)
    }
  }

  const updateSubmissionStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
      
      if (response.ok) {
        await fetchSubmissions() // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />New</Badge>
      case 'contacted':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Contacted</Badge>
      case 'resolved':
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />Resolved</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const onboardingSubmissions = submissions.filter(s => s.formType === 'onboarding')
  const contactSubmissions = submissions.filter(s => s.formType === 'contact')
  const newSubmissions = submissions.filter(s => s.status === 'new')

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold">Partners Points Admin</h1>
              <p className="text-sm text-muted-foreground">Form Submissions</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/admin">
                <Eye className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <div className="text-right">
              <p className="font-medium">{user.username}</p>
              <Badge variant={user.role === 'superadmin' ? 'default' : 'secondary'}>
                {user.role}
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Form Submissions
          </h2>
          <p className="text-muted-foreground">
            Manage onboarding requests and contact form submissions.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Requests</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{newSubmissions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Onboarding</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{onboardingSubmissions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contactSubmissions.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Submissions</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="new">New Only</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <SubmissionsList 
              submissions={submissions}
              loading={submissionsLoading}
              onStatusUpdate={updateSubmissionStatus}
            />
          </TabsContent>

          <TabsContent value="onboarding">
            <SubmissionsList 
              submissions={onboardingSubmissions}
              loading={submissionsLoading}
              onStatusUpdate={updateSubmissionStatus}
            />
          </TabsContent>

          <TabsContent value="contact">
            <SubmissionsList 
              submissions={contactSubmissions}
              loading={submissionsLoading}
              onStatusUpdate={updateSubmissionStatus}
            />
          </TabsContent>

          <TabsContent value="new">
            <SubmissionsList 
              submissions={newSubmissions}
              loading={submissionsLoading}
              onStatusUpdate={updateSubmissionStatus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  function SubmissionsList({ 
    submissions, 
    loading, 
    onStatusUpdate 
  }: { 
    submissions: ContactSubmission[]
    loading: boolean
    onStatusUpdate: (id: string, status: string) => void 
  }) {
    if (loading) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-pulse">Loading submissions...</div>
          </CardContent>
        </Card>
      )
    }

    if (submissions.length === 0) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No submissions found.</p>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-4">
        {submissions.map((submission) => (
          <Card key={submission.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{submission.name}</CardTitle>
                    {getStatusBadge(submission.status)}
                    <Badge variant="outline" className="text-xs">
                      {submission.formType}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {submission.email}
                    </span>
                    {submission.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {submission.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(submission.createdAt)}
                    </span>
                  </CardDescription>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onStatusUpdate(submission.id, 'contacted')}
                    disabled={submission.status === 'contacted'}
                  >
                    Mark Contacted
                  </Button>
                  <Button
                    variant="outline" 
                    size="sm"
                    onClick={() => onStatusUpdate(submission.id, 'resolved')}
                    disabled={submission.status === 'resolved'}
                  >
                    Mark Resolved
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submission.company && (
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{submission.company}</span>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Message:</p>
                  <p className="text-sm bg-slate-50 p-3 rounded border">{submission.message}</p>
                </div>

                {submission.formType === 'onboarding' && submission.metadata && (
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-3">Onboarding Details:</p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Industry:</span> {submission.metadata.industry}
                        </div>
                        <div>
                          <span className="font-medium">Designation:</span> {submission.metadata.designation}
                        </div>
                        <div>
                          <span className="font-medium">Locations:</span> {submission.metadata.locationCount}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Emirates:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {submission.metadata.selectedEmirates?.map((emirate: string) => (
                              <Badge key={emirate} variant="secondary" className="text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                {emirate}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">RFM Terminal:</span> {submission.metadata.hasRfmTerminal ? 'Yes' : 'No'}
                          {submission.metadata.hasRfmTerminal && submission.metadata.terminalDetails && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              MID: {submission.metadata.terminalDetails}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Monthly Customers:</span> ~{submission.metadata.monthlyCustomers?.[0]?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
}