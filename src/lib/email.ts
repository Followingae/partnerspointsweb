import nodemailer from 'nodemailer'

// Create reusable transporter object using SMTP transport
// Create multiple transporter configurations for robust email delivery
const createTransporter = (config: any) => nodemailer.createTransport(config)

// Primary configuration - STARTTLS with authentication
const primaryConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // false for STARTTLS; true for SSL
  requireTLS: true, // Force TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  },
  debug: true,
  logger: true
}

// Fallback configuration - Direct hosting provider server SSL
const fallbackConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    servername: process.env.SMTP_HOST
  },
  debug: true,
  logger: true
}

// Third fallback - mail.domain.com SSL
const alternateConfig = {
  host: 'mail.partnerspoints.ae',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    servername: 'mail.partnerspoints.ae'
  },
  debug: true,
  logger: true
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  const recipients = to.split(',').map(email => email.trim())
  const configs = [fallbackConfig, primaryConfig, alternateConfig]
  const configNames = ['Hosting Provider SSL', 'STARTTLS Fallback', 'Domain Mail SSL']
  
  console.log('📧 Email delivery attempt started...')
  console.log('Recipients:', recipients)
  console.log('Subject:', subject)
  console.log('Environment check:')
  console.log('- SMTP_HOST:', process.env.SMTP_HOST)
  console.log('- SMTP_PORT:', process.env.SMTP_PORT)
  console.log('- SMTP_USER:', process.env.SMTP_USER)
  console.log('- EMAIL_FROM:', process.env.EMAIL_FROM)
  
  for (let i = 0; i < configs.length; i++) {
    const config = configs[i]
    const configName = configNames[i]
    
    try {
      console.log(`🔄 Attempting email delivery with ${configName}...`)
      console.log('Config:', { ...config, auth: { ...config.auth, pass: '[HIDDEN]' } })
      
      const transporter = createTransporter(config)
      
      // Test the connection first
      try {
        await transporter.verify()
        console.log(`✅ SMTP connection verified for ${configName}`)
      } catch (verifyError) {
        console.warn(`⚠️ SMTP verification failed for ${configName}:`, verifyError instanceof Error ? verifyError.message : verifyError)
        // Continue anyway as verify() can be unreliable
      }
      
      // Use proper sender configuration
      const mailOptions = {
        from: `"Partners Points" <${process.env.SMTP_USER}>`,
        replyTo: process.env.SMTP_USER,
        to: recipients,
        subject,
        text,
        html,
        envelope: {
          from: process.env.SMTP_USER,
          to: recipients
        },
        headers: {
          'X-Mailer': 'Partners Points Contact Form',
          'Return-Path': process.env.SMTP_USER,
          'Sender': process.env.SMTP_USER
        }
      }
      
      console.log('📮 Sending email with options:', { 
        ...mailOptions, 
        html: '[HTML CONTENT]',
        text: text?.substring(0, 100) + '...' 
      })
      
      const info = await transporter.sendMail(mailOptions)

      console.log(`✅ Email sent successfully with ${configName}!`)
      console.log('Message ID:', info.messageId)
      console.log('Recipients:', recipients.join(', '))
      console.log('Response:', info.response)
      console.log('Accepted:', info.accepted)
      console.log('Rejected:', info.rejected)
      console.log('Pending:', info.pending)
      
      // Close the transporter
      transporter.close()
      
      return { 
        success: true, 
        messageId: info.messageId, 
        recipients,
        method: configName,
        response: info.response,
        accepted: info.accepted,
        rejected: info.rejected
      }
      
    } catch (error) {
      console.error(`❌ ${configName} failed:`)
      console.error('Error type:', typeof error)
      console.error('Error name:', error instanceof Error ? error.name : 'Unknown')
      console.error('Error message:', error instanceof Error ? error.message : error)
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
      
      // If this is the last config, return error
      if (i === configs.length - 1) {
        console.error('🚨 All email configurations failed!')
        return { 
          success: false, 
          error: `All email methods failed. Last error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          lastError: error 
        }
      }
      
      // Otherwise, continue to next config
      console.log(`⚠️ ${configName} failed, trying next configuration...`)
    }
  }
  
  return { success: false, error: 'No email configurations available' }
}

// Template for onboarding form notifications 
export function generateOnboardingEmail(data: {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  metadata?: any
}) {
  const metadata = data.metadata || {}
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #0b04d9; color: white; padding: 20px; text-align: center; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px;">🎉 New Business Onboarding Request!</h1>
      </div>
      
      <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #0b04d9; margin-bottom: 20px;">
        <h2 style="color: #0b04d9; margin-top: 0;">Contact Information</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Business:</strong> ${data.company || 'N/A'}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone || 'N/A'}</a></p>
        <p><strong>Designation:</strong> ${metadata.designation || 'N/A'}</p>
      </div>

      <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #22c55e; margin-bottom: 20px;">
        <h2 style="color: #22c55e; margin-top: 0;">Business Details</h2>
        <p><strong>Industry:</strong> ${metadata.industry || 'N/A'}</p>
        <p><strong>Locations:</strong> ${metadata.locationCount || 1} location(s)</p>
        <p><strong>Emirates:</strong> ${metadata.selectedEmirates?.join(', ') || 'N/A'}</p>
        <p><strong>Monthly Customers:</strong> ~${metadata.monthlyCustomers?.[0]?.toLocaleString() || 'N/A'}</p>
      </div>

      <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
        <h2 style="color: #f59e0b; margin-top: 0;">RFM Terminal Info</h2>
        <p><strong>Has RFM Terminal:</strong> ${metadata.hasRfmTerminal ? 'Yes' : 'No'}</p>
        ${metadata.hasRfmTerminal && metadata.terminalDetails ? 
          `<p><strong>Merchant ID:</strong> <code style="background: #e5e5e5; padding: 2px 6px; border-radius: 4px;">${metadata.terminalDetails}</code></p>` : 
          '<p><strong>Terminal Setup:</strong> Required</p>'
        }
      </div>

      <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #6366f1; margin-bottom: 20px;">
        <h2 style="color: #6366f1; margin-top: 0;">Generated Message</h2>
        <p style="font-style: italic;">"${data.message}"</p>
      </div>

      <div style="text-align: center; padding: 20px;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/submissions" 
           style="background: #0b04d9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View in Admin Panel
        </a>
      </div>

      <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
        <p>Partners Points Loyalty Platform</p>
      </div>
    </div>
  `

  const text = `
🎉 New Business Onboarding Request!

Contact Information:
Name: ${data.name}
Business: ${data.company || 'N/A'}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Designation: ${metadata.designation || 'N/A'}

Business Details:
Industry: ${metadata.industry || 'N/A'}
Locations: ${metadata.locationCount || 1} location(s)
Emirates: ${metadata.selectedEmirates?.join(', ') || 'N/A'}
Monthly Customers: ~${metadata.monthlyCustomers?.[0]?.toLocaleString() || 'N/A'}

RFM Terminal Info:
Has RFM Terminal: ${metadata.hasRfmTerminal ? 'Yes' : 'No'}
${metadata.hasRfmTerminal && metadata.terminalDetails ? `Merchant ID: ${metadata.terminalDetails}` : 'Terminal Setup: Required'}

Message:
"${data.message}"

Please respond to the customer at: ${data.email}
  `

  return { html, text }
}

// Template for contact form notifications
export function generateContactFormEmail(data: {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  formType: string
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0a2540; border-bottom: 2px solid #0a2540; padding-bottom: 10px;">
        New ${data.formType === 'onboarding' ? 'Onboarding' : 'Contact'} Form Submission
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #0a2540;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Form Type:</strong> ${data.formType}</p>
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #0a2540;">Message</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #666;">
        <p style="font-size: 12px;">
          This email was sent from the Partners Points website contact form.<br>
          Please respond to the customer at: ${data.email}
        </p>
      </div>
    </div>
  `

  const text = `
New ${data.formType === 'onboarding' ? 'Onboarding' : 'Contact'} Form Submission

Contact Information:
Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}
${data.phone ? `Phone: ${data.phone}` : ''}
Form Type: ${data.formType}

Message:
${data.message}

Please respond to the customer at: ${data.email}
  `

  return { html, text }
}

// Customer confirmation email for onboarding
export function generateCustomerConfirmationEmail(data: {
  name: string
  company?: string
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #0b04d9; color: white; padding: 20px; text-align: center; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px;">Thank You for Your Interest!</h1>
      </div>
      
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Dear ${data.name},</p>
        
        <p>Thank you for submitting your onboarding request for <strong>${data.company}</strong>. We're excited to help you build a world-class loyalty program!</p>
        
        <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0b04d9;">
          <h3 style="color: #0b04d9; margin-top: 0;">What happens next?</h3>
          <ol style="margin: 0; padding-left: 20px;">
            <li>Our team will review your application</li>
            <li>We'll contact you within 1-2 business days to discuss your loyalty program setup</li>
            <li>If needed, we'll provide and configure RFM terminals for your location(s)</li>
            <li>Your loyalty program will be live and ready to delight customers!</li>
          </ol>
        </div>

        <p>If you have any urgent questions, feel free to reply to this email or call us.</p>
        
        <p style="margin-top: 30px;">
          Best regards,<br>
          <strong>The Partners Points Team</strong><br>
          <a href="mailto:${process.env.ADMIN_EMAIL || 'admin@partnerspoints.com'}">${process.env.ADMIN_EMAIL || 'admin@partnerspoints.com'}</a>
        </p>
      </div>

      <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p>Partners Points - Building Customer Loyalty, One Transaction at a Time</p>
      </div>
    </div>
  `

  const text = `
Thank You for Your Interest!

Dear ${data.name},

Thank you for submitting your onboarding request for ${data.company}. We're excited to help you build a world-class loyalty program!

What happens next?
1. Our team will review your application
2. We'll contact you within 1-2 business days to discuss your loyalty program setup
3. If needed, we'll provide and configure RFM terminals for your location(s)
4. Your loyalty program will be live and ready to delight customers!

If you have any urgent questions, feel free to reply to this email or call us.

Best regards,
The Partners Points Team
${process.env.ADMIN_EMAIL || 'admin@partnerspoints.com'}

Partners Points - Building Customer Loyalty, One Transaction at a Time
  `

  return { html, text }
}

// Template for calculator results email
export function generateCalculatorResultsEmail(data: {
  name: string
  email: string
  company?: string
  calculatorResults: any
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0a2540; border-bottom: 2px solid #0a2540; padding-bottom: 10px;">
        ROI Calculator Results Request
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #0a2540;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #0a2540;">Calculator Results</h3>
        <p><strong>Monthly Sales:</strong> AED ${data.calculatorResults.inputs.monthlySales.toLocaleString()}</p>
        <p><strong>Potential Monthly Savings:</strong> AED ${data.calculatorResults.calculations.costSavings.toLocaleString()}</p>
        <p><strong>ROI:</strong> ${data.calculatorResults.calculations.roiPercentage}%</p>
        <p><strong>Payback Period:</strong> ${data.calculatorResults.breakeven.description}</p>
      </div>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #666;">
        <p style="font-size: 12px;">
          Customer has requested detailed ROI analysis. Please follow up within 24 hours.
        </p>
      </div>
    </div>
  `

  return { html, text: `ROI Calculator Results Request from ${data.name} (${data.email})` }
}