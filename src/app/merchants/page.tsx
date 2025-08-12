"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animate-ui/fade-in"
import { AnimatedText } from "@/components/animate-ui/animated-text"
import { Store, MapPin, Clock, Star, ArrowRight, Search } from "lucide-react"
import Link from "next/link"

export default function MerchantsPage() {
  const merchantCategories = [
    {
      id: "retail",
      name: "Retail Stores",
      icon: Store,
      count: "Coming Soon",
      description: "Electronics, fashion, home goods and more",
      examples: ["Electronics Stores", "Fashion Boutiques", "Home & Garden"]
    },
    {
      id: "restaurants", 
      name: "Restaurants & Cafes",
      icon: Store,
      count: "Coming Soon",
      description: "Dining experiences across the UAE",
      examples: ["Casual Dining", "Fast Casual", "Coffee Shops"]
    },
    {
      id: "services",
      name: "Professional Services", 
      icon: Store,
      count: "Coming Soon",
      description: "Healthcare, beauty, automotive and more",
      examples: ["Medical Clinics", "Beauty Salons", "Auto Services"]
    },
    {
      id: "supermarkets",
      name: "Supermarkets & Grocery",
      icon: Store,
      count: "Coming Soon", 
      description: "Everyday shopping and groceries",
      examples: ["Supermarkets", "Convenience Stores", "Specialty Food"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-background via-white to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <AnimatedText
              text="Partner Merchants"
              className="text-4xl lg:text-6xl font-bold text-foreground mb-6"
              variant="slide"
            />
            <FadeIn direction="up" delay={0.2}>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Discover businesses where you can earn and redeem Partners Points across the UAE
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" disabled>
                  <Search className="mr-2 h-4 w-4" />
                  Find Merchants (Coming Soon)
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/how-it-works">
                    How It Works <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <Card className="max-w-4xl mx-auto p-8 text-center">
              <CardContent>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Merchant Directory Coming Soon
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We're building our network of partner merchants across the UAE. 
                  The merchant directory will launch alongside our customer app.
                </p>
                <Badge className="text-base px-4 py-2">
                  Launch: Q2 2024
                </Badge>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Merchant Categories Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Merchant Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Partners Points will be available at businesses across these categories and more
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {merchantCategories.map((category, index) => (
              <FadeIn key={category.id} direction="up" delay={index * 0.1}>
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Badge variant="outline" className="w-full justify-center">
                      {category.count}
                    </Badge>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Examples:</h4>
                      <ul className="text-sm space-y-1">
                        {category.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* For Businesses */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  Want to become a partner merchant?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join our growing network of businesses using Partners Points to build customer loyalty 
                  and increase repeat visits.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Zero upfront costs</h3>
                      <p className="text-muted-foreground text-sm">No setup fees, no monthly charges</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Quick setup</h3>
                      <p className="text-muted-foreground text-sm">Get started in hours, not weeks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Built into your terminal</h3>
                      <p className="text-muted-foreground text-sm">No additional hardware required</p>
                    </div>
                  </div>
                </div>
                <Button size="lg" asChild>
                  <Link href="/onboarding">
                    Start Business Onboarding <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.2}>
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-4">Current Network Stats</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">15,000+</div>
                      <div className="text-sm text-muted-foreground">RFM Terminals</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">AED 1.5B+</div>
                      <div className="text-sm text-muted-foreground">Monthly Volume</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Powered by RFM Loyalty's proven payment infrastructure
                  </p>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Customer App Coming Soon */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <FadeIn direction="up">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Customer App Coming Soon
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Customers will be able to find partner merchants, track their points, 
                and discover rewards through our mobile app.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" disabled>
                  <span className="mr-2">📱</span>
                  iOS App Store
                </Button>
                <Button variant="outline" size="lg" disabled>
                  <span className="mr-2">📱</span>
                  Google Play Store
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Apps will be available when the merchant network launches
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}