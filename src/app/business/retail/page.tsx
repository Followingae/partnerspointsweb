"use client";
import Section from "@/components/modern/Section";
import HeroBg from "@/components/modern/HeroBg";
import InView from "@/components/modern/InView";
import { Card } from "@/components/modern/Card";
import Container from "@/components/modern/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Shield, TrendingUp, Gift, Zap, Users, Calculator, Star, Quote, ArrowRight, CheckCircle, Clock, Target, DollarSign, BarChart3, Lightbulb, FileText, BookOpen, Settings, HelpCircle } from "lucide-react";
import { FadeIn } from "@/components/animate-ui/fade-in";
import StandardSection from "@/components/modern/StandardSection";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type ChartConfig } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, BarChart, Bar, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/charts/ClientChart";

// Metadata moved to layout.tsx for client components

export default function RetailPage() {
  // Chart data - realistic retail metrics
  const retailPlaybooksData = [
    { campaign: "Double Points Drop", uplift: 85, baseline: 100 },
    { campaign: "Accessory Attach", uplift: 125, baseline: 100 },
    { campaign: "Bounce-Back Reward", uplift: 140, baseline: 100 },
    { campaign: "VIP Quarterly", uplift: 110, baseline: 100 }
  ]

  const checkoutFlowData = [
    { step: "Payment Start", time: 0 },
    { step: "Enter Phone", time: 3 },
    { step: "Profile Loads", time: 5 },
    { step: "Award/Redeem", time: 8 },
    { step: "Complete", time: 10 }
  ]

  const retailMetricsData = [
    { month: "Jan", visitFreq: 2.1, aov: 125 },
    { month: "Feb", visitFreq: 2.3, aov: 135 },
    { month: "Mar", visitFreq: 2.6, aov: 142 },
    { month: "Apr", visitFreq: 2.8, aov: 148 },
    { month: "May", visitFreq: 3.1, aov: 155 },
    { month: "Jun", visitFreq: 3.2, aov: 162 }
  ]

  const chartConfig: ChartConfig = {
    uplift: { label: "Uplift %" },
    baseline: { label: "Baseline %" },
    time: { label: "Seconds" },
    visitFreq: { label: "Visits/Month" },
    aov: { label: "AOV (AED)" }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="relative">
          <HeroBg />
          <div className="mx-auto max-w-page px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <InView className="space-y-8 opacity-0 translate-y-3 is-inview:opacity-100 is-inview:translate-y-0 transition-all duration-500">
                <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  Businesses
                </div>
                <h1 className="h1 font-bold tracking-tight">
                  Turn browsers into buyers—then into regulars.
                </h1>
                <p className="lead">
                  Partners Points runs inside your RFM Payment Terminal, so your team can award and redeem points in under 10 seconds during checkout—no extra apps, no add-on hardware, no upfront costs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="px-8 py-3 bg-blue-900 text-white hover:bg-blue-900/90">
                    <Link href="/onboarding?industry=retail">
                      Start Retail Onboarding <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="px-8 py-3 border-blue-900/10">
                    <Link href="/pricing">
                      See Retail Calculator
                    </Link>
                  </Button>
                </div>
                <div className="text-sm text-inkMuted">
                  Powered by RFM Loyalty
                </div>
              </InView>

              {/* Terminal Visual */}
              <InView className="opacity-0 translate-x-4 is-inview:opacity-100 is-inview:translate-x-0 transition-all duration-700 delay-300">
                <Card title="" hover={false} className="p-8">
                  <div className="text-center space-y-4">
                    <div className="bg-gray-50 p-6 rounded-xl border">
                      <div className="text-lg font-semibold text-blue-900 mb-4">RFM Payment Terminal</div>
                      <div className="bg-white p-4 rounded-lg border text-sm space-y-3">
                        <div className="text-green-600 font-medium flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          5th Visit in 30 Days
                        </div>
                        <div className="text-orange-600 font-medium flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          High Spender Detected
                        </div>
                        <div className="border-t pt-3 mt-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-2 rounded text-blue-800">
                              Award 250 pts
                            </div>
                            <div className="bg-green-50 p-2 rounded text-green-800">
                              Redeem 20 AED
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-inkMuted">
                      Cash wrap scene with loyalty triggers at checkout
                    </p>
                  </div>
                </Card>
              </InView>
            </div>
          </div>
        </div>
      </section>

      {/* Why Retail Needs Terminal-Native Loyalty */}
      <Section>
        <div className="text-center mb-16">
          <InView className="opacity-0 translate-y-3 is-inview:opacity-100 is-inview:translate-y-0 transition-all duration-500">
            <h2 className="h2 font-bold mb-6">
              Discounting trains shoppers to wait. Points train them to return.
            </h2>
            <p className="lead max-w-4xl mx-auto">
              Flat discounts erode margin on every sale—often for one-time customers. Points reward future purchases, and you only pay a fee on redeemed sales. Because Partners Points is built into your RFM Payment Terminal, your team uses the same flow they already know—so adoption is instant and lines keep moving.
            </p>
          </InView>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InView className="opacity-0 translate-y-3 is-inview:opacity-100 is-inview:translate-y-0 transition-all duration-500 delay-100">
            <Card title="Protect margin" className="text-center">
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <p className="text-inkMuted">
                  Reward loyalty without dropping sticker prices.
                </p>
              </div>
            </Card>
          </InView>

          <InView className="opacity-0 translate-y-3 is-inview:opacity-100 is-inview:translate-y-0 transition-all duration-500 delay-200">
            <Card title="Lift frequency" className="text-center">
              <div className="flex flex-col items-center">
                <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
                <p className="text-inkMuted">
                  Balances grow with each visit—a built-in reason to come back soon.
                </p>
              </div>
            </Card>
          </InView>

          <InView className="opacity-0 translate-y-3 is-inview:opacity-100 is-inview:translate-y-0 transition-all duration-500 delay-300">
            <Card title="Upsell new arrivals" className="text-center">
              <div className="flex flex-col items-center">
                <Gift className="w-12 h-12 text-purple-600 mb-4" />
                <p className="text-inkMuted">
                  Use point multipliers to move seasonal or higher-margin lines.
                </p>
              </div>
            </Card>
          </InView>

          <InView className="opacity-0 translate-y-3 is-inview:opacity-100 is-inview:translate-y-0 transition-all duration-500 delay-400">
            <Card title="Frictionless ops" className="text-center">
              <div className="flex flex-col items-center">
                <Zap className="w-12 h-12 text-orange-600 mb-4" />
                <p className="text-inkMuted">
                  No separate device, no app switching, no extra training.
                </p>
              </div>
            </Card>
          </InView>
        </div>
      </Section>

      {/* How It Works at Retail Checkout */}
      <StandardSection
        className="bg-gray-50"
        badge="Retail"
        heading="Loyalty in the same 10-second window as payment"
        description="No integrations. No new software. It's already in your terminal. Because Partners Points lives inside your RFM Payment Terminal, there's no extra training required."
        ctaText="Start Retail Onboarding"
        ctaHref="/onboarding?industry=retail"
        seeAlsoLinks={[
          { text: "Calculator", href: "/pricing", description: "for retail ROI projections" },
          { text: "Features", href: "/features", description: "for complete feature list" }
        ]}
      >
        <Card>
          <CardHeader>
            <CardTitle>Checkout Flow Timeline</CardTitle>
            <CardDescription>Real-time loyalty processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer>
                  <LineChart data={checkoutFlowData}>
                    <XAxis dataKey="step" angle={-45} textAnchor="end" height={80} />
                    <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
                    <ChartTooltip 
                      content={
                        <ChartTooltipContent 
                          formatter={(value) => [`${value}s`, 'Time']}
                        />
                      }
                    />
                    <Line 
                      type="monotone" 
                      dataKey="time" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Total time: Under 10 seconds
            </p>
          </CardContent>
        </Card>
      </StandardSection>

      {/* Retail Use Cases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Flexible enough for boutiques and big-box alike.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">New line drops</h3>
                    <p className="text-muted-foreground mb-4">
                      Run "2× points" for the first 7 days of a collection to accelerate sell-through without markdowns.
                    </p>
                    <div className="text-sm text-primary">
                      Effect: Faster adoption, reduced need for discounts
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Accessory attach</h3>
                    <p className="text-muted-foreground mb-4">
                      Offer +25 bonus points for cables/cases on electronics purchases to lift basket margin.
                    </p>
                    <div className="text-sm text-primary">
                      Effect: Higher AOV and accessory margin
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Seasonal gifts</h3>
                    <p className="text-muted-foreground mb-4">
                      Double points across gift categories in peak weeks (Eid/Christmas) to lock in repeat gifting.
                    </p>
                    <div className="text-sm text-primary">
                      Effect: Increased seasonal revenue
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">VIP tiers</h3>
                    <p className="text-muted-foreground mb-4">
                      Auto-elevate high spenders; unlock birthday rewards or early access.
                    </p>
                    <div className="text-sm text-primary">
                      Effect: Premium customer retention
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Uplift vs baseline performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <BarChart data={retailPlaybooksData}>
                          <XAxis 
                            dataKey="campaign" 
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            interval={0}
                          />
                          <YAxis />
                          <ChartTooltip 
                            content={
                              <ChartTooltipContent 
                                formatter={(value, name) => [
                                  `${value}%`,
                                  name === 'uplift' ? 'Performance' : 'Baseline'
                                ]}
                              />
                            }
                          />
                          <Bar dataKey="baseline" fill="hsl(var(--muted))" name="Baseline" />
                          <Bar dataKey="uplift" fill="hsl(var(--primary))" name="With Campaign" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Retail Performance Metrics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Real retail results
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Behavior Trends</CardTitle>
                  <CardDescription>6-month performance tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <LineChart data={retailMetricsData}>
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <ChartTooltip 
                            content={
                              <ChartTooltipContent 
                                formatter={(value, name) => [
                                  name === 'visitFreq' ? `${value} visits/month` : `AED ${value}`,
                                  name === 'visitFreq' ? 'Visit Frequency' : 'Average Order Value'
                                ]}
                              />
                            }
                          />
                          <Line 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="visitFreq" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={3}
                            name="Visit Frequency"
                          />
                          <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="aov" 
                            stroke="hsl(var(--secondary))" 
                            strokeWidth={3}
                            name="AOV"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="text-center">
                    <Quote className="w-12 h-12 text-primary mx-auto mb-4" />
                    <blockquote className="text-lg font-medium text-foreground mb-4">
                      "Our accessory attach rate went from 15% to 28% in the first month. The terminal prompts make it so easy for staff."
                    </blockquote>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <cite className="text-muted-foreground">
                      — Electronics Retailer, Dubai
                    </cite>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">+52%</div>
                    <div className="text-sm text-muted-foreground">Repeat visit rate</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">18%</div>
                    <div className="text-sm text-muted-foreground">Average basket uplift</div>
                  </Card>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Powered by RFM Loyalty */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Partners Points for Retail is exclusive to RFM Payment Terminals and powered by RFM Loyalty's nationwide merchant network.
              </p>
              <div className="flex items-center justify-center mx-auto">
                <Image 
                  src="/rfmloyalty.png" 
                  alt="RFM Loyalty Logo" 
                  width={120} 
                  height={32} 
                  className="h-8 w-auto"
                  unoptimized
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start rewarding smarter—from your payment terminal.
          </h2>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/onboarding?industry=retail">
              Start Retail Onboarding <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}