import { NextRequest, NextResponse } from 'next/server'
import { generateOnboardingEmail } from '@/lib/email'

export async function GET() {
  // Sample data for testing the email design
  const sampleData = {
    name: "Ahmed Al-Mansouri",
    email: "ahmed@samplebusiness.ae",
    company: "Dubai Premium Restaurant",
    phone: "+971-50-123-4567",
    message: "We're looking to implement a comprehensive loyalty program for our restaurant chain. We currently serve about 500 customers daily across our 3 locations in Dubai Marina, JBR, and Downtown. We're particularly interested in the points-based rewards system and customer retention analytics.",
    metadata: {
      designation: "General Manager",
      industry: "Restaurant",
      locationCount: 3,
      selectedEmirates: ["Dubai", "Sharjah"],
      monthlyCustomers: [15000],
      hasRfmTerminal: true,
      terminalDetails: "RFM-AE-2024-001234"
    }
  }

  const { html } = generateOnboardingEmail(sampleData)

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { html } = generateOnboardingEmail(data)
    
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON data' }, 
      { status: 400 }
    )
  }
}