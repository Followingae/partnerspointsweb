"use client";

import { Metadata } from 'next';
import Section from "@/components/modern/Section";
import HeroBg from "@/components/modern/HeroBg";
import InView from "@/components/modern/InView";
import { Card } from "@/components/modern/Card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, TrendingUp, Heart, Calendar, Users, CheckCircle, Star, Quote, Stethoscope, Activity, FileText, Clock, BarChart3, Settings, HelpCircle } from "lucide-react";
import { FadeIn } from "@/components/animate-ui/fade-in";
import { AnimatedText } from "@/components/animate-ui/animated-text";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type ChartConfig } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/charts/ClientChart";

// Metadata moved to layout.tsx for client components

export default function ClinicsPage() {
  // Chart data - realistic clinic metrics
  const adherenceData = [
    { treatment: "Dental Cleaning", before: 45, after: 72 },
    { treatment: "Follow-up Visits", before: 38, after: 65 },
    { treatment: "Preventive Care", before: 52, after: 77 },
    { treatment: "Treatment Plans", before: 61, after: 84 }
  ]

  const appointmentTrendsData = [
    { month: "Jan", booked: 180, completed: 165, noShow: 15 },
    { month: "Feb", booked: 195, completed: 182, noShow: 13 },
    { month: "Mar", booked: 210, completed: 198, noShow: 12 },
    { month: "Apr", booked: 225, completed: 218, noShow: 7 },
    { month: "May", booked: 240, completed: 235, noShow: 5 },
    { month: "Jun", booked: 255, completed: 248, noShow: 7 }
  ]

  const patientRetentionData = [
    { segment: "New Patients", retention: 45 },
    { segment: "2nd Visit", retention: 68 },
    { segment: "Regular Patients", retention: 89 },
    { segment: "Treatment Plans", retention: 92 }
  ]

  const chartConfig: ChartConfig = {
    before: { label: "Before Points" },
    after: { label: "With Points" },
    booked: { label: "Booked" },
    completed: { label: "Completed" },
    noShow: { label: "No Show" },
    retention: { label: "Retention %" }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-background via-white to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary">Healthcare Solutions</Badge>
              <AnimatedText
                text="Build healthier patient relationships."
                className="text-5xl lg:text-7xl font-bold text-foreground leading-tight"
                variant="slide"
                stagger={0.05}
              />
              <FadeIn direction="up" delay={0.3}>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Partners Points helps clinics and wellness centers encourage follow-ups and treatment adherence—with loyalty inside your RFM Payment Terminal at reception. No extra systems. No disruption to clinical workflows.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href="/onboarding?industry=clinics">
                      Start Clinic Onboarding <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                    <Link href="/pricing">
                      See Clinic Calculator
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
                      <div className="text-lg font-semibold text-primary mb-4">Reception Terminal</div>
                      <div className="bg-background p-4 rounded border text-sm space-y-2">
                        <div className="text-blue-600 font-medium">📅 Follow-Up Due in 30 Days</div>
                        <div className="text-green-600 font-medium">🏆 Package Progress: Session 3/6</div>
                        <div className="border-t pt-2 mt-2">
                          <div className="text-center">
                            <div className="text-primary font-semibold">Reward available: AED 50</div>
                            <div className="text-xs text-muted-foreground mt-1">For eligible services</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reception desk showing follow-up prompts
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Clinics Benefit from Terminal-Native Loyalty */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why Clinics Benefit from Terminal-Native Loyalty
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Patients intend to return—but life gets in the way. Points create a gentle, ethical incentive to complete care plans and book preventive checks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Stethoscope className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Dental care</h3>
                  <p className="text-muted-foreground text-sm">
                    Points for cleanings; extra for completing multi-visit treatment.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aesthetic treatments</h3>
                  <p className="text-muted-foreground text-sm">
                    Reward package progression; bonus on aftercare purchases.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Wellness centers</h3>
                  <p className="text-muted-foreground text-sm">
                    Incentivize regular check-ins; promote preventive screenings.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Care-Appropriate Guardrails */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Guardrails & Ethical Tone
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Rewards must respect clinical priorities and patient dignity. Use modest incentives, avoid coercive language, and align with your organization's ethics policy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Adherence Impact</CardTitle>
                  <CardDescription>Completion rates before and after points program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <BarChart data={adherenceData}>
                          <XAxis 
                            dataKey="treatment" 
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
                                  name === 'before' ? 'Before Points' : 'With Points Program'
                                ]}
                              />
                            }
                          />
                          <Bar dataKey="before" fill="hsl(var(--muted))" name="Before" />
                          <Bar dataKey="after" fill="hsl(var(--primary))" name="After" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Average improvement: +30-50% completion rates
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Terminal Prompts (Front Desk)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <strong>"Follow-Up Due in 30 Days"</strong> → Suggest scheduling now; offer small bonus points for pre-booking.
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <strong>"Package Progress: Session 3/6"</strong> → Encourage continuation; award milestone bonuses.
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                      <strong>"Reward available: AED 50"</strong> → Redeem on eligible services/products (per your policy).
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Ethical Guidelines</span>
                    </div>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Configure exclusions for regulated items where required</li>
                      <li>• Use modest incentives, avoid coercive language</li>
                      <li>• Align with your organization's ethics policy</li>
                      <li>• Don't imply rewards replace clinical judgement</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Appointment & Retention Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Improved Appointment Adherence
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Appointment Trends</CardTitle>
                  <CardDescription>Booking vs completion rates with loyalty program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <LineChart data={appointmentTrendsData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip 
                            content={
                              <ChartTooltipContent 
                                formatter={(value, name) => [
                                  `${value} appointments`,
                                  name === 'booked' ? 'Booked' : name === 'completed' ? 'Completed' : 'No-Shows'
                                ]}
                              />
                            }
                          />
                          <Line 
                            type="monotone" 
                            dataKey="booked" 
                            stroke="hsl(var(--muted-foreground))" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Booked"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="completed" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={3}
                            name="Completed"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="noShow" 
                            stroke="hsl(var(--destructive))" 
                            strokeWidth={2}
                            name="No-Shows"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                    <div className="text-center">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full mx-auto mb-1" style={{opacity: 0.7}}></div>
                      <span className="text-muted-foreground">Booked</span>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-1"></div>
                      <span className="text-muted-foreground">Completed</span>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-destructive rounded-full mx-auto mb-1"></div>
                      <span className="text-muted-foreground">No-Shows</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Patient Retention by Segment</CardTitle>
                  <CardDescription>Retention rates with loyalty incentives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {patientRetentionData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{item.segment}</span>
                          <span className="text-sm font-bold text-primary">{item.retention}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.retention}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">+30%</div>
                      <div className="text-sm text-muted-foreground">Return rate increase</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">20%</div>
                      <div className="text-sm text-muted-foreground">Preventive care uptake</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Front Desk Experience */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Front Desk Training & Experience
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn direction="up" delay={0.1}>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-center mb-3">Simple Training</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Reception enters phone number during payment; prompts guide the conversation. Provide a 1-page guidance sheet with language that is friendly, non-pressuring, and privacy-aware.
                    </p>
                    <div className="space-y-3 text-sm bg-muted/50 p-4 rounded">
                      <div><strong>Micro-script examples:</strong></div>
                      <div className="italic">"Would you like to earn loyalty points for today's visit? I can add your number."</div>
                      <div className="italic">"You have a reward—shall I apply it to today's eligible items, or save it?"</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="text-center">
                    <Quote className="w-12 h-12 text-primary mx-auto mb-4" />
                    <blockquote className="text-lg font-medium text-foreground mb-4">
                      "Our follow-up appointment rate increased 40% in three months. Patients actually ask about their points now when they check out."
                    </blockquote>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <cite className="text-muted-foreground">
                      — Dental Clinic, Dubai
                    </cite>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">92%</div>
                    <div className="text-sm text-muted-foreground">Treatment plan completion</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">65%</div>
                    <div className="text-sm text-muted-foreground">Preventive booking rate</div>
                  </Card>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Compliance & Privacy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Compliance & Privacy Advisory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-blue-800">
                <p>
                  Configure rewards and messaging to align with local regulations and your compliance policy. Avoid implying that rewards replace clinical judgement.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Clearly disclose data use and allow opt-out of marketing communications</li>
                  <li>Configure exclusions for regulated services where needed</li>
                  <li>Ensure rewards support adherence, not pressure clinical decisions</li>
                  <li>Follow your organization's patient privacy and ethics guidelines</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Powered by RFM Loyalty */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Exclusive to RFM Payment Terminals—on RFM Loyalty's secure, privacy-aware platform.
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

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Support better follow-ups—with zero workflow change.
          </h2>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/onboarding?industry=clinics">
              Start Clinic Onboarding <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}