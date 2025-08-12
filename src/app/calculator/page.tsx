"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, RefreshCw, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ChartConfig } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, RadialBarChart, RadialBar, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/charts/ClientChart"

export default function CalculatorPage() {
  const [monthlySales, setMonthlySales] = useState(100000)
  const [redemptionRate, setRedemptionRate] = useState(35)

  // Calculations
  const pointsEarned = monthlySales * 0.1 // 10% back in points
  const redeemedSales = (monthlySales * redemptionRate) / 100
  const serviceFee = redeemedSales * 0.02 // 2% service fee
  const totalCost = serviceFee
  const costPercentage = (totalCost / monthlySales) * 100

  // Chart data
  const chartData = [
    { name: "Total Sales", value: monthlySales, fill: "hsl(var(--primary))" },
    { name: "Redeemed Sales", value: redeemedSales, fill: "hsl(var(--secondary))" },
    { name: "Service Fee", value: serviceFee, fill: "hsl(var(--destructive))" },
  ]

  // Pie chart data for redemption breakdown
  const redemptionPieData = [
    { name: "Redeemed", value: redemptionRate, fill: "hsl(var(--primary))" },
    { name: "Unredeemed", value: 100 - redemptionRate, fill: "hsl(var(--muted))" }
  ]

  // Radial data for cost efficiency
  const efficiencyData = [
    { name: "Efficiency", value: Math.round(((100 - costPercentage) / 100) * 100), fill: "hsl(var(--primary))" }
  ]

  const chartConfig: ChartConfig = {
    value: {
      label: "Amount (AED)",
    },
  }

  const resetToDefaults = () => {
    setMonthlySales(100000)
    setRedemptionRate(35)
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Know your loyalty ROI before you start.</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate based on real transaction volume from your RFM Payment Terminal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Your Business Details</CardTitle>
              <CardDescription>
                Because the program runs inside your RFM Payment Terminal, there are no separate software costs to include in your calculation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly Sales */}
              <div className="space-y-3">
                <Label htmlFor="monthly-sales">Monthly Sales Volume</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">AED</span>
                  <Input
                    id="monthly-sales"
                    type="number"
                    value={monthlySales}
                    onChange={(e) => setMonthlySales(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Slider
                    value={[monthlySales]}
                    onValueChange={(value) => setMonthlySales(value[0])}
                    max={500000}
                    min={10000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>AED 10K</span>
                    <span>AED 500K</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Redemption Rate */}
              <div className="space-y-3">
                <Label htmlFor="redemption-rate">Expected Redemption Rate</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="redemption-rate"
                    type="number"
                    value={redemptionRate}
                    onChange={(e) => setRedemptionRate(Number(e.target.value))}
                    className="text-lg"
                    max={100}
                    min={0}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={[redemptionRate]}
                    onValueChange={(value) => setRedemptionRate(value[0])}
                    max={80}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10%</span>
                    <span>80%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Most businesses see 30-50% redemption rates
                </p>
              </div>

              <Button onClick={resetToDefaults} variant="outline" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Monthly Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-5xl font-bold text-primary">
                    AED {serviceFee.toLocaleString()}
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {costPercentage.toFixed(2)}% of total sales
                  </Badge>
                  <p className="text-muted-foreground">
                    Only charged on redeemed sales
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Monthly Sales</p>
                    <p className="text-2xl font-semibold">AED {monthlySales.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Points Earned by Customers</p>
                    <p className="text-2xl font-semibold">AED {pointsEarned.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sales with Redemptions</p>
                    <p className="text-2xl font-semibold">AED {redeemedSales.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Your Service Fee (2%)</p>
                    <p className="text-2xl font-semibold text-primary">AED {serviceFee.toLocaleString()}</p>
                  </div>
                </div>

                {/* Redemption Rate Pie Chart */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">Redemption Rate</h4>
                  <div className="flex items-center gap-6">
                    <div className="h-24 w-24">
                      <ChartContainer config={chartConfig} className="h-full w-full">
                        <ResponsiveContainer>
                          <PieChart>
                            <Pie
                              data={redemptionPieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={15}
                              outerRadius={40}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {redemptionPieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm">{redemptionRate}% Redeemed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-muted rounded-full"></div>
                        <span className="text-sm">{100 - redemptionRate}% Unredeemed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Efficiency */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="h-24 w-24">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                      <ResponsiveContainer>
                        <RadialBarChart data={efficiencyData} innerRadius="60%" outerRadius="90%">
                          <RadialBar dataKey="value" cornerRadius={4} fill="var(--color-value)" />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(100 - costPercentage)}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      More efficient than 10% flat discounts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Visual Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Why it matters section */}
            <Card>
              <CardHeader>
                <CardTitle>Why it matters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Points tie costs to real loyalty. You only pay when customers are engaged enough to redeem their rewards. Because Partners Points runs inside your RFM Payment Terminal, there are no integration costs, software licenses, or additional devices to factor into your calculation.
                </p>
                <div className="text-xs text-muted-foreground border-t pt-4">
                  This program runs exclusively on RFM Loyalty's proven platform, processing AED 1.5B+ monthly across 15,000+ terminals.
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="font-semibold">Ready to get started?</p>
                  <Button size="lg" className="w-full" asChild>
                    <Link href="/onboarding">
                      Start Onboarding
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}