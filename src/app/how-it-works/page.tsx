"use client"

import { Button } from "@/components/ui/button"
import { BrandCard } from "@/components/ui/brand-card"
import { GradientText } from "@/components/ui/gradient-text"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FloatingElement, PulseElement } from "@/components/ui/floating-elements"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { 
  Smartphone, 
  CreditCard, 
  Gift, 
  Star, 
  MapPin, 
  Users, 
  Shield,
  ArrowRight,
  CheckCircle,
  Zap
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Smartphone,
    title: "Download the App",
    description: "Get the Partners Points app from the App Store or Google Play. Sign up with your phone number or email in seconds.",
    visual: "app-download"
  },
  {
    icon: MapPin,
    title: "Find Partner Merchants",
    description: "Discover hundreds of participating businesses near you. From your favorite café to the local gym.",
    visual: "merchant-map"
  },
  {
    icon: CreditCard,
    title: "Shop & Earn Points",
    description: "Show your Partners Points ID at checkout. Earn points automatically on every purchase.",
    visual: "earn-points"
  },
  {
    icon: Gift,
    title: "Redeem Rewards",
    description: "Use your points for discounts, free items, or special offers. The choice is yours.",
    visual: "redeem-rewards"
  }
]

const benefits = [
  {
    icon: Star,
    title: "Earn Everywhere",
    value: "500+",
    description: "Partner merchants across the UAE"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    value: "100%",
    description: "Your data is never sold or shared"
  },
  {
    icon: Zap,
    title: "Instant Rewards",
    value: "0",
    description: "Seconds to redeem your points"
  },
  {
    icon: Users,
    title: "Growing Community",
    value: "25K+",
    description: "Active users earning points daily"
  }
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-frosted-silver">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-electric-blue via-azure-breeze to-vivid-violet text-white">
        {/* Floating background elements */}
        <FloatingElement className="absolute top-20 left-10 opacity-20" duration={8} distance={30}>
          <div className="w-20 h-20 bg-white/20 rounded-full blur-sm"></div>
        </FloatingElement>
        <FloatingElement className="absolute top-40 right-20 opacity-20" duration={6} distance={40} axis="both">
          <div className="w-16 h-16 bg-lime-burst/30 rounded-full blur-sm"></div>
        </FloatingElement>
        <FloatingElement className="absolute bottom-32 left-1/4 opacity-20" duration={10} distance={25}>
          <div className="w-12 h-12 bg-white/30 rounded-full blur-sm"></div>
        </FloatingElement>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Earn points on
                <br />
                <span className="text-lime-burst">everything you love</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Join thousands of customers earning points at their favorite businesses across the UAE. 
                Simple, secure, and rewarding.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <Button asChild size="lg" className="bg-lime-burst hover:bg-lime-burst/90 text-midnight-navy font-semibold text-lg px-8 py-6">
                  <Link href="/merchants">
                    Find Merchants Near You <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-shadow-black mb-6">
                <GradientText variant="blue">
                  How it works
                </GradientText>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Getting started with Partners Points is simple. Four easy steps to start earning rewards.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {steps.map((step, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                <ScrollReveal delay={index * 0.2} className="flex-1">
                  <InteractiveCard variant="elevated" className="relative">
                    <PulseElement className="absolute -top-4 -left-4 w-12 h-12 bg-electric-blue text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {index + 1}
                    </PulseElement>
                    
                    <div className="pt-4">
                      <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <step.icon className="w-8 h-8 text-electric-blue" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-shadow-black mb-4 text-center">
                        {step.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-center leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </InteractiveCard>
                </ScrollReveal>

                <ScrollReveal delay={index * 0.2 + 0.1} direction="right" className="flex-1">
                  <BrandCard variant="gradient" className="overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-electric-blue/10 via-azure-breeze/10 to-vivid-violet/10 flex items-center justify-center rounded-xl">
                      <div className="text-center space-y-4">
                        <step.icon className="w-20 h-20 text-electric-blue mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          [Step {index + 1} illustration]
                          <br />
                          800x800 - {step.visual}
                        </p>
                      </div>
                    </div>
                  </BrandCard>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-shadow-black mb-6">
                Why customers love Partners Points
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join the growing community of smart shoppers earning more from every purchase
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <InteractiveCard variant="elevated" className="text-center h-full">
                  <FloatingElement duration={4 + index} distance={10}>
                    <benefit.icon className="w-12 h-12 text-electric-blue mx-auto mb-4" />
                  </FloatingElement>
                  
                  <div className="text-3xl font-bold text-electric-blue mb-2">
                    <AnimatedCounter 
                      value={parseInt(benefit.value) || 0} 
                      suffix={benefit.value.includes('+') ? '+' : benefit.value.includes('%') ? '%' : ''}
                      duration={1500}
                    />
                  </div>
                  
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-24 bg-gradient-to-br from-midnight-navy via-electric-blue/95 to-azure-breeze/90 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <FloatingElement className="absolute top-10 left-20 opacity-10" duration={12} distance={50} axis="both">
          <div className="w-32 h-32 bg-lime-burst rounded-full blur-lg"></div>
        </FloatingElement>
        <FloatingElement className="absolute bottom-20 right-10 opacity-10" duration={8} distance={40}>
          <div className="w-24 h-24 bg-white rounded-full blur-lg"></div>
        </FloatingElement>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to start earning?
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                Download the Partners Points app today and discover hundreds of ways to earn points on purchases you're already making.
              </p>
              
              {/* App Store Buttons Placeholder */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 min-w-[200px]">
                  <div className="text-center">
                    <Smartphone className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">[App Store Badge]</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 min-w-[200px]">
                  <div className="text-center">
                    <Smartphone className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">[Google Play Badge]</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-white/70">
                Free download • No subscription fees • Secure & private
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}