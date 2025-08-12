import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { merchants } from '@/lib/schema'
import { z } from 'zod'

const OnboardingSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  industry: z.enum(['restaurant', 'retail', 'healthcare', 'beauty', 'services', 'automotive', 'other']),
  monthlySales: z.string().min(1, 'Monthly sales range is required'),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  earnBackRate: z.string().transform(val => parseInt(val, 10)),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = OnboardingSchema.parse(body)
    
    // Check if email already exists
    const existingMerchant = await db.query.merchants.findFirst({
      where: (merchants, { eq }) => eq(merchants.email, validatedData.email)
    })
    
    if (existingMerchant) {
      return NextResponse.json(
        { error: 'A merchant with this email already exists' },
        { status: 409 }
      )
    }
    
    // Create new merchant record
    const newMerchant = await db.insert(merchants).values({
      businessName: validatedData.businessName,
      industry: validatedData.industry,
      monthlySales: validatedData.monthlySales,
      contactName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      earnBackRate: validatedData.earnBackRate,
      status: 'pending', // Will be activated after RFM terminal configuration
    }).returning()
    
    // In a real implementation, you would:
    // 1. Send notification to RFM Loyalty team
    // 2. Create terminal configuration request
    // 3. Send welcome email to merchant
    // 4. Set up merchant portal access
    
    return NextResponse.json({
      success: true,
      merchant: {
        id: newMerchant[0].id,
        businessName: newMerchant[0].businessName,
        email: newMerchant[0].email,
        status: newMerchant[0].status,
      },
      message: 'Your RFM Payment Terminal is now being configured for loyalty. You\'ll be live within 1–2 business days.',
    })
  } catch (error) {
    console.error('Onboarding error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
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
    message: 'Partners Points Onboarding API',
    endpoints: {
      'POST /api/onboarding': 'Submit merchant onboarding application'
    }
  })
}