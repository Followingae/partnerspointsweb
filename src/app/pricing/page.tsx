"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ElasticSlider } from "@/components/ui/elastic-slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Storefront, ShoppingBag, Heart, ShoppingCart, CheckCircle, Plus, Minus, Crown, Gear, ArrowRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { ResultsReveal } from "@/components/animate-ui/results-reveal"
import { AnimatedNumber } from "@/components/ui/animated-number"
import Link from "next/link"

export default function PricingPage() {
  const [monthlySalesRevenue, setMonthlySalesRevenue] = useState([50000])
  const [avgTransactionValue, setAvgTransactionValue] = useState([150])
  const [businessType, setBusinessType] = useState("restaurant")
  const [pointsRate, setPointsRate] = useState(15) // Start with restaurant's recommended rate
  const [timeframe, setTimeframe] = useState("Monthly")
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  
  // Business configurations with industry standards
  const businessTypes = {
    restaurant: { 
      label: "Restaurant", 
      returnRate: 25, 
      avgRepeats: 8, 
      recommendedPointsRate: 15, 
      expirationRate: 15, 
      icon: Storefront,
      transactionValue: { min: 150, max: 1000, step: 100, default: 200 }
    },
    retail: { 
      label: "Retail", 
      returnRate: 15, 
      avgRepeats: 4, 
      recommendedPointsRate: 10, 
      expirationRate: 15, 
      icon: ShoppingBag,
      transactionValue: { min: 250, max: 5000, step: 250, default: 750 }
    },
    clinic: { 
      label: "Clinic", 
      returnRate: 45, 
      avgRepeats: 4, 
      recommendedPointsRate: 5, 
      expirationRate: 20, 
      icon: Heart,
      transactionValue: { min: 500, max: 15000, step: 500, default: 2000 }
    },
    supermarket: { 
      label: "Supermarket", 
      returnRate: 40, 
      avgRepeats: 12, 
      recommendedPointsRate: 5, 
      expirationRate: 20, 
      icon: ShoppingCart,
      transactionValue: { min: 50, max: 1000, step: 50, default: 100 }
    }
  }
  
  const salesRevenue = monthlySalesRevenue[0]
  const transactionValue = avgTransactionValue[0]
  const currentBusiness = businessTypes[businessType as keyof typeof businessTypes]
  
  // Check if we should show empty state (only on initial load when at default values)
  const shouldShowEmptyState = !hasUserInteracted && salesRevenue === 50000 && transactionValue === currentBusiness.transactionValue.min && pointsRate === currentBusiness.recommendedPointsRate
  
  // Customer behavior calculations
  const monthlyTransactions = Math.round(salesRevenue / transactionValue)
  const returningCustomers = Math.round(monthlyTransactions * (currentBusiness.returnRate / 100))
  const additionalVisitsPerMonth = Math.round((returningCustomers * currentBusiness.avgRepeats) / 12)
  const grossAdditionalRevenue = Math.round(additionalVisitsPerMonth * transactionValue)
  
  // Points and fee calculation - based ONLY on additional sales
  const pointsEarnedOnAdditionalSales = Math.round(grossAdditionalRevenue * (pointsRate / 100))
  const pointsRedeemedFromAdditionalSales = Math.round(pointsEarnedOnAdditionalSales * ((100 - currentBusiness.expirationRate) / 100))
  
  // Merchant costs from additional sales
  const merchantPointsCost = pointsRedeemedFromAdditionalSales // Cash value merchant pays out
  const originalSpendForRedeemedPoints = pointsRedeemedFromAdditionalSales / (pointsRate / 100) // Convert points back to original spend
  const ourFeeRate = 2 // 2% fee on original spend when redeemed
  const ourMonthlyRevenue = originalSpendForRedeemedPoints * (ourFeeRate / 100)
  
  // Merchant net gain: Additional revenue minus points cost and our fees
  const merchantNetGain = Math.round((grossAdditionalRevenue - merchantPointsCost - ourMonthlyRevenue) / 50) * 50
  const annualMerchantGain = Math.round(merchantNetGain * 12)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 pt-24 h-screen">
            
            {/* Single unified card */}
            <Card className="h-[calc(100vh-6rem)] bg-transparent border-none shadow-none">
          <CardContent className="p-6 h-full">
            <div className="flex gap-8 h-full">
              
              {/* Left Side - Input Controls */}
              <div className="w-[50%] bg-transparent rounded-lg p-8 flex">
                <div className="w-full flex flex-col">

                  {/* Page Header */}
                  <div className="text-left mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                      Points ROI Calculator
                    </h1>
                  </div>

                  {/* Business Category */}
                  <div className="mb-10">
                    <div className="text-lg font-semibold text-gray-800 mb-6">Business Category</div>
                    <div className="flex flex-wrap gap-3 justify-start">
                      {Object.entries(businessTypes).map(([key, type]) => {
                        const IconComponent = type.icon
                        const isSelected = businessType === key
                        
                        return (
                          <div key={key} className="relative">
                            <button
                              className={`
                                group relative h-16 rounded-lg border overflow-hidden 
                                transition-all duration-500 ease-out delay-75 
                                hover:delay-150
                                ${isSelected 
                                  ? "w-auto text-white border-gray-800 shadow-lg" 
                                  : "w-16 bg-white border-gray-200 text-gray-700 hover:w-auto hover:border-gray-800 hover:bg-gray-800/5"
                                }
                              `}
                              style={{
                                backgroundColor: isSelected ? '#1f2937' : undefined
                              }}
                              onClick={() => {
                                setBusinessType(key)
                                setPointsRate(businessTypes[key as keyof typeof businessTypes].recommendedPointsRate)
                                setAvgTransactionValue([businessTypes[key as keyof typeof businessTypes].transactionValue.default])
                                setHasUserInteracted(true)
                              }}
                            >
                              {/* Icon - always centered in collapsed, left-aligned when expanded */}
                              <div className={`
                                absolute left-0 top-0 w-16 h-16 flex items-center justify-center
                                transition-all duration-500 ease-out
                              `}>
                                <IconComponent 
                                  size={28} 
                                  weight={isSelected ? "fill" : "regular"} 
                                />
                              </div>
                              
                              {/* Text - only visible when expanded */}
                              <div className={`
                                flex items-center h-full pl-16 pr-4
                                transition-all duration-500 ease-out delay-75 group-hover:delay-150
                                ${isSelected 
                                  ? "opacity-100" 
                                  : "opacity-0 group-hover:opacity-100"
                                }
                              `}>
                                <span className="text-sm font-medium whitespace-nowrap">
                                  {type.label}
                                </span>
                              </div>
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Sales Controls - 2 columns */}
                <div className="mb-10">
                  <div className="grid grid-cols-2 gap-10">
                    {/* Monthly Sales Revenue */}
                    <div>
                      <div className="text-base font-semibold text-gray-800 mb-3">Monthly Sales</div>
                      <div className="flex justify-end items-center mb-2">
                        <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                          {new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', minimumFractionDigits: 0 }).format(salesRevenue)}
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <ElasticSlider
                          value={monthlySalesRevenue}
                          onValueChange={(value) => {
                            setMonthlySalesRevenue(value)
                            setHasUserInteracted(true)
                          }}
                          max={1000000}
                          min={50000}
                          step={50000}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>50K</span>
                        <span>1M+</span>
                      </div>
                    </div>

                    {/* Average Transaction Value */}
                    <div>
                      <div className="text-base font-semibold text-gray-800 mb-3">Per Transaction Value</div>
                      <div className="flex justify-end items-center mb-2">
                        <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                          {new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', minimumFractionDigits: 0 }).format(transactionValue)}
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <ElasticSlider
                          value={avgTransactionValue}
                          onValueChange={(value) => {
                            setAvgTransactionValue(value)
                            setHasUserInteracted(true)
                          }}
                          max={currentBusiness.transactionValue.max}
                          min={currentBusiness.transactionValue.min}
                          step={currentBusiness.transactionValue.step}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{currentBusiness.transactionValue.min}</span>
                        <span>{currentBusiness.transactionValue.max}+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Points Rate */}
                <div className="mb-4">
                  <div className="text-lg font-semibold text-gray-800 mb-4">Award Rule</div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-700">Points percentage given to customer</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 justify-start">
                    {[5, 10, 15, 20, 25, 30].map((rate) => {
                      const isSelected = pointsRate === rate
                      
                      return (
                        <div key={rate} className="relative">
                          <button
                            className={`
                              group relative h-16 rounded-lg border overflow-hidden 
                              transition-all duration-500 ease-out delay-75 
                              hover:delay-150
                              ${isSelected 
                                ? "w-auto text-white border-gray-800 shadow-lg" 
                                : "w-16 bg-white border-gray-200 text-gray-700 hover:w-auto hover:border-gray-800 hover:bg-gray-800/5"
                              }
                            `}
                            style={{
                              backgroundColor: isSelected ? '#1f2937' : undefined
                            }}
                            onClick={() => {
                              setPointsRate(rate)
                              setHasUserInteracted(true)
                            }}
                          >
                            {/* Combined text - centered when collapsed, left-aligned when expanded */}
                            <div className={`
                              flex items-center h-full transition-all duration-500 ease-out
                              ${isSelected 
                                ? "justify-center px-4" 
                                : "justify-center group-hover:justify-center group-hover:px-4"
                              }
                            `}>
                              <div className="relative flex items-center">
                                <span className="text-sm font-medium whitespace-nowrap">
                                  {isSelected ? `${rate} % Awarded` : (
                                    <>
                                      <span className="group-hover:hidden">{rate}%</span>
                                      <span className="hidden group-hover:inline">{rate} % Awarded</span>
                                    </>
                                  )}
                                </span>
                                {isSelected && rate === currentBusiness.recommendedPointsRate && (
                                  <Badge variant="secondary" className="ml-2 px-1 py-0 h-4 bg-green-100 text-green-800 border-green-200 flex items-center">
                                    <Crown size={10} weight="fill" />
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  
                </div>



                </div>
              </div>
              
              {/* Right Side - Results or Empty State */}
              <div className="w-[50%] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg relative overflow-hidden">
                {shouldShowEmptyState ? (
                  /* Beautiful Empty State */
                  <div className="h-full relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-20 left-20 w-32 h-32 border border-gray-300 rounded-full"></div>
                      <div className="absolute top-40 right-24 w-20 h-20 border border-gray-300 rounded-full"></div>
                      <div className="absolute bottom-32 left-32 w-24 h-24 border border-gray-300 rounded-full"></div>
                      <div className="absolute bottom-20 right-20 w-16 h-16 border border-gray-300 rounded-full"></div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="h-full flex flex-col items-center justify-center p-12 text-center relative z-10">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-8"
                      >
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-6 mx-auto shadow-lg">
                            <Heart size={36} className="text-blue-600" weight="fill" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Plus size={16} className="text-white" weight="bold" />
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4 mb-8"
                      >
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">
                          See Your Revenue Potential
                        </h3>
                        <p className="text-gray-600 max-w-md leading-relaxed text-lg">
                          Adjust your business details to discover how loyalty points drive repeat customers and additional revenue.
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center gap-4 text-sm text-gray-500"
                      >
                        <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-full shadow-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span>Interactive</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-full shadow-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>Real-time</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-full shadow-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          <span>Industry data</span>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-12"
                      >
                        <div className="inline-flex items-center gap-2 text-blue-600 font-medium">
                          <span>Start by adjusting values</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            ←
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  /* Results Display */
                  <>
                    {/* Customer Journey */}
                    <ResultsReveal trigger="immediate" delay={0.2} stagger={0.1}>
                    <div className="px-24 pt-12 pb-6">
                      <h3 className="text-sm font-semibold text-gray-800 mb-8 text-center">
                        Customer Journey with Loyalty Points
                      </h3>
                      
                      <div className="grid grid-cols-5 gap-4 items-center mb-8">
                        {/* First Visit */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 mb-4">
                            <ShoppingBag size={28} className="text-gray-800" />
                          </div>
                          <div className="text-sm font-medium text-gray-800 h-10 flex items-center justify-center">
                            <AnimatedNumber 
                              value={monthlyTransactions} 
                              formatFunction={(val) => val.toLocaleString()}
                              className="tabular-nums"
                            />&nbsp;Customers
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex justify-center">
                          <div className="w-12 h-0.5 bg-gray-300 relative">
                            <div className="absolute right-0 top-[-3px] w-0 h-0 border-l-[6px] border-l-gray-300 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent"></div>
                          </div>
                        </div>

                        {/* Return Visits */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 mb-4">
                            <Heart size={28} className="text-gray-800" weight="fill" />
                          </div>
                          <div className="text-sm font-medium text-gray-800 h-10 flex items-center justify-center">
                            <AnimatedNumber 
                              value={returningCustomers} 
                              formatFunction={(val) => val.toLocaleString()}
                              className="tabular-nums"
                            />&nbsp;Return
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex justify-center">
                          <div className="w-12 h-0.5 bg-gray-300 relative">
                            <div className="absolute right-0 top-[-3px] w-0 h-0 border-l-[6px] border-l-gray-300 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent"></div>
                          </div>
                        </div>

                        {/* Revenue Growth */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 mb-4">
                            <CheckCircle size={28} className="text-gray-800" weight="fill" />
                          </div>
                          <div className="text-sm font-medium text-gray-800 h-10 flex items-center justify-center">More Revenue</div>
                        </div>
                      </div>

                      {/* Business Assumptions */}
                      <div className="border-t border-gray-200 pt-6 pb-6">
                        <div className="text-center space-y-3">
                          <div className="text-xs text-gray-600 font-medium">Industry Assumptions</div>
                          <div className="flex flex-wrap gap-2 justify-center">
                            <Badge variant="outline" className="text-xs">
                              {currentBusiness.returnRate}% return
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {currentBusiness.avgRepeats} visits/year
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {currentBusiness.expirationRate}% expire
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    </ResultsReveal>

                    {/* Main revenue display with CTA - Absolute positioned to cover bottom */}
                    <div className="absolute bottom-0 left-0 right-0 top-96 rounded-b-lg overflow-hidden">
                      <div className="p-8 h-full flex flex-col justify-center" style={{ backgroundColor: '#0b04d9' }}>
                        
                        <ResultsReveal trigger="immediate" delay={0.8}>
                        {/* Revenue breakdown */}
                        <div className="flex items-center justify-center gap-8 mb-10">
                          {/* Additional Revenue */}
                          <div className="text-center">
                            <div className="text-sm font-medium mb-4 text-white/80">
                              Additional monthly revenue
                            </div>
                            <div className="text-3xl font-bold text-white">
                              <AnimatedNumber 
                                value={merchantNetGain} 
                                formatFunction={(val) => new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', minimumFractionDigits: 0 }).format(val)}
                                duration={1.2}
                                ease="power2.out"
                              />
                            </div>
                          </div>
                          
                          {/* Separator */}
                          <Separator orientation="vertical" className="h-16 bg-white/20" />
                          
                          {/* Our Fees */}
                          <div className="text-center">
                            <div className="text-sm font-medium mb-4 text-white/80">
                              Our fees
                            </div>
                            {Math.round(ourMonthlyRevenue / 50) * 50 >= 2000 ? (
                              <div className="text-xl font-bold text-white">
                                Special Pricing
                              </div>
                            ) : (
                              <div className="text-3xl font-bold text-white">
                                {new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', minimumFractionDigits: 0 }).format(Math.max(500, Math.round(ourMonthlyRevenue / 50) * 50))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-center">
                          <p className="text-sm mb-8 max-w-lg mx-auto leading-relaxed text-white/80">
                            The calculation is indicative - specific projections require consultation.
                          </p>

                          <Button 
                            className="px-12 py-5 text-xl font-semibold transition-all duration-200 hover:opacity-90 shadow-lg border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
                          >
                            Get a Quote
                          </Button>
                        </div>
                        </ResultsReveal>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
            </div>
          </CardContent>
        </Card>

      </div>

      {/* What's Included Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What&apos;s Included in Partners Points
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to launch and manage your loyalty program, built directly into your RFM Payment Terminal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* RFM Terminal Integration */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gear size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">RFM Terminal Integration</h3>
              <p className="text-gray-600 mb-4">Built directly into your payment terminal - no extra hardware or apps needed</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-700">✓ No additional devices</div>
                <div className="text-sm font-medium text-gray-700">✓ Instant setup</div>
                <div className="text-sm font-medium text-gray-700">✓ Zero integration time</div>
              </div>
            </motion.div>

            {/* Merchant Web Portal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Merchant Web Portal</h3>
              <p className="text-gray-600 mb-4">Complete control and analytics dashboard for managing your program</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-700">✓ Real-time analytics</div>
                <div className="text-sm font-medium text-gray-700">✓ Adjust point percentages</div>
                <div className="text-sm font-medium text-gray-700">✓ Customer management</div>
              </div>
            </motion.div>

            {/* Customer Mobile App */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-purple-600" weight="fill" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Mobile App</h3>
              <p className="text-gray-600 mb-4">Customers track points and find partner locations easily</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-700">✓ Point balance tracking</div>
                <div className="text-sm font-medium text-gray-700">✓ Transaction history</div>
                <div className="text-sm font-medium text-gray-700">✓ Store locator</div>
              </div>
            </motion.div>

            {/* Real-time Notifications */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-yellow-600" weight="fill" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Triggers</h3>
              <p className="text-gray-600 mb-4">Get notified about VIP customers and redemption opportunities</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-700">✓ High spender alerts</div>
                <div className="text-sm font-medium text-gray-700">✓ Repeat customer detection</div>
                <div className="text-sm font-medium text-gray-700">✓ Redemption prompts</div>
              </div>
            </motion.div>

            {/* 24/7 Support */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus size={32} className="text-red-600" weight="bold" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Support & Onboarding</h3>
              <p className="text-gray-600 mb-4">Complete setup assistance and ongoing support</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-700">✓ Free onboarding</div>
                <div className="text-sm font-medium text-gray-700">✓ Staff training</div>
                <div className="text-sm font-medium text-gray-700">✓ 24/7 technical support</div>
              </div>
            </motion.div>

            {/* Network Access */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown size={32} className="text-indigo-600" weight="fill" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Network Access</h3>
              <p className="text-gray-600 mb-4">Tap into RFM&apos;s proven payment network across the UAE</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-700">✓ 15,000+ terminals</div>
                <div className="text-sm font-medium text-gray-700">✓ AED 1.5B+ monthly volume</div>
                <div className="text-sm font-medium text-gray-700">✓ Cross-merchant redemption</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Partners Points pricing and setup
            </p>
          </div>

          <div className="space-y-8">
            {/* FAQ 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                When do I pay the 2% fee?
              </h3>
              <p className="text-gray-600 mb-4">
                You only pay the 2% fee when customers actually redeem their points for rewards. If customers earn points but never redeem them, you pay absolutely nothing. This means you&apos;re only paying for sales that happen because of the loyalty program.
              </p>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  <strong>Example:</strong> Customer earns 100 points, never redeems → You pay AED 0<br/>
                  <strong>Example:</strong> Customer redeems 100 points (worth AED 10) → You pay AED 0.20 (2% of AED 10)
                </p>
              </div>
            </motion.div>

            {/* FAQ 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Are there any setup costs or monthly fees?
              </h3>
              <p className="text-gray-600 mb-4">
                No upfront costs, no setup fees, no monthly subscription fees, and no hardware purchases. Partners Points is built into your existing RFM Payment Terminal, so there&apos;s nothing additional to buy or install.
              </p>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-green-600 font-medium">✓ Setup: AED 0</div>
                  <div className="text-green-600 font-medium">✓ Monthly fees: AED 0</div>
                  <div className="text-green-600 font-medium">✓ Hardware: AED 0</div>
                  <div className="text-green-600 font-medium">✓ Integration: AED 0</div>
                </div>
              </div>
            </motion.div>

            {/* FAQ 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I change my points percentage anytime?
              </h3>
              <p className="text-gray-600 mb-4">
                Yes, you have complete control. You can adjust your points percentage (5%, 10%, 15%, etc.) anytime through your merchant portal. Changes take effect immediately across all your terminals.
              </p>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  <strong>Popular settings:</strong> Restaurants typically use 15%, Retail stores use 10%, Medical clinics use 5%, and Supermarkets use 5%
                </p>
              </div>
            </motion.div>

            {/* FAQ 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What happens to unredeemed points?
              </h3>
              <p className="text-gray-600 mb-4">
                Points expire according to rules you set (typically 12-24 months). When points expire, you pay nothing - they simply disappear from the customer&apos;s account. Industry data shows 15-20% of points typically expire unredeemed.
              </p>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  This means your actual costs are even lower than the 2% fee rate, since some points will never be redeemed.
                </p>
              </div>
            </motion.div>

            {/* FAQ 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How long does setup take?
              </h3>
              <p className="text-gray-600 mb-4">
                Since Partners Points runs on your existing RFM Payment Terminal, setup is typically completed in under 2 hours. Our team handles the configuration remotely, and provides staff training to ensure smooth operation from day one.
              </p>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span>Remote setup:</span>
                  <span className="font-medium text-blue-600">30 minutes</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Staff training:</span>
                  <span className="font-medium text-blue-600">45 minutes</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Testing & go-live:</span>
                  <span className="font-medium text-blue-600">30 minutes</span>
                </div>
              </div>
            </motion.div>

            {/* FAQ 6 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can customers redeem points at other businesses?
              </h3>
              <p className="text-gray-600 mb-4">
                Yes! Customers can earn points at your business and redeem them at any other Partners Points merchant in the network. This increases the value proposition for customers and drives more foot traffic to your location from other merchants&apos; customers.
              </p>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  The network effect means customers see more value in the program, leading to higher participation and loyalty.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ready to Get Started Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Launch your loyalty program today and start rewarding customers while protecting your margins
            </p>

            {/* Two-step process preview */}
            <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Quick Setup</h3>
                <p className="text-blue-100 text-sm">
                  Remote configuration of your RFM terminal and staff training - completed in under 2 hours
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Start Rewarding</h3>
                <p className="text-blue-100 text-sm">
                  Begin awarding points to customers immediately and watch loyalty grow
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-white text-blue-900 hover:bg-gray-100 transition-all duration-200"
                asChild
              >
                <Link href="/onboarding">
                  Start Free Setup
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-4 text-lg font-semibold border-white/30 text-white hover:bg-white/10 transition-all duration-200"
                asChild
              >
                <Link href="/contact">
                  Schedule a Demo
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-300" weight="fill" />
                  <span className="text-sm">No upfront costs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-300" weight="fill" />
                  <span className="text-sm">2-hour setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-300" weight="fill" />
                  <span className="text-sm">24/7 support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-300" weight="fill" />
                  <span className="text-sm">Pay only on redemption</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}