"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animate-ui/fade-in"
import { AnimatedText } from "@/components/animate-ui/animated-text"
import { ArrowRight, Shield, TrendingUp, Zap, Gift, Users, Clock, Star, Quote, Utensils } from "lucide-react"
import Link from "next/link"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, LineChart, Line, AreaChart, Area } from "recharts"

export default function RestaurantsPage() {
  // Chart data - realistic restaurant metrics
  const daypartData = [
    { time: "11AM", covers: 25, withPoints: 35 },
    { time: "12PM", covers: 45, withPoints: 52 },
    { time: "1PM", covers: 65, withPoints: 68 },
    { time: "2PM", covers: 40, withPoints: 45 },
    { time: "3PM", covers: 15, withPoints: 28 }, // Off-peak multiplier effect
    { time: "4PM", covers: 12, withPoints: 24 },
    { time: "5PM", covers: 18, withPoints: 32 },
    { time: "6PM", covers: 75, withPoints: 82 }
  ]

  const restaurantKPIsData = [
    { metric: "Visit Frequency", before: 2.1, after: 2.8 },
    { metric: "AOV", before: 85, after: 98 },
    { metric: "Appetizer Attach", before: 35, after: 52 },
    { metric: "Dessert Attach", before: 28, after: 41 }
  ]

  const loyaltyProgressData = [
    { week: "Week 1", newMembers: 45, totalSpend: 3200 },
    { week: "Week 2", newMembers: 62, totalSpend: 4100 },
    { week: "Week 3", newMembers: 78, totalSpend: 5400 },
    { week: "Week 4", newMembers: 89, totalSpend: 6800 }
  ]

  const chartConfig: ChartConfig = {
    covers: { label: "Covers" },
    withPoints: { label: "With Points Program" },
    before: { label: "Before Points" },
    after: { label: "With Points" },
    newMembers: { label: "New Members" },
    totalSpend: { label: "Total Spend (AED)" }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-background via-white to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary">Restaurant Solutions</Badge>
              <AnimatedText
                text="Keep your tables full—without discounting away your profits."
                className="text-5xl lg:text-7xl font-bold text-foreground leading-tight"
                variant="slide"
                stagger={0.05}
              />
              <FadeIn direction="up" delay={0.3}>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Partners Points is inside your RFM Payment Terminal, so servers can award or redeem points in seconds when presenting the terminal. No extra devices. No staff app juggling. Just faster repeat visits.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href="/onboarding?industry=restaurants">
                      Start Restaurant Onboarding <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                    <Link href="/calculator?industry=restaurants">
                      See Restaurant Calculator
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
                      <div className="text-lg font-semibold text-primary mb-4">Table-side Terminal</div>
                      <div className="bg-background p-4 rounded border text-sm space-y-2">
                        <div className="text-green-600 font-medium">✓ High Spender Detected</div>
                        <div className="text-blue-600 font-medium">🎂 Birthday Month</div>
                        <div className="border-t pt-2 mt-2">
                          <div className="text-center">
                            <div className="text-primary font-semibold">Reward available: Free Dessert</div>
                            <div className="flex justify-center gap-2 mt-2">
                              <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs">Accept</button>
                              <button className="px-3 py-1 bg-muted rounded text-xs">Skip</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Server presenting terminal with loyalty prompts
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Restaurant Challenges We Solve */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Loyalty that respects speed of service and margins.
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Restaurants need predictable margins and fast front-of-house. Points let you reward loyalty after spend, not by cutting price before the order.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Fill slow periods</h3>
                  <p className="text-muted-foreground text-sm">
                    Use multipliers at off-peak hours.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Lift check size</h3>
                  <p className="text-muted-foreground text-sm">
                    Bonus points on high-margin add-ons (e.g., sides, drinks).
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Bring guests back</h3>
                  <p className="text-muted-foreground text-sm">
                    Short-cycle "bounce-back" offers.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Keep service tight</h3>
                  <p className="text-muted-foreground text-sm">
                    Terminal flow stays uninterrupted.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Table, Counter, Delivery Coverage */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Table, Counter, Delivery—All Covered
            </h2>
            <p className="text-xl text-muted-foreground">
              Whether you close checks at the table, the counter, or pickup, staff simply enters the guest's phone number during payment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Off-Peak Performance</CardTitle>
                  <CardDescription>Cover count before and after points program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <BarChart data={daypartData}>
                          <XAxis dataKey="time" />
                          <YAxis />
                          <ChartTooltip 
                            content={<ChartTooltipContent />}
                            formatter={(value, name) => [
                              `${value} covers`,
                              name === 'covers' ? 'Before Points' : 'With Points Program'
                            ]}
                          />
                          <Bar dataKey="covers" fill="hsl(var(--muted))" name="Before" />
                          <Bar dataKey="withPoints" fill="hsl(var(--primary))" name="With Points" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Note the 3-6PM uplift with off-peak multipliers
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <Utensils className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-center mb-3">FOH Prompts</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <strong>"High Spender Detected"</strong> → Offer double points tonight or invite to Chef's Table event.
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                        <strong>"5th Visit in 30 Days"</strong> → Suggest a loyalty thank-you (e.g., appetizer on next visit via points).
                      </div>
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                        <strong>"Reward available: Free Dessert"</strong> → Redeem with one tap (guest consented).
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      Prompts are concise to protect table turn time.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Restaurant Playbooks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Proven restaurant campaigns you can launch this week.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      "Off-Peak Multiplier"
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div><strong>Setup:</strong> 2× points Mon–Thu 3–6pm.</div>
                      <div><strong>Effect:</strong> Fills shoulder hours.</div>
                      <div><strong>Measure:</strong> Cover count, RevPASH in windows.</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      "Add-On Bonus"
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div><strong>Setup:</strong> +50 pts for starters or desserts.</div>
                      <div><strong>Effect:</strong> Lifts contribution margin.</div>
                      <div><strong>Measure:</strong> Attach rate, contribution.</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      "Visit-5 Reward"
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div><strong>Setup:</strong> Free appetizer via points on the 5th visit in 30 days.</div>
                      <div><strong>Effect:</strong> Shortens repeat cycle.</div>
                      <div><strong>Measure:</strong> Days-to-return, frequency.</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      "Birthday Month"
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div><strong>Setup:</strong> 2× week during guest's birthday month.</div>
                      <div><strong>Effect:</strong> Emotional loyalty, party size.</div>
                      <div><strong>Measure:</strong> Party size, avg check.</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant KPIs Impact</CardTitle>
                  <CardDescription>Before vs after points program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <BarChart data={restaurantKPIsData} layout="horizontal">
                          <XAxis type="number" />
                          <YAxis dataKey="metric" type="category" width={100} />
                          <ChartTooltip 
                            content={<ChartTooltipContent />}
                            formatter={(value, name) => [
                              name === 'before' || name === 'after' ? 
                                (value > 10 ? `${value}` : `${value}x`) : value,
                              name === 'before' ? 'Before Points' : 'With Points'
                            ]}
                          />
                          <Bar dataKey="before" fill="hsl(var(--muted))" name="Before" />
                          <Bar dataKey="after" fill="hsl(var(--primary))" name="After" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">+20-40%</div>
                      <div className="text-muted-foreground">Visit frequency increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">67%</div>
                      <div className="text-muted-foreground">More spend by loyal customers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Loyalty Growth Tracking */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Track your program's growth
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Program Growth</CardTitle>
                  <CardDescription>New member acquisition and spend impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <AreaChart data={loyaltyProgressData}>
                          <XAxis dataKey="week" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <ChartTooltip 
                            content={<ChartTooltipContent />}
                            formatter={(value, name) => [
                              name === 'newMembers' ? `${value} members` : `AED ${value.toLocaleString()}`,
                              name === 'newMembers' ? 'New Members' : 'Total Spend'
                            ]}
                          />
                          <Area 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="newMembers" 
                            stackId="1"
                            stroke="hsl(var(--primary))" 
                            fill="hsl(var(--primary))"
                            fillOpacity={0.6}
                            name="New Members"
                          />
                          <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="totalSpend" 
                            stroke="hsl(var(--secondary))" 
                            strokeWidth={3}
                            name="Total Spend"
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
                      "Our dessert attachment went from 25% to 41% in two months. The terminal makes it so natural to offer the reward during payment."
                    </blockquote>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <cite className="text-muted-foreground">
                      — Fine Dining Restaurant, Abu Dhabi
                    </cite>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">15 sec</div>
                    <div className="text-sm text-muted-foreground">Average loyalty interaction</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">85%</div>
                    <div className="text-sm text-muted-foreground">Guest satisfaction with program</div>
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
                Built exclusively for RFM Payment Terminals, on RFM Loyalty's hospitality-ready platform.
              </p>
              <div className="w-24 h-8 bg-muted rounded flex items-center justify-center mx-auto">
                <span className="text-xs text-muted-foreground">RFM Logo</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start your restaurant loyalty—right at the table.
          </h2>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/onboarding?industry=restaurants">
              Start Restaurant Onboarding <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}