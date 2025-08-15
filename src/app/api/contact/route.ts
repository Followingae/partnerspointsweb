import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { sendEmail, generateContactFormEmail } from '@/lib/email'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false }
  }
);

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  formType: z.enum(['contact', 'onboarding', 'calculator']).default('contact'),
  formData: z.record(z.any()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const data = ContactSchema.parse(body)
    
    // Save to database using Supabase client
    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        message: data.message,
        form_type: data.formType,
        form_data: data.formData || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw new Error('Failed to save contact submission')
    }

    // Send email notification
    try {
      const { html, text } = generateContactFormEmail(data)
      const emailResult = await sendEmail({
        to: process.env.ADMIN_EMAIL || 'admin@partnerspoints.com',
        subject: `New ${data.formType === 'onboarding' ? 'Onboarding' : 'Contact'} Form Submission - ${data.name}`,
        html,
        text,
      })

      if (!emailResult.success) {
        console.error('Failed to send notification email:', emailResult.error)
      }
    } catch (emailError) {
      console.error('Email system error:', emailError)
    }


    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We\'ll get back to you within 24 hours.',
      submissionId: submission.id,
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