"use client";

import { Button } from "@/components/ui/button";
import { useMode } from "@/context/mode-context";
import type { ChartConfig } from "@/components/ui/chart";
import { ArrowRight, TrendingUp, TrendingDown, Shield, Zap, Users, Gift, Calculator, CheckCircle, Star, Quote, Store, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Modern Components
import Section from "@/components/modern/Section";
import { Card } from "@/components/modern/Card";
import InView from "@/components/modern/InView";
import HeroBg from "@/components/modern/HeroBg";
import Container from "@/components/modern/Container";
import InteractiveBlock from "@/components/modern/InteractiveBlock";
import StepBlock from "@/components/modern/StepBlock";
import { AnimatedText } from "@/components/animate-ui/animated-text";

export default function Home() {
  const { mode } = useMode()

  // Chart data - realistic business metrics
  const costComparisonData = [
    { method: "10% Discount", monthlyCost: 10000, salesImpact: 100000, fill: "hsl(var(--destructive))" },
    { method: "Points (40% redeem)", monthlyCost: 800, salesImpact: 40000, fill: "hsl(var(--primary))" }
  ]

  const loyaltyGrowthData = [
    { month: "Jan", repeatCustomers: 15, totalCustomers: 100 },
    { month: "Feb", repeatCustomers: 22, totalCustomers: 105 },
    { month: "Mar", repeatCustomers: 31, totalCustomers: 112 },
    { month: "Apr", repeatCustomers: 42, totalCustomers: 118 },
    { month: "May", repeatCustomers: 54, totalCustomers: 125 },
    { month: "Jun", repeatCustomers: 67, totalCustomers: 133 }
  ]

  const transactionVolumeData = [
    { terminal: "Terminal 1", transactions: 1250, revenue: 45000 },
    { terminal: "Terminal 2", transactions: 980, revenue: 38000 },
    { terminal: "Terminal 3", transactions: 1450, revenue: 52000 },
    { terminal: "Terminal 4", transactions: 1180, revenue: 41000 }
  ]

  const redemptionTrendData = [
    { week: "Week 1", earned: 5200, redeemed: 1850 },
    { week: "Week 2", earned: 5800, redeemed: 2100 },
    { week: "Week 3", earned: 6100, redeemed: 2350 },
    { week: "Week 4", earned: 6450, redeemed: 2580 }
  ]

  const chartConfig: ChartConfig = {
    cost: { label: "Cost %" },
    value: { label: "Percentage" }
  }

  if (mode === "customers") {
    return (
      <div className="min-h-screen">
        {/* Customer Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <HeroBg />
          <Container>
            <div className="text-center max-w-4xl mx-auto relative">
              <InView className="animate-hero">
                <h1 className="h1 mb-6">
                  Earn points every time you shop
                </h1>
              </InView>
              <InView className="animate-slide-up">
                <p className="lead mb-8">
                  Redeem at your favorite places — no gimmicks, no hidden rules
                </p>
              </InView>
              <InView className="animate-slide-up">
                <Button size="lg" asChild className="rounded-full px-8">
                  <Link href="/how-it-works">
                    See How it Works <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </InView>
            </div>
          </Container>
        </section>

        {/* How It Works - Customer */}
        <Section>
          <Container>
            <div className="text-center mb-16">
              <h2 className="h2 mb-4">
                Simple as 1-2-3
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <InView className="animate-slide-up">
                <Card className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 text-lg font-bold">
                    1
                  </div>
                  <h3 className="h3 mb-3">Shop</h3>
                  <p className="text-muted-foreground">Visit a partner merchant</p>
                </Card>
              </InView>
              <InView className="animate-slide-up">
                <Card className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 text-lg font-bold">
                    2
                  </div>
                  <h3 className="h3 mb-3">Earn</h3>
                  <p className="text-muted-foreground">Get points every time</p>
                </Card>
              </InView>
              <InView className="animate-slide-up">
                <Card className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 text-lg font-bold">
                    3
                  </div>
                  <h3 className="h3 mb-3">Redeem</h3>
                  <p className="text-muted-foreground">Save on what you love</p>
                </Card>
              </InView>
            </div>
          </Container>
        </Section>

        {/* Benefits - Customer */}
        <Section className="bg-muted/30">
          <Container>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <InteractiveBlock
                icon={<Zap className="w-6 h-6" />}
                title="Instant rewards"
                description="Points add up quickly with every purchase"
                variant="highlight"
                delay={100}
              />
              
              <InteractiveBlock
                icon={<Gift className="w-6 h-6" />}
                title="Freedom to choose"
                description="Redeem at any partner in the network"
                variant="default"
                delay={200}
              />
              
              <InteractiveBlock
                icon={<Users className="w-6 h-6" />}
                title="No app needed"
                description="Just your phone number — that's it"
                variant="default"
                delay={300}
              />
            </div>
          </Container>
        </Section>

        {/* Featured Merchants Placeholder */}
        <Section>
          <Container>
            <div className="text-center mb-16">
              <h2 className="h2 mb-4">
                Partner Merchants
              </h2>
              <p className="text-muted-foreground">More partners joining soon!</p>
            </div>
            <Card className="p-12 text-center">
              <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Store className="w-12 h-12 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Featured merchants coming soon</p>
            </Card>
          </Container>
        </Section>

        {/* FAQ Teaser */}
        <Section className="bg-muted/30">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="h3 mb-4">Quick Question?</h3>
              <p className="text-muted-foreground mb-8">"Do points expire?" → It depends on the merchant.</p>
              <Button variant="outline" asChild className="rounded-full">
                <Link href="/faq">View All FAQs</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </div>
    )
  }

  // Business Mode
  return (
    <div className="min-h-screen bg-white">
      
      {/* Business Hero Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="relative">
          <HeroBg />
          <div className="mx-auto max-w-page px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <InView className="animate-slide-up">
                <div className="space-y-8">
                  <h1 className="h1 font-bold tracking-tight">
                    All-in-one payments, with loyalty built in.
                  </h1>
                  <p className="lead">
                    Reward customers at checkout—no apps, no friction. RFM Loyalty helps merchants drive repeat purchases and reduce costs on a single payment terminal.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="rounded-full px-8 py-3 bg-black text-white hover:bg-black/90">
                      <Link href="/onboarding" className="flex items-center gap-2">
                        Get a live demo <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="rounded-full px-8 py-3" asChild>
                      <Link href="/calculator" className="flex items-center gap-2">
                        See how it works
                      </Link>
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Trusted by merchants across Retail, Restaurants, Clinics & Supermarkets.
                  </div>
                </div>
              </InView>

              {/* Hero Logos */}
              <InView className="animate-slide-left">
                <div className="flex items-center gap-8 opacity-80">
                  <div className="w-24 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">Brand 1</span>
                  </div>
                  <div className="w-24 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">Brand 2</span>
                  </div>
                  <div className="w-24 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">Brand 3</span>
                  </div>
                </div>
              </InView>
            </div>
          </div>
        </div>
      </section>

      {/* Discounts vs Points */}
      <Section>
        <Container>
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="h2 mb-6">
              <AnimatedText
                text="Discounts"
                className="line-through text-muted-foreground mr-4 inline-block"
                variant="slide"
                stagger={0.1}
              />
              <AnimatedText
                text="Points"
                className="inline-block"
                variant="slide"
                delay={0.3}
              />
            </h2>
            <p className="lead">
              Discounts slash your margins — for every customer, every time. Points change the game: you only incur cost when points are redeemed, meaning your rewards directly track with true customer loyalty
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <InteractiveBlock
              icon={<TrendingDown className="w-6 h-6" />}
              title="Traditional discounts"
              description="Discounts slash profit from every sale, even for one-time customers who never return"
              variant="subtle"
              delay={100}
            />
            
            <InteractiveBlock
              icon={<TrendingUp className="w-6 h-6" />}
              title="Smart points system"
              description="Points reward loyalty — you only pay when customers actually redeem their rewards"
              variant="highlight"
              delay={200}
            />
          </div>
        </Container>
      </Section>

      {/* How It Works - Business */}
      <Section className="bg-muted/30">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Text Content */}
            <InView className="animate-slide-up">
              <div className="space-y-8">
                <div>
                  <h2 className="h2 mb-6">
                    How It Works
                  </h2>
                  <p className="lead">
                    Because Partners Points lives inside your RFM Payment Terminal, there's no integration project, no new system to learn, and no extra device on your counter
                  </p>
                </div>
                
                {/* Steps */}
                <div className="space-y-4">
                  <StepBlock
                    step={1}
                    title="Customer pays as normal"
                    description="On your RFM Payment Terminal — the same device you already use"
                    delay={100}
                  />
                  
                  <StepBlock
                    step={2}
                    title="Staff enters customer number"
                    description="Quick entry during payment — loyalty profile appears instantly"
                    delay={200}
                  />
                  
                  <StepBlock
                    step={3}
                    title="Award or redeem points"
                    description="All without leaving the checkout flow — everything syncs in real time"
                    delay={300}
                    isLast={true}
                  />
                </div>
              </div>
            </InView>
            
            {/* Visual */}
            <InView className="animate-slide-left">
              <Card className="overflow-hidden">
                <div className="p-8">
                  <div className="text-center space-y-6">
                    <div className="bg-muted/30 p-6 rounded-xl border border-border">
                      <div className="text-lg font-semibold text-primary mb-4">RFM Payment Terminal</div>
                      <div className="bg-white p-4 rounded-lg border text-sm space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-600 font-medium">Customer Profile Loaded</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-blue-600 font-medium">5th Visit Detected</span>
                        </div>
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Award 250 pts</span>
                            <span className="text-sm text-accent font-bold">or Redeem 20 AED</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Real-time loyalty processing at checkout
                    </p>
                  </div>
                </div>
              </Card>
            </InView>
          </div>
        </Container>
      </Section>

      {/* Key Benefits */}
      <Section>
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="h2 mb-6">
                Key Benefits
              </h2>
              <p className="lead">
                Everything you need to build customer loyalty, built right into your payment terminal
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <InteractiveBlock
                icon={<Shield className="w-8 h-8" />}
                title="No extra systems"
                description="Loyalty is built directly into your RFM Payment Terminal. No separate device, no app switching, no extra training required"
                variant="default"
                delay={100}
                className="p-8"
              />
              
              <InteractiveBlock
                icon={<Zap className="w-8 h-8" />}
                title="Zero upfront costs"
                description="No setup fees, no integration costs, no hardware purchases. You only pay a small fee when customers redeem their points"
                variant="highlight"
                delay={200}
                className="p-8"
              />
              
              <InteractiveBlock
                icon={<TrendingUp className="w-8 h-8" />}
                title="Plug-and-play setup"
                description="Get up and running in hours, not weeks. Simple configuration through your merchant portal and you're ready to start awarding points"
                variant="default"
                delay={300}
                className="p-8"
              />
              
              <InteractiveBlock
                icon={<Users className="w-8 h-8" />}
                title="Scalable network"
                description="Powered by RFM's network of 15,000+ POS terminals processing AED 1.5B+ monthly across the UAE. Your customers can earn and redeem anywhere in the network"
                variant="default"
                delay={400}
                className="p-8"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Calculator Teaser */}
      <Section className="bg-muted/30">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="h2 mb-4">Your numbers, your savings</h2>
            <p className="lead mb-8">Enter your sales to see how points outperform discounts</p>
            <Button className="rounded-full" asChild>
              <Link href="/calculator" className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Try Calculator
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="bg-primary text-primary-foreground relative overflow-hidden">
        <Container>
          <div className="text-center relative z-10">
            <h2 className="h2 mb-6">
              Start rewarding smarter — from your payment terminal
            </h2>
            <Button className="rounded-full" asChild>
              <Link href="/onboarding" className="flex items-center gap-2">
                Start Onboarding <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  )
}