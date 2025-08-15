import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/email'

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

    // Send email notifications
    try {
      // Send notification to admin
      const adminSubject = `🚀 New Business Onboarding: ${submission.company} (${validatedData.industry})`
      
      let adminEmailBody = `New onboarding request received:

Name: ${submission.name}
Email: ${submission.email}
Company: ${submission.company}
Phone: ${submission.phone || 'Not provided'}
Industry: ${validatedData.industry}
Designation: ${validatedData.designation}
Locations: ${validatedData.locationCount} across ${validatedData.selectedEmirates.join(', ')}
RFM Terminal: ${validatedData.hasRfmTerminal ? 'Yes' : 'No'}
${validatedData.terminalDetails ? `Terminal ID: ${validatedData.terminalDetails}` : ''}

Message: ${submission.message}

Submission ID: ${submission.id}
Submitted: ${new Date().toLocaleString()}`

      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'admin@partnerspoints.com',
        subject: adminSubject,
        text: adminEmailBody,
        html: adminEmailBody.replace(/\n/g, '<br>')
      })

      // Send confirmation to customer  
      const customerSubject = 'Thank you for your onboarding request - Partners Points'
      const customerBody = `Dear ${submission.name},

Thank you for your onboarding request! We've received your application for ${submission.company} and will review it shortly.

Our team will be in touch within 1-2 business days to discuss your loyalty program setup.

Next Steps:
• Our team will review your application
• We'll contact you to discuss your loyalty program setup
• If needed, we'll provide and configure RFM terminals  
• Your loyalty program will be live within 1-2 business days

Best regards,
Partners Points Team`

      await sendEmail({
        to: submission.email,
        subject: customerSubject,
        text: customerBody,
        html: customerBody.replace(/\n/g, '<br>')
      })

      console.log(`Email notifications sent for submission ${submission.id}`)
    } catch (emailError) {
      console.error('Failed to send email notifications:', emailError)
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ve received your onboarding request and will be in touch within 1-2 business days to set up your loyalty program.',
      submissionId: submission.id,
      nextSteps: [
        'Our team will review your application',
        'We\'ll contact you to discuss your loyalty program setup',
        'If needed, we\'ll provide and configure RFM terminals',
        'Your loyalty program will be live within 1-2 business days'
      ]
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