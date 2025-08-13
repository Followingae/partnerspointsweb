"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ElasticSlider } from "@/components/ui/elastic-slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Storefront, ShoppingBag, Heart, ShoppingCart, CheckCircle, Plus, Minus, Crown } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { ResultsReveal } from "@/components/animate-ui/results-reveal"
import { AnimatedNumber } from "@/components/ui/animated-number"

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
      <div className="max-w-screen-2xl mx-auto px-4 pt-24 pb-4 h-[calc(100vh-7rem)]">
            
            {/* Single unified card */}
            <Card className="h-[calc(100vh-7rem)] bg-transparent border-none shadow-none">
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
    </div>
  )
}