import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/schema'
import { sendEmail, generateContactFormEmail } from '@/lib/email'

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  formType: z.enum(['contact', 'onboarding', 'calculator']).default('contact'),
  metadata: z.record(z.any()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const data = ContactSchema.parse(body)
    
    // Save to database
    const submission = await db.insert(contactSubmissions).values({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      message: data.message,
      formType: data.formType,
      metadata: data.metadata,
    }).returning()

    // Send email notification
    const { html, text } = generateContactFormEmail(data)
    const emailResult = await sendEmail({
      to: process.env.CONTACT_EMAIL || 'hello@partnerspoints.com',
      subject: `New ${data.formType === 'onboarding' ? 'Onboarding' : 'Contact'} Form Submission - ${data.name}`,
      html,
      text,
    })

    if (!emailResult.success) {
      console.error('Failed to send notification email:', emailResult.error)
      // Continue anyway - form submission is saved
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We\'ll get back to you within 24 hours.',
      submissionId: submission[0].id,
    })
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Partners Points Contact API',
    endpoints: {
      'POST /api/contact': 'Submit contact form'
    }
  })
}