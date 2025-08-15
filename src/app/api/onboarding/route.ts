import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { sendEmail, generateOnboardingEmail, generateCustomerConfirmationEmail } from '@/lib/email'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false }
  }
)

const OnboardingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  industry: z.string().min(1, 'Industry is required'),
  locationCount: z.number().min(1).max(50),
  selectedEmirates: z.array(z.string()).min(1, 'Please select at least one emirate'),
  monthlyCustomers: z.array(z.number()),
  hasRfmTerminal: z.boolean(),
  terminalDetails: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(9, 'Valid phone number is required'),
  designation: z.string().min(2, 'Designation is required'),
  acceptedTerms: z.boolean().refine(val => val === true, 'Must accept terms and conditions'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = OnboardingSchema.parse(body)
    
    // Check if email already exists in submissions
    const { data: existingSubmission } = await supabase
      .from('contact_submissions')
      .select('id')
      .eq('email', validatedData.email)
      .eq('form_type', 'onboarding')
      .single()
    
    if (existingSubmission) {
      return NextResponse.json(
        { error: 'We already have an onboarding request from this email address' },
        { status: 409 }
      )
    }

    // Validate terminal details if RFM terminal is used
    if (validatedData.hasRfmTerminal && (!validatedData.terminalDetails || validatedData.terminalDetails.length !== 9)) {
      return NextResponse.json(
        { error: 'Valid 9-digit Merchant ID is required when using RFM terminals' },
        { status: 400 }
      )
    }
    
    // Insert into database
    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.businessName,
        phone: validatedData.phone,
        message: `New business onboarding request from ${validatedData.designation} at ${validatedData.businessName} in the ${validatedData.industry} industry. Located across ${validatedData.selectedEmirates.join(', ')} with ${validatedData.locationCount} location(s).`,
        form_type: 'onboarding',
        form_data: {
          businessName: validatedData.businessName,
          industry: validatedData.industry,
          designation: validatedData.designation,
          locationCount: validatedData.locationCount,
          selectedEmirates: validatedData.selectedEmirates,
          monthlyCustomers: validatedData.monthlyCustomers,
          hasRfmTerminal: validatedData.hasRfmTerminal,
          terminalDetails: validatedData.terminalDetails || null,
          acceptedTerms: validatedData.acceptedTerms,
          submissionType: 'onboarding',
          submittedAt: new Date().toISOString()
        }
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw new Error('Failed to save onboarding submission')
    }

    // Prepare response immediately - don't wait for emails
    const responseData = {
      success: true,
      message: 'Thank you! We\'ve received your onboarding request and will be in touch within 1-2 business days to set up your loyalty program.',
      submissionId: submission.id,
      nextSteps: [
        'Our team will review your application',
        'We\'ll contact you to discuss your loyalty program setup',
        'If needed, we\'ll provide and configure RFM terminals',
        'Your loyalty program will be live within 1-2 business days'
      ]
    }

    // Send email notifications synchronously to avoid Vercel timeout issues
    try {
      console.log(`📧 Starting email notifications for submission ${submission.id}`)
      
      // Prepare email data in the exact format as the working email system
      const emailData = {
        name: submission.name,
        email: submission.email,
        company: submission.company,
        phone: submission.phone,
        message: submission.message,
        metadata: {
          designation: validatedData.designation,
          industry: validatedData.industry,
          locationCount: validatedData.locationCount,
          selectedEmirates: validatedData.selectedEmirates,
          monthlyCustomers: validatedData.monthlyCustomers,
          hasRfmTerminal: validatedData.hasRfmTerminal,
          terminalDetails: validatedData.terminalDetails
        }
      }
      
      // Generate the beautiful branded email template (same as test emails)
      const { html: adminHtml, text: adminText } = generateOnboardingEmail(emailData)
      
      // Send admin notification using the exact same system as test emails
      const adminSubject = `🚀 New Business Onboarding: ${submission.company} (${validatedData.industry})`
      
      console.log(`📧 Sending admin notification to: ${process.env.ADMIN_EMAIL}`)
      const adminResult = await sendEmail({
        to: process.env.ADMIN_EMAIL || 'admin@partnerspoints.com',
        subject: adminSubject,
        html: adminHtml,
        text: adminText
      })
      
      console.log('📧 Admin email result:', adminResult)

      // Generate customer confirmation email with beautiful template
      const { html: customerHtml, text: customerText } = generateCustomerConfirmationEmail({
        name: submission.name,
        company: submission.company
      })

      console.log(`📧 Sending customer confirmation to: ${submission.email}`)
      const customerResult = await sendEmail({
        to: submission.email,
        subject: 'Thank you for your interest! - Partners Points',
        html: customerHtml,
        text: customerText
      })
      
      console.log('📧 Customer email result:', customerResult)

      if (adminResult.success && customerResult.success) {
        console.log(`✅ All email notifications sent successfully for submission ${submission.id}`)
      } else {
        console.warn(`⚠️ Some email notifications failed for submission ${submission.id}:`)
        console.warn('Admin email:', adminResult.success ? 'Success' : adminResult.error)
        console.warn('Customer email:', customerResult.success ? 'Success' : customerResult.error)
      }
    } catch (emailError) {
      console.error('❌ Failed to send email notifications:', emailError)
      console.error('Email error details:', {
        name: emailError instanceof Error ? emailError.name : 'Unknown',
        message: emailError instanceof Error ? emailError.message : emailError,
        stack: emailError instanceof Error ? emailError.stack : 'No stack trace'
      })
      // Don't fail the entire request if email fails - but log the error
    }

    // Return response after attempting email send
    return NextResponse.json(responseData)

  } catch (error) {
    console.error('Onboarding error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to submit onboarding request. Please try again.' },
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