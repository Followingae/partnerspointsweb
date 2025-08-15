import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

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
  metadata: z.record(z.string(), z.any()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = ContactSchema.parse(body)
    
    // Save to database using Supabase client
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || null,
        phone: validatedData.phone || null,
        message: validatedData.message,
        form_type: validatedData.formType,
        status: 'new',
        metadata: validatedData.metadata || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw new Error('Failed to save contact submission')
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      submissionId: data.id
    })
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
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
    message: 'Partners Points Contact API (Supabase Version)',
    endpoints: {
      'POST /api/contact-supabase': 'Submit contact form'
    },
    requiredFields: ['name', 'email', 'message'],
    optionalFields: ['company', 'phone', 'formType', 'metadata']
  })
}