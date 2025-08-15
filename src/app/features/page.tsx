"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animate-ui/fade-in"
import { AnimatedText } from "@/components/animate-ui/animated-text"
import { ArrowRight, TrendingUp, Shield, Zap, Settings, Eye, Users, Gift } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ChartConfig } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/charts/ClientChart"

export default function FeaturesPage() {
  // Chart data
  const redemptionData = [
    { type: "Redeemed", value: 40, fill: "hsl(var(--primary))" },
    { type: "Unredeemed", value: 60, fill: "hsl(var(--muted))" }
  ]

  const costComparisonData = [
    { program: "Discounts", cost: 100, fill: "hsl(var(--destructive))" },
    { program: "Points", cost: 35, fill: "hsl(var(--primary))" }
  ]

  const chartConfig: ChartConfig = {
    value: { label: "Percentage" },
    cost: { label: "Cost Index" }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-background via-white to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <AnimatedText
              text="The loyalty program inside your RFM Payment Terminal."
              className="text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
              variant="slide"
              stagger={0.05}
            />
            <FadeIn direction="up" delay={0.3}>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
                Award and redeem points in seconds, no integrations required.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {/* Points over discounts */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="up" delay={0.1}>
                <div className="space-y-6">
                  <Badge variant="secondary" className="text-sm">Core Feature</Badge>
                  <h2 className="text-4xl font-bold text-foreground">Points over discounts</h2>
                  <p className="text-xl text-muted-foreground">
                    Protect margin by rewarding for future visits, not cutting today's price. Built into your RFM Payment Terminal for seamless operations.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Terminal-native speed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Zero setup cost</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn direction="left" delay={0.2}>
                <Card className="p-8">
                  <div className="text-center space-y-4">
                    <Gift className="w-16 h-16 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold">Flexible Earn Rules</h3>
                    <p className="text-muted-foreground">
                      Set any percentage back in points - 5%, 10%, 15% or more
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-foreground font-medium">
                        Example: 10% back = Customer spends AED 100, earns 100 points
                      </p>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>

            {/* Transparent costs */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="right" delay={0.1}>
                <Card className="p-8">
                  <div className="space-y-6">
                    <Shield className="w-16 h-16 text-primary mx-auto" />
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-4">Only Pay on Redemption</h3>
                      
                      {/* Redemption Pie Chart */}
                      <div className="h-48 mb-6">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                          <ResponsiveContainer>
                            <PieChart>
                              <Pie
                                data={redemptionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {redemptionData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-2"></div>
                          <div className="font-semibold text-green-700">40% Redeemed</div>
                          <div className="text-green-600">You pay 2% fee</div>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <div className="w-3 h-3 bg-muted rounded-full mx-auto mb-2"></div>
                          <div className="font-semibold text-muted-foreground">60% Unredeemed</div>
                          <div className="text-muted-foreground">You pay AED 0</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <div className="space-y-6">
                  <Badge variant="secondary" className="text-sm">Transparent Pricing</Badge>
                  <h2 className="text-4xl font-bold text-foreground">Transparent costs</h2>
                  <p className="text-xl text-muted-foreground">
                    Pay a small percentage on redeemed sales only — never on unredeemed points. No software license fees, no extra devices.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">2% service fee on redeemed sales only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">AED 0 setup fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">AED 0 monthly fees</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Effortless setup */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="up" delay={0.1}>
                <div className="space-y-6">
                  <Badge variant="secondary" className="text-sm">Smart Triggers</Badge>
                  <h2 className="text-4xl font-bold text-foreground">Smart triggers</h2>
                  <p className="text-xl text-muted-foreground">
                    Get notified of "High Spender" or "5th Visit" in real time during checkout. 
                    All powered by your existing RFM Payment Terminal.
                  </p>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <strong>"High Spender Detected"</strong> → Offer double points today or invite to VIP tier.
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <strong>"5th Visit in 30 Days"</strong> → Suggest a gentle thank-you and remind of upcoming reward.
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                      <strong>"Reward available: 20 AED"</strong> → Staff can redeem on the spot (with customer consent).
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn direction="left" delay={0.2}>
                <Card className="p-8">
                  <div className="text-center space-y-4">
                    <Zap className="w-16 h-16 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold">RFM Terminal Native</h3>
                    <p className="text-muted-foreground">
                      Built directly into your RFM Payment Terminal—no additional hardware needed
                    </p>
                    <div className="bg-muted/30 p-4 rounded">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-2">15,000+</div>
                        <div className="text-sm text-muted-foreground">RFM Terminals across UAE</div>
                        <div className="text-lg font-bold text-primary mt-2">AED 1.5B+</div>
                        <div className="text-sm text-muted-foreground">Monthly transaction volume</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>

            {/* Flexible controls */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="right" delay={0.1}>
                <Card className="p-8">
                  <div className="text-center space-y-4">
                    <Settings className="w-16 h-16 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold">Full Control Dashboard</h3>
                    <p className="text-muted-foreground">
                      Adjust your earn percentage, view analytics, manage customers
                    </p>
                    
                    {/* Cost Comparison Chart */}
                    <div className="h-32 mb-4">
                      <ChartContainer config={chartConfig} className="h-full w-full">
                        <ResponsiveContainer>
                          <BarChart data={costComparisonData} layout="horizontal">
                            <XAxis type="number" />
                            <YAxis dataKey="program" type="category" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="cost" fill="var(--color-cost)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                    
                    <div className="text-left space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>Current earn rate:</span>
                        <Badge>10%</Badge>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>Redemption rate:</span>
                        <span className="text-primary">35%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted/30 rounded">
                        <span>Monthly cost:</span>
                        <span className="text-primary">65% less</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <div className="space-y-6">
                  <Badge variant="secondary" className="text-sm">Full Control</Badge>
                  <h2 className="text-4xl font-bold text-foreground">Merchant Portal & Customer App</h2>
                  <p className="text-xl text-muted-foreground">
                    Track program performance, adjust earn rules anytime via web portal. 
                    Customers track points and rewards instantly in the app.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Merchant Portal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Customer App</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* "At the Counter" Flow */}
            <div className="text-center">
              <FadeIn direction="up" delay={0.1}>
                <Card className="p-8 max-w-4xl mx-auto">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-foreground">"At the Counter" Flow</h3>
                    <p className="text-muted-foreground">
                      Step-by-step visual showing how it works on the terminal screen.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-primary font-bold">1</span>
                        </div>
                        <p className="text-sm font-medium">Customer Payment</p>
                        <p className="text-xs text-muted-foreground">Normal checkout flow</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-primary font-bold">2</span>
                        </div>
                        <p className="text-sm font-medium">Enter Phone</p>
                        <p className="text-xs text-muted-foreground">Quick number entry</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-primary font-bold">3</span>
                        </div>
                        <p className="text-sm font-medium">Profile Loads</p>
                        <p className="text-xs text-muted-foreground">Instant recognition</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-primary font-bold">4</span>
                        </div>
                        <p className="text-sm font-medium">Award/Redeem</p>
                        <p className="text-xs text-muted-foreground">One-tap action</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-primary font-bold">5</span>
                        </div>
                        <p className="text-sm font-medium">Real-time Sync</p>
                        <p className="text-xs text-muted-foreground">Portal & app update</p>
                      </div>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="text-primary font-semibold">
                        Total time: Under 10 seconds — seamlessly integrated into checkout
                      </p>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Powered by RFM Loyalty Strip */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Powered by RFM Loyalty — trusted by businesses across the UAE.
              </p>
              <div className="flex items-center justify-center mx-auto">
                <Image 
                  src="/rfm-loyalty-logo.svg" 
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

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to launch your loyalty program?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start rewarding customers and protecting your margins today.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/onboarding">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}