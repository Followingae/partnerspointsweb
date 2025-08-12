"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animate-ui/fade-in"
import { AnimatedText } from "@/components/animate-ui/animated-text"
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  Shield, 
  FileText,
  ArrowRight,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  const supportOptions = [
    {
      id: "email",
      title: "Email Support",
      description: "Get help via email for non-urgent issues",
      icon: Mail,
      contact: "support@partnerspoints.com",
      responseTime: "24 hours",
      availability: "24/7"
    },
    {
      id: "phone",
      title: "Phone Support", 
      description: "Speak directly with our support team",
      icon: Phone,
      contact: "+971 4 XXX XXXX",
      responseTime: "Immediate",
      availability: "Sun-Thu 9AM-6PM GST"
    },
    {
      id: "whatsapp",
      title: "WhatsApp Business",
      description: "Quick support via WhatsApp",
      icon: MessageCircle,
      contact: "+971 50 XXX XXXX", 
      responseTime: "15 minutes",
      availability: "Business hours"
    }
  ]

  const supportCategories = [
    {
      title: "Business Support",
      description: "Help for merchant partners",
      topics: [
        "Onboarding assistance",
        "Terminal setup and configuration", 
        "Campaign management",
        "Analytics and reporting",
        "Technical troubleshooting",
        "Account management"
      ]
    },
    {
      title: "Customer Support", 
      description: "Help for end customers",
      topics: [
        "Account setup and login",
        "Points balance inquiries",
        "Redemption assistance",
        "App navigation help",
        "Privacy and security questions",
        "Merchant location support"
      ]
    },
    {
      title: "Technical Support",
      description: "Technical assistance",
      topics: [
        "RFM Terminal integration",
        "API documentation",
        "System status updates",
        "Security compliance",
        "Data synchronization",
        "Performance optimization"
      ]
    }
  ]

  const emergencySupport = {
    title: "Emergency Support",
    description: "24/7 support for critical business issues",
    phone: "+971 50 XXX XXXX",
    email: "emergency@partnerspoints.com",
    scenarios: [
      "Payment terminal is down",
      "Critical system outages", 
      "Security incidents",
      "Data integrity issues"
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-background via-white to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <AnimatedText
              text="Support Center"
              className="text-4xl lg:text-6xl font-bold text-foreground mb-6"
              variant="slide"
            />
            <FadeIn direction="up" delay={0.2}>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Get help from our dedicated support team. We're here to ensure your success with Partners Points.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="#contact-support">
                    Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/faq">
                    Browse FAQ <HelpCircle className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section id="contact-support" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How to Reach Us
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the best way to get in touch based on your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {supportOptions.map((option, index) => (
              <FadeIn key={option.id} direction="up" delay={index * 0.1}>
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <option.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="font-semibold text-primary">{option.contact}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Response Time:</span>
                        <Badge variant="secondary">{option.responseTime}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Availability:</span>
                        <span className="font-medium">{option.availability}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      Contact via {option.title.split(' ')[0]}
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          {/* Emergency Support */}
          <FadeIn direction="up" delay={0.4}>
            <Card className="max-w-4xl mx-auto border-red-200 bg-red-50/50">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-red-800">{emergencySupport.title}</CardTitle>
                <CardDescription className="text-red-700">
                  {emergencySupport.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-red-700 mb-2">Emergency Phone:</p>
                    <p className="font-semibold text-red-800">{emergencySupport.phone}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-red-700 mb-2">Emergency Email:</p>
                    <p className="font-semibold text-red-800">{emergencySupport.email}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-800 mb-2">Emergency scenarios include:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {emergencySupport.scenarios.map((scenario, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                        {scenario}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What We Can Help With
            </h2>
            <p className="text-xl text-muted-foreground">
              Our support team is trained to help with all aspects of Partners Points
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {supportCategories.map((category, index) => (
              <FadeIn key={category.title} direction="up" delay={index * 0.1}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Additional Resources
            </h2>
            <p className="text-xl text-muted-foreground">
              Find answers and learn more about Partners Points
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card className="text-center p-6">
                <HelpCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">FAQ</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Common questions and answers
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/faq">
                    Browse FAQ
                  </Link>
                </Button>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <Card className="text-center p-6">
                <FileText className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Technical guides and APIs
                </p>
                <Button size="sm" variant="outline" disabled>
                  Coming Soon
                </Button>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <Card className="text-center p-6">
                <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">System Status</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time service status
                </p>
                <Button size="sm" variant="outline" disabled>
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Status Page
                </Button>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <Card className="text-center p-6">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with other merchants
                </p>
                <Button size="sm" variant="outline" disabled>
                  Join Community
                </Button>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold mb-6">
              Support Hours
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold mb-2">Standard Support</h3>
                <p className="opacity-90">Sunday - Thursday</p>
                <p className="opacity-90">9:00 AM - 6:00 PM GST</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Emergency Support</h3>
                <p className="opacity-90">24/7 Availability</p>
                <p className="opacity-90">Critical issues only</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Response Times</h3>
                <p className="opacity-90">Email: 24 hours</p>
                <p className="opacity-90">Phone: Immediate</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}