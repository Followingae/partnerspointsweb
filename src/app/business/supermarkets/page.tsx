"use client";
import Section from "@/components/modern/Section";
import HeroBg from "@/components/modern/HeroBg";
import InView from "@/components/modern/InView";
import { Card } from "@/components/modern/Card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart, TrendingUp, Zap, Gift, BarChart3, Star, Quote, Apple, CheckCircle, Clock, Users, Target, Settings, HelpCircle } from "lucide-react";
import { FadeIn } from "@/components/animate-ui/fade-in";
import { AnimatedText } from "@/components/animate-ui/animated-text";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type ChartConfig } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, BarChart, Bar, AreaChart, Area, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/charts/ClientChart";

// Metadata moved to layout.tsx for client components

export default function SupermarketsPage() {
  // Chart data - realistic supermarket metrics
  const basketAnalysisData = [
    { category: "Produce", baseline: 45, withBooster: 67 },
    { category: "Dairy", baseline: 38, withBooster: 42 },
    { category: "Bakery", baseline: 32, withBooster: 48 },
    { category: "Health Foods", baseline: 28, withBooster: 52 }
  ]

  const tripFrequencyData = [
    { month: "Jan", avgTrips: 3.2, loyaltyTrips: 3.2 },
    { month: "Feb", avgTrips: 3.1, loyaltyTrips: 3.5 },
    { month: "Mar", avgTrips: 3.3, loyaltyTrips: 3.8 },
    { month: "Apr", avgTrips: 3.2, loyaltyTrips: 4.1 },
    { month: "May", avgTrips: 3.4, loyaltyTrips: 4.3 },
    { month: "Jun", avgTrips: 3.3, loyaltyTrips: 4.6 }
  ]

  const checkoutSpeedData = [
    { lane: "Lane 1", avgTime: 45, withLoyalty: 47 },
    { lane: "Lane 2", avgTime: 42, withLoyalty: 44 },
    { lane: "Lane 3", avgTime: 48, withLoyalty: 50 },
    { lane: "Lane 4", avgTime: 46, withLoyalty: 48 },
    { lane: "Lane 5", avgTime: 44, withLoyalty: 46 }
  ]

  const weeklyShoppingData = [
    { day: "Mon", regular: 850, bounceBack: 920 },
    { day: "Tue", regular: 780, bounceBack: 845 },
    { day: "Wed", regular: 890, bounceBack: 980 },
    { day: "Thu", regular: 920, bounceBack: 1020 },
    { day: "Fri", regular: 1200, bounceBack: 1350 },
    { day: "Sat", regular: 1450, bounceBack: 1580 },
    { day: "Sun", regular: 980, bounceBack: 1100 }
  ]

  const chartConfig: ChartConfig = {
    baseline: { label: "Baseline" },
    withBooster: { label: "With Booster" },
    avgTrips: { label: "Average Trips" },
    loyaltyTrips: { label: "Loyalty Members" },
    avgTime: { label: "Regular Checkout" },
    withLoyalty: { label: "With Loyalty" },
    regular: { label: "Regular Customers" },
    bounceBack: { label: "With Bounce-Back" }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-background via-white to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary">Supermarket Solutions</Badge>
              <AnimatedText
                text="Keep shoppers loyal to your aisles."
                className="text-5xl lg:text-7xl font-bold text-foreground leading-tight"
                variant="slide"
                stagger={0.05}
              />
              <FadeIn direction="up" delay={0.3}>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Partners Points lets cashiers award or redeem in seconds on your RFM Payment Terminal—so queues keep moving while loyalty builds quietly in the background.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href="/onboarding?industry=supermarkets">
                      Start Supermarket Onboarding <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                    <Link href="/pricing">
                      See Supermarket Calculator
                    </Link>
                  </Button>
                </div>
              </FadeIn>
              <div className="text-sm text-muted-foreground">
                Powered by RFM Loyalty
              </div>
            </div>

            {/* Terminal Visual */}
            <FadeIn direction="left" delay={0.6}>
              <Card className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <div className="bg-muted/30 p-6 rounded-lg border">
                      <div className="text-lg font-semibold text-primary mb-4">Checkout Lane Terminal</div>
                      <div className="bg-background p-4 rounded border text-sm space-y-2">
                        <div className="text-green-600 font-medium">🥬 Category booster active: Produce 2×</div>
                        <div className="text-blue-600 font-medium">💎 High-Value Member</div>
                        <div className="border-t pt-2 mt-2">
                          <div className="text-center">
                            <div className="text-primary font-semibold">Reward Available: AED 10</div>
                            <div className="flex justify-center gap-2 mt-2">
                              <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs">Accept</button>
                              <button className="px-3 py-1 bg-muted rounded text-xs">Skip</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Front-end checkout with category boosters
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Terminal-Native Loyalty Wins in Grocery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Terminal-Native Loyalty Wins in Grocery
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Supermarkets run on speed and thin margins. Points let you drive loyalty without price cuts, and placing rewards inside your terminal means no new devices at checkout, no added steps, and no risk to throughput.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <ShoppingCart className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Weekly shops</h3>
                  <p className="text-muted-foreground text-sm">
                    Earn every visit; bounce-back bonus for a second weekly trip.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Brand partnerships</h3>
                  <p className="text-muted-foreground text-sm">
                    Double points on sponsor brands to grow co-op value.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Apple className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Healthy baskets</h3>
                  <p className="text-muted-foreground text-sm">
                    Bonus points for produce, whole grains, low-sugar items.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">New product trials</h3>
                  <p className="text-muted-foreground text-sm">
                    "3× points this week" to speed trial without BOGOs.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Line-Speed Performance */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              No impact on checkout speed
            </h2>
            <p className="text-xl text-muted-foreground">
              Loyalty prompts are designed for speed—single number entry plus one-tap prompts.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Checkout Time Analysis</CardTitle>
                  <CardDescription>Average checkout time by lane (seconds)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <BarChart data={checkoutSpeedData}>
                          <XAxis dataKey="lane" />
                          <YAxis />
                          <ChartTooltip 
                            content={
                              <ChartTooltipContent 
                                formatter={(value, name) => [
                                  `${value}s`,
                                  name === 'avgTime' ? 'Regular Checkout' : 'With Loyalty'
                                ]}
                              />
                            }
                          />
                          <Bar dataKey="avgTime" fill="hsl(var(--muted))" name="Regular" />
                          <Bar dataKey="withLoyalty" fill="hsl(var(--primary))" name="With Loyalty" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Average impact: +2-3 seconds per transaction
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Line-Speed Prompts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <strong>"Reward available: AED 10"</strong> → Redeem instantly (customer choice).
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <strong>"Category booster active: Produce 2×"</strong> → Subtle prompt, no slow-down.
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                      <strong>"High-Value Member"</strong> → Optional: invite to quarterly VIP event.
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Front-End Training</span>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Cashiers enter phone number at tender</li>
                      <li>• Prompts are yes/no, designed not to slow the line</li>
                      <li>• Use lane-side decals as reminders</li>
                      <li>• 5-7 minute training session per cashier</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Category Performance */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Drive category performance
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Category Booster Results</CardTitle>
                  <CardDescription>Sales performance with targeted point multipliers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <BarChart data={basketAnalysisData}>
                          <XAxis dataKey="category" />
                          <YAxis />
                          <ChartTooltip 
                            content={
                              <ChartTooltipContent 
                                formatter={(value, name) => [
                                  `${value}%`,
                                  name === 'baseline' ? 'Baseline Performance' : 'With Point Multiplier'
                                ]}
                              />
                            }
                          />
                          <Bar dataKey="baseline" fill="hsl(var(--muted))" name="Baseline" />
                          <Bar dataKey="withBooster" fill="hsl(var(--primary))" name="With Booster" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trip Frequency Impact</CardTitle>
                    <CardDescription>Monthly shopping frequency comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ChartContainer config={chartConfig} className="h-full w-full">
                        <ResponsiveContainer>
                          <LineChart data={tripFrequencyData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip 
                              content={
                                <ChartTooltipContent 
                                  formatter={(value, name) => [
                                    `${value} trips/month`,
                                    name === 'avgTrips' ? 'Average Customers' : 'Loyalty Members'
                                  ]}
                                />
                              }
                            />
                            <Line 
                              type="monotone" 
                              dataKey="avgTrips" 
                              stroke="hsl(var(--muted-foreground))" 
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              name="Average"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="loyaltyTrips" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={3}
                              name="Loyalty Members"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">+10-15%</div>
                    <div className="text-sm text-muted-foreground">Average basket size</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">50%+</div>
                    <div className="text-sm text-muted-foreground">Redemption rates</div>
                  </Card>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Weekly Shopping Patterns */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Bounce-back campaigns drive frequency
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Shopping Volume</CardTitle>
                  <CardDescription>Customer visits before and after bounce-back campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <AreaChart data={weeklyShoppingData}>
                          <XAxis dataKey="day" />
                          <YAxis />
                          <ChartTooltip 
                            content={
                              <ChartTooltipContent 
                                formatter={(value, name) => [
                                  `${value} customers`,
                                  name === 'regular' ? 'Regular Customers' : 'With Bounce-Back Campaign'
                                ]}
                              />
                            }
                          />
                          <Area
                            type="monotone"
                            dataKey="regular"
                            stackId="1"
                            stroke="hsl(var(--muted-foreground))"
                            fill="hsl(var(--muted))"
                            fillOpacity={0.6}
                            name="Regular"
                          />
                          <Area
                            type="monotone"
                            dataKey="bounceBack"
                            stackId="2"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.8}
                            name="Bounce-Back"
                          />
                        </AreaChart>
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
                      "Our weekend traffic increased 12% after launching the bounce-back program. Customers actually plan their second weekly shop around the bonus points."
                    </blockquote>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <cite className="text-muted-foreground">
                      — Supermarket Chain, Sharjah
                    </cite>
                  </div>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4 text-center">Campaign Examples</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                        <strong>Weekly Double-Up:</strong> Shop again within 7 days for double points
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <strong>Healthy Bonus:</strong> Extra points on fresh produce and organic items
                      </div>
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                        <strong>Brand Partner:</strong> 3× points on featured brand partners
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                Exclusive to RFM Payment Terminals—on RFM Loyalty's high-volume retail infrastructure.
              </p>
              <div className="flex items-center justify-center mx-auto">
                <Image 
                  src="/rfm-loyalty-logo.jpg" 
                  alt="RFM Loyalty Logo" 
                  width={120} 
                  height={32} 
                  className="h-8 w-auto"
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
            Grow trips and baskets—without price wars.
          </h2>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/onboarding?industry=supermarkets">
              Start Supermarket Onboarding <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}