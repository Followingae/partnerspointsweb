"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animate-ui/fade-in"
import { AnimatedText } from "@/components/animate-ui/animated-text"
import { ArrowRight, Target, Users, Shield, TrendingUp, Heart } from "lucide-react"
import Link from "next/link"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from "recharts"

export default function AboutPage() {
  // Chart data showing network growth
  const networkGrowthData = [
    { year: "2020", terminals: 5000, volume: 300 },
    { year: "2021", terminals: 8500, volume: 650 },
    { year: "2022", terminals: 12000, volume: 950 },
    { year: "2023", terminals: 15000, volume: 1200 },
    { year: "2024", terminals: 15000, volume: 1500 }
  ]

  const chartConfig: ChartConfig = {
    terminals: { label: "Active Terminals" },
    volume: { label: "Volume (AED Millions)" }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-background via-white to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <AnimatedText
              text="About Partners Points"
              className="text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
              variant="slide"
              stagger={0.05}
            />
            <FadeIn direction="up" delay={0.3}>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
                Making loyalty simple, fair, and instantly accessible for every merchant.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <div className="space-y-6">
                <Badge variant="secondary">Our Story</Badge>
                <h2 className="text-4xl font-bold text-foreground">
                  Built for merchants, powered by proven infrastructure
                </h2>
                <p className="text-lg text-muted-foreground">
                  Partners Points was created to give merchants a loyalty program that's profitable, easy to run, and native to their payments. Built on the RFM Loyalty network, it leverages existing payment infrastructure to make loyalty truly plug-and-play.
                </p>
                <p className="text-lg text-muted-foreground">
                  We recognized that traditional loyalty programs often require significant upfront investment, complex integrations, and ongoing maintenance costs that put them out of reach for many businesses. By building directly into the payment terminal that merchants already use every day, we've eliminated these barriers entirely.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>RFM Network Growth</CardTitle>
                  <CardDescription>Terminal deployment and transaction volume over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <AreaChart data={networkGrowthData}>
                          <XAxis dataKey="year" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <ChartTooltip 
                            content={<ChartTooltipContent />}
                            formatter={(value, name) => [
                              name === 'terminals' ? `${value.toLocaleString()} terminals` : `AED ${value}M`,
                              name === 'terminals' ? 'Active Terminals' : 'Monthly Volume'
                            ]}
                          />
                          <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="terminals"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.6}
                            name="Terminals"
                          />
                          <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="volume"
                            stroke="hsl(var(--secondary))"
                            fill="hsl(var(--secondary))"
                            fillOpacity={0.4}
                            name="Volume"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">15,000+</div>
                      <div className="text-sm text-muted-foreground">Active terminals</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">AED 1.5B+</div>
                      <div className="text-sm text-muted-foreground">Monthly volume</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Our Mission & Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Mission</h3>
                  <p className="text-muted-foreground">
                    Make loyalty simple, fair, and instantly accessible for every merchant.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                  <p className="text-muted-foreground">
                    Loyalty should be available to businesses of all sizes, not just large enterprises.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                  <p className="text-muted-foreground">
                    Clear, predictable pricing with no hidden fees or complex terms.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Results</h3>
                  <p className="text-muted-foreground">
                    Focus on measurable outcomes that drive real business value.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Powered by RFM Loyalty */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-12">
                    <Badge variant="secondary" className="mb-4">Partnership</Badge>
                    <h2 className="text-3xl font-bold text-foreground mb-6">
                      Powered by RFM Loyalty
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Partners Points operates on RFM Loyalty's proven merchant engagement platform, trusted by thousands of UAE businesses. This partnership brings together payment infrastructure expertise with loyalty program innovation.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">15,000+ terminals nationwide</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">AED 1.5B+ monthly transaction volume</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">Secure, PCI-compliant infrastructure</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">24/7 technical support</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/20 p-8 lg:p-12 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-16 bg-muted rounded flex items-center justify-center mx-auto mb-4">
                        <span className="text-muted-foreground">RFM Logo</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Leading payment technology and<br />merchant engagement solutions
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to transform your customer loyalty?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of merchants already using Partners Points to grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/onboarding">
                Start Onboarding <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
