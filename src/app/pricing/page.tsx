"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { formatCurrency } from "@/lib/utils"
import { Check, Calculator, ArrowRight, Shield } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-frosted-silver py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-shadow-black mb-4">
            <span className="text-primary">
              Transparent, predictable pricing
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Tied to redeemed sales. No charges on unredeemed points or their corresponding sales.
          </p>
        </div>

        {/* Pricing Explanation */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
            <CardContent className="pt-6">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-electric-blue mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-shadow-black mb-4">
                You only pay when customers redeem
              </h2>
              <p className="text-lg text-muted-foreground">
                Unlike traditional loyalty programs, you're never charged for points that sit unused.
              </p>
            </div>

            {/* Example Calculation */}
            <div className="bg-white/60 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-center mb-6">Example Calculation</h3>
              
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-electric-blue mb-2">
                    <AnimatedCounter value={100000} prefix="AED " />
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly Sales</p>
                </div>
                
                <div>
                  <div className="text-2xl font-bold text-electric-blue mb-2">
                    <AnimatedCounter value={10} suffix="%" />
                  </div>
                  <p className="text-sm text-muted-foreground">Award Rule</p>
                </div>
                
                <div>
                  <div className="text-2xl font-bold text-electric-blue mb-2">
                    <AnimatedCounter value={40} suffix="%" />
                  </div>
                  <p className="text-sm text-muted-foreground">Redemption Rate</p>
                </div>
                
                <div>
                  <div className="text-2xl font-bold text-electric-blue mb-2">
                    <AnimatedCounter value={2} suffix="%" />
                  </div>
                  <p className="text-sm text-muted-foreground">Service Fee</p>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Fee Base (Redeemed Sales)</p>
                    <div className="text-xl font-bold text-shadow-black">
                      {formatCurrency(40000)}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Your Monthly Cost</p>
                    <div className="text-3xl font-bold text-electric-blue">
                      <AnimatedCounter value={800} prefix="AED " />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/calculator">
                  <Calculator className="mr-2 h-4 w-4" />
                  Try the Calculator
                </Link>
              </Button>
            </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Simple Fee Structure</CardTitle>
            </CardHeader>
            <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-lime-burst flex-shrink-0 mt-0.5" />
                <span className="text-sm">2% service fee on redeemed sales only</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-lime-burst flex-shrink-0 mt-0.5" />
                <span className="text-sm">No setup fees or monthly minimums</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-lime-burst flex-shrink-0 mt-0.5" />
                <span className="text-sm">No charges on unredeemed points</span>
              </li>
            </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Cost Control</CardTitle>
            </CardHeader>
            <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-lime-burst flex-shrink-0 mt-0.5" />
                <span className="text-sm">Predictable costs tied to actual redemptions</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-lime-burst flex-shrink-0 mt-0.5" />
                <span className="text-sm">Lower total cost than blanket discounts</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-lime-burst flex-shrink-0 mt-0.5" />
                <span className="text-sm">Margin protection built-in</span>
              </li>
            </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-lime-burst flex-shrink-0 mt-0.5" />
                <span className="text-sm">Complete loyalty program setup</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-lime-burst flex-shrink-0 mt-0.5" />
                <span className="text-sm">Customer mobile app integration</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-lime-burst flex-shrink-0 mt-0.5" />
                <span className="text-sm">Real-time reporting dashboard</span>
              </li>
            </ul>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Pricing FAQ</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-shadow-black mb-2">
                  How is the fee calculated?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Service Fee = (Monthly Sales × Redemption Rate) × Service Fee Rate. 
                  You're only charged on the portion of sales where customers actually redeem their points.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-shadow-black mb-2">
                  What counts as redeemed sales?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Only the sales transactions where customers use their points for rewards. 
                  If a customer earns points but never uses them, you pay nothing on those sales.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-shadow-black mb-2">
                  Can I change my award rule later?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can adjust your earn-back percentage at any time through your dashboard. 
                  Changes apply to new transactions going forward.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-shadow-black mb-2">
                  What's the typical redemption rate?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Most businesses see 30-50% redemption rates. This means you typically pay fees on less than half your eligible sales.
                </p>
              </div>

              <div>
                <h3 className="font-semibent text-shadow-black mb-2">
                  How do points affect margins vs discounts?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Points preserve margins better because: (1) you only pay when they're used, 
                  (2) customers often spend more to reach point thresholds, (3) no immediate margin impact like discounts.
                </p>
              </div>
            </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
            <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-shadow-black mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Set up your loyalty program in minutes and start rewarding customers smarter.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/onboarding">
                Start Onboarding <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}