"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageSquare, HeadphonesIcon, Building2 } from "lucide-react"
import Link from "next/link"

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our support team",
    details: "+971 4 123 4567",
    hours: "Sunday - Thursday: 9AM - 6PM"
  },
  {
    icon: Mail,
    title: "Email Support", 
    description: "Get detailed help via email",
    details: "support@partnerspoints.com",
    hours: "Response within 24 hours"
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Business",
    description: "Quick questions and updates",
    details: "+971 50 123 4567", 
    hours: "Sunday - Thursday: 9AM - 8PM"
  },
  {
    icon: HeadphonesIcon,
    title: "Live Chat",
    description: "Instant help during business hours",
    details: "Available on dashboard",
    hours: "Sunday - Thursday: 9AM - 6PM"
  }
]

const offices = [
  {
    city: "Dubai",
    address: "Level 12, Emirates Financial Towers\nDIFC, Dubai, UAE",
    phone: "+971 4 123 4567",
    email: "dubai@partnerspoints.com",
    mapPlaceholder: "/api/placeholder/maps/dubai-600x400"
  },
  {
    city: "Abu Dhabi",
    address: "Floor 8, Capital Plaza\nAl Markaziyah, Abu Dhabi, UAE", 
    phone: "+971 2 234 5678",
    email: "abudhabi@partnerspoints.com",
    mapPlaceholder: "/api/placeholder/maps/abudhabi-600x400"
  },
  {
    city: "Sharjah", 
    address: "Suite 15, Sharjah Business Center\nAl Qasimia, Sharjah, UAE",
    phone: "+971 6 345 6789",
    email: "sharjah@partnerspoints.com", 
    mapPlaceholder: "/api/placeholder/maps/sharjah-600x400"
  }
]

const inquiryTypes = [
  "General Inquiry",
  "Business Onboarding",
  "Technical Support", 
  "Billing & Pricing",
  "Partnership Opportunities",
  "Media & Press",
  "Feedback & Suggestions"
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    inquiryType: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-frosted-silver">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-midnight-navy via-electric-blue/95 to-azure-breeze/90 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/patterns/contact-hero-1920x800')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Let's talk about
              <br />
              <span className="text-lime-burst">your success</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Whether you're ready to start your loyalty program or have questions, 
              our team is here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-shadow-black mb-4">
              Get in touch instantly
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the contact method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index}  className="text-center hover:shadow-lg transition-all duration-300">
                <method.icon className="w-12 h-12 text-electric-blue mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                <p className="text-sm font-medium text-electric-blue mb-2">{method.details}</p>
                <p className="text-xs text-muted-foreground">{method.hours}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="h2 mb-6">
                Send us a message
              </h2>
              
              {isSubmitted ? (
                <Card  className="text-center p-8">
                  <div className="w-16 h-16 bg-lime-burst rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-shadow-black mb-2">Message sent successfully!</h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </Card>
              ) : (
                <Card  >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="e.g., Ahmed Al Mansoori"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="e.g., ahmed@company.ae"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="e.g., Al Manara Trading LLC"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="e.g., +971 50 123 4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type *</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your business and how we can help..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Card>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="h2 mb-6">
                  Visit our offices
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We have offices across the UAE to serve you better. 
                  Drop by or schedule a meeting with our team.
                </p>
              </div>

              <div className="space-y-6">
                {offices.map((office, index) => (
                  <Card key={index} >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-electric-blue" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{office.city} Office</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <p className="text-muted-foreground whitespace-pre-line">{office.address}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <p className="text-muted-foreground">{office.phone}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <p className="text-muted-foreground">{office.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Map Placeholder */}
                    <div className="mt-4 aspect-video bg-gradient-to-br from-electric-blue/5 to-azure-breeze/5 rounded-lg flex items-center justify-center border">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 text-electric-blue mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">
                          [Interactive map - {office.city}]
                          <br />
                          600x400 - Office location
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Business Hours */}
              <Card title="Business Hours" >
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-electric-blue mt-1" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday - Thursday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Friday:</span>
                      <span>Closed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday:</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="pt-2 text-sm text-muted-foreground">
                      Emergency support available 24/7 for existing customers
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-shadow-black mb-4">
            Need quick answers?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Check out our comprehensive FAQ section for instant answers 
            to the most common questions about Partners Points.
          </p>
          <Button asChild  variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white">
            <Link href="/faq">
              Browse FAQ
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}