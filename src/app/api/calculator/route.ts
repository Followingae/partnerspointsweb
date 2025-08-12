import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const CalculatorSchema = z.object({
  monthlySales: z.number().min(1, 'Monthly sales must be greater than 0'),
  earnBackRate: z.number().min(1).max(50).default(10), // percentage
  redemptionRate: z.number().min(0).max(100).default(40), // percentage of earned points that get redeemed
  averageTransactionValue: z.number().min(1).default(100),
  discountPercentage: z.number().min(1).max(50).default(10), // for comparison
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const data = CalculatorSchema.parse(body)
    
    // Calculate metrics
    const monthlyTransactions = Math.round(data.monthlySales / data.averageTransactionValue)
    
    // Points program calculations
    const pointsEarnedPerAED = data.earnBackRate / 100 // 10% = 0.1 points per AED
    const totalPointsEarnedMonthly = Math.round(data.monthlySales * pointsEarnedPerAED)
    const totalPointsRedeemedMonthly = Math.round(totalPointsEarnedMonthly * (data.redemptionRate / 100))
    const redemptionValueMonthly = totalPointsRedeemedMonthly // 1 point = 1 AED redemption value
    
    // Points program costs (2% fee on redemptions only)
    const pointsServiceFee = redemptionValueMonthly * 0.02
    const totalPointsCost = redemptionValueMonthly + pointsServiceFee
    
    // Traditional discount calculations
    const discountCostMonthly = data.monthlySales * (data.discountPercentage / 100)
    
    // Cost comparison
    const costSavings = discountCostMonthly - totalPointsCost
    const costSavingsPercentage = ((costSavings / discountCostMonthly) * 100)
    
    // Customer engagement metrics
    const estimatedRetentionUplift = Math.min(25, data.earnBackRate * 2) // Max 25% uplift
    const projectedRepeatCustomers = Math.round(monthlyTransactions * 0.3 * (1 + estimatedRetentionUplift / 100))
    
    // ROI calculations
    const additionalRevenue = data.monthlySales * (estimatedRetentionUplift / 100)
    const netBenefit = additionalRevenue + costSavings - totalPointsCost
    const roiPercentage = ((netBenefit / totalPointsCost) * 100)
    
    return NextResponse.json({
      success: true,
      inputs: {
        monthlySales: data.monthlySales,
        earnBackRate: data.earnBackRate,
        redemptionRate: data.redemptionRate,
        averageTransactionValue: data.averageTransactionValue,
        discountPercentage: data.discountPercentage,
      },
      calculations: {
        // Basic metrics
        monthlyTransactions,
        totalPointsEarnedMonthly,
        totalPointsRedeemedMonthly,
        
        // Cost analysis
        pointsProgram: {
          redemptionValue: redemptionValueMonthly,
          serviceFee: Math.round(pointsServiceFee),
          totalCost: Math.round(totalPointsCost),
        },
        traditionalDiscount: {
          monthlyCost: Math.round(discountCostMonthly),
        },
        
        // Savings
        costSavings: Math.round(costSavings),
        costSavingsPercentage: Math.round(costSavingsPercentage),
        
        // Engagement impact
        estimatedRetentionUplift,
        projectedRepeatCustomers,
        additionalRevenue: Math.round(additionalRevenue),
        
        // ROI
        netBenefit: Math.round(netBenefit),
        roiPercentage: Math.round(roiPercentage),
      },
      // Yearly projections
      yearlyProjections: {
        pointsCost: Math.round(totalPointsCost * 12),
        discountCost: Math.round(discountCostMonthly * 12),
        totalSavings: Math.round(costSavings * 12),
        additionalRevenue: Math.round(additionalRevenue * 12),
        netBenefit: Math.round(netBenefit * 12),
      },
      // Breakeven analysis
      breakeven: {
        monthsToPayback: totalPointsCost > 0 ? Math.ceil(totalPointsCost / Math.max(costSavings, 1)) : 0,
        description: totalPointsCost > 0 
          ? `Break-even in ${Math.ceil(totalPointsCost / Math.max(costSavings, 1))} month(s)` 
          : 'Immediate positive ROI'
      },
    })
  } catch (error) {
    console.error('Calculator error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Partners Points ROI Calculator API',
    endpoints: {
      'POST /api/calculator': 'Calculate ROI for loyalty program vs traditional discounts'
    },
    sampleRequest: {
      monthlySales: 100000,
      earnBackRate: 10,
      redemptionRate: 40,
      averageTransactionValue: 150,
      discountPercentage: 10
    }
  })
}