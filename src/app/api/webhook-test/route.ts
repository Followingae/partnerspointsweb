import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Simple webhook that logs form submissions
    console.log('='.repeat(50))
    console.log('🔔 NEW FORM SUBMISSION RECEIVED!')
    console.log('='.repeat(50))
    console.log('Name:', body.name)
    console.log('Email:', body.email)
    console.log('Company:', body.company || 'Not provided')
    console.log('Phone:', body.phone || 'Not provided')
    console.log('Message:', body.message)
    console.log('Form Type:', body.formType)
    console.log('Timestamp:', new Date().toLocaleString())
    console.log('='.repeat(50))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Notification received and logged to console' 
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Form Notification Webhook',
    status: 'Active'
  })
}