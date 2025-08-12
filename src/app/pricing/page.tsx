"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, TrendingUp, Zap, Shield, ArrowRight, CheckCircle, Phone, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

export default function PricingPage() {
  const [monthlySales, setMonthlySales] = useState(100000)
  const redemptionRate = 35 // Fixed at typical rate
  const [currentDiscount, setCurrentDiscount] = useState(10)

  // Calculations
  const loyaltyCost = (monthlySales * redemptionRate / 100) * 0.02 // Internal calculation only
  const discountCost = monthlySales * (currentDiscount / 100)
  const savings = discountCost - loyaltyCost
  const savingsPercentage = ((savings / discountCost) * 100)

  const incrementSales = () => {
    setMonthlySales(prev => Math.min(prev + 50000, 1000000))
  }

  const decrementSales = () => {
    setMonthlySales(prev => Math.max(prev - 50000, 50000))
  }

  const incrementDiscount = () => {
    setCurrentDiscount(prev => Math.min(prev + 1, 25))
  }

  const decrementDiscount = () => {
    setCurrentDiscount(prev => Math.max(prev - 1, 5))
  }

  return (
    <div className="min-h-screen py-16 pt-24 lg:pt-32">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Smart Loyalty Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how loyalty rewards can save your business money while building customer relationships
          </p>
        </div>

        {/* Benefits Calculator - Main Focus */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Calculator className="h-6 w-6" />
              Benefits Calculator
            </CardTitle>
            <CardDescription>
              Calculate your potential savings with loyalty rewards vs traditional discounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Input Controls */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Monthly Sales */}
              <div className="space-y-4">
                <Label>Monthly Sales Volume</Label>
                <div className="bg-muted/50 rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={decrementSales}
                      disabled={monthlySales <= 50000}
                      className="h-16 w-16 rounded-xl"
                    >
                      <Minus className="h-6 w-6" />
                    </Button>
                    
                    <div className="text-center flex-1 mx-6">
                      <div className="text-4xl font-bold text-primary mb-1">
                        AED {monthlySales.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per month
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={incrementSales}
                      disabled={monthlySales >= 1000000}
                      className="h-16 w-16 rounded-xl"
                    >
                      <Plus className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-4 px-2">
                    <span>Min: AED 50K</span>
                    <span>Increments of AED 50K</span>
                    <span>Max: AED 1M</span>
                  </div>
                </div>
              </div>

              {/* Current Discount Rate */}
              <div className="space-y-4">
                <Label>Your Current Discount Rate</Label>
                <div className="bg-muted/50 rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={decrementDiscount}
                      disabled={currentDiscount <= 5}
                      className="h-16 w-16 rounded-xl"
                    >
                      <Minus className="h-6 w-6" />
                    </Button>
                    
                    <div className="text-center flex-1 mx-6">
                      <div className="text-4xl font-bold text-primary mb-1">
                        {currentDiscount}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        discount rate
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={incrementDiscount}
                      disabled={currentDiscount >= 25}
                      className="h-16 w-16 rounded-xl"
                    >
                      <Plus className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-4 px-2">
                    <span>Min: 5%</span>
                    <span>Increments of 1%</span>
                    <span>Max: 25%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Redemption Rate Display */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-blue-900 font-medium">
                  Customer Redemption Rate: {redemptionRate}% (Industry Standard)
                </span>
              </div>
              <p className="text-xs text-blue-700 text-center mt-1">
                Based on typical loyalty program engagement rates
              </p>
            </div>

            <Separator />

            {/* Results Comparison */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Current Discount Cost */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-red-900 mb-2">Traditional Discounts</h3>
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      {formatCurrency(discountCost)}
                    </div>
                    <p className="text-sm text-red-700">Monthly cost</p>
                    <Badge variant="destructive" className="mt-2">
                      {currentDiscount}% off every sale
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Loyalty Program Cost */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-900 mb-2">Smart Loyalty</h3>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      Contact for Quote
                    </div>
                    <p className="text-sm text-green-700">Estimated monthly cost</p>
                    <Badge variant="default" className="mt-2 bg-green-600">
                      Pay only on redemptions
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Potential Savings */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-900 mb-2">Potential Savings</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      Up to {formatCurrency(savings)}
                    </div>
                    <p className="text-sm text-blue-700">Monthly savings</p>
                    <Badge variant="default" className="mt-2 bg-blue-600">
                      {Math.round(savingsPercentage)}% reduction
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Benefits */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-4 text-center">Why Loyalty Beats Discounts</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Pay Only on Redemptions</p>
                    <p className="text-sm text-muted-foreground">Unlike discounts, you only pay when customers actually use their rewards</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Build Long-term Relationships</p>
                    <p className="text-sm text-muted-foreground">Points encourage repeat visits and higher customer lifetime value</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Protect Your Margins</p>
                    <p className="text-sm text-muted-foreground">No immediate margin impact like traditional percentage discounts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Predictable Costs</p>
                    <p className="text-sm text-muted-foreground">Costs scale with actual customer engagement, not total sales</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                *This calculator provides estimates only. Contact us for an accurate pricing proposal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Get Accurate Proposal
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/onboarding" className="flex items-center gap-2">
                    Start Setup <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simple Pricing Features */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Simple Pricing Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>No setup fees or monthly minimums</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Pay only when customers redeem rewards</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Transparent, predictable costs</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                What's Included
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Complete loyalty program setup</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Built into your payment terminal</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Real-time reporting dashboard</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}