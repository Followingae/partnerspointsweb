import nodemailer from 'nodemailer'

// Create reusable transporter object using SMTP transport
// Create multiple transporter configurations for robust email delivery
const createTransporter = (config: any) => nodemailer.createTransport(config)

// Primary configuration - Use environment port (465 SSL)
const primaryConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for SSL on port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    servername: process.env.SMTP_HOST
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000,    // 5 seconds
  socketTimeout: 15000,     // 15 seconds
  debug: true,
  logger: true
}

// Fallback configuration - Try STARTTLS on port 587
const fallbackConfig = {
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    servername: process.env.SMTP_HOST
  },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 15000,
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
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 15000,
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
  const configs = [primaryConfig, fallbackConfig, alternateConfig]
  const configNames = ['Primary SSL (Port 465)', 'Fallback SSL', 'Domain Mail SSL']
  
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://partnerspoints.ae'
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Business Onboarding Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; padding: 40px 0;">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden;">
                    
                    <!-- Header with Logos -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0b04d9 0%, #1a0fff 100%); padding: 40px 30px; text-align: center;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 20px;">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td align="center" style="padding-right: 15px;">
                                                    <img src="${baseUrl}/partnerspointslogo.png" alt="Partners Points" style="height: 50px; width: auto;">
                                                </td>
                                                <td align="center" style="padding-left: 15px;">
                                                    <img src="${baseUrl}/rfmloyalty.png" alt="RFM Loyalty" style="height: 50px; width: auto;">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                            🎉 New Business Onboarding Request
                                        </h1>
                                        <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                                            A new merchant is ready to join the loyalty revolution
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Contact Information Section -->
                    <tr>
                        <td style="padding: 35px 40px 0px 40px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="border-left: 4px solid #0b04d9; padding: 25px; background-color: #f8fafc; border-radius: 12px; margin-bottom: 25px;">
                                        <h2 style="margin: 0 0 20px 0; color: #0b04d9; font-size: 22px; font-weight: 600;">
                                            👤 Contact Information
                                        </h2>
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 15px; line-height: 1.6;">
                                            <tr>
                                                <td style="padding: 8px 0; color: #374151;">
                                                    <strong style="color: #1f2937; display: inline-block; width: 140px;">Name:</strong>
                                                    <span style="color: #111827;">${data.name}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #374151;">
                                                    <strong style="color: #1f2937; display: inline-block; width: 140px;">Business:</strong>
                                                    <span style="color: #111827;">${data.company || 'N/A'}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #374151;">
                                                    <strong style="color: #1f2937; display: inline-block; width: 140px;">Email:</strong>
                                                    <a href="mailto:${data.email}" style="color: #0b04d9; text-decoration: none;">${data.email}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #374151;">
                                                    <strong style="color: #1f2937; display: inline-block; width: 140px;">Phone:</strong>
                                                    <a href="tel:${data.phone}" style="color: #0b04d9; text-decoration: none;">${data.phone || 'N/A'}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #374151;">
                                                    <strong style="color: #1f2937; display: inline-block; width: 140px;">Designation:</strong>
                                                    <span style="color: #111827;">${metadata.designation || 'N/A'}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Business Details Section -->
                    <tr>
                        <td style="padding: 20px 40px 0px 40px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="border-left: 4px solid #22c55e; padding: 25px; background-color: #f0fdf4; border-radius: 12px;">
                                        <h2 style="margin: 0 0 20px 0; color: #16a34a; font-size: 22px; font-weight: 600;">
                                            🏢 Business Details
                                        </h2>
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 15px; line-height: 1.6;">
                                            <tr>
                                                <td style="padding: 8px 0; color: #374151;">
                                                    <strong style="color: #1f2937; display: inline-block; width: 160px;">Industry:</strong>
                                                    <span style="color: #111827;">${metadata.industry || 'N/A'}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #374151;">
                                                    <strong style="color: #1f2937; display: inline-block; width: 160px;">Locations:</strong>
                                                    <span style="color: #111827;">${metadata.locationCount || 1} location(s)</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #374151;">
                                                    <strong style="color: #1f2937; display: inline-block; width: 160px;">Emirates:</strong>
                                                    <span style="color: #111827;">${metadata.selectedEmirates?.join(', ') || 'N/A'}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #374151;">
                                                    <strong style="color: #1f2937; display: inline-block; width: 160px;">Monthly Customers:</strong>
                                                    <span style="color: #111827;">~${metadata.monthlyCustomers?.[0]?.toLocaleString() || 'N/A'}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- RFM Terminal Section -->
                    <tr>
                        <td style="padding: 20px 40px 0px 40px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="border-left: 4px solid #f59e0b; padding: 25px; background-color: #fffbeb; border-radius: 12px;">
                                        <h2 style="margin: 0 0 20px 0; color: #d97706; font-size: 22px; font-weight: 600;">
                                            💳 RFM Terminal Information
                                        </h2>
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 15px; line-height: 1.6;">
                                            <tr>
                                                <td style="padding: 8px 0; color: #374151;">
                                                    <strong style="color: #1f2937; display: inline-block; width: 160px;">Has RFM Terminal:</strong>
                                                    <span style="color: #111827; background-color: ${metadata.hasRfmTerminal ? '#dcfce7' : '#fef2f2'}; padding: 4px 8px; border-radius: 6px; font-size: 14px; font-weight: 500;">
                                                        ${metadata.hasRfmTerminal ? 'Yes ✅' : 'No ❌'}
                                                    </span>
                                                </td>
                                            </tr>
                                            ${metadata.hasRfmTerminal && metadata.terminalDetails ? 
                                                `<tr>
                                                    <td style="padding: 8px 0; color: #374151;">
                                                        <strong style="color: #1f2937; display: inline-block; width: 160px;">Merchant ID:</strong>
                                                        <code style="background-color: #f3f4f6; padding: 6px 10px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 14px; color: #1f2937; border: 1px solid #e5e7eb;">${metadata.terminalDetails}</code>
                                                    </td>
                                                </tr>` : 
                                                `<tr>
                                                    <td style="padding: 8px 0; color: #374151;">
                                                        <strong style="color: #1f2937; display: inline-block; width: 160px;">Status:</strong>
                                                        <span style="color: #dc2626; background-color: #fef2f2; padding: 4px 8px; border-radius: 6px; font-size: 14px;">Terminal Setup Required</span>
                                                    </td>
                                                </tr>`
                                            }
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Message Section -->
                    <tr>
                        <td style="padding: 20px 40px 35px 40px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td style="border-left: 4px solid #6366f1; padding: 25px; background-color: #f0f9ff; border-radius: 12px;">
                                        <h2 style="margin: 0 0 15px 0; color: #4338ca; font-size: 22px; font-weight: 600;">
                                            💬 Message
                                        </h2>
                                        <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; font-style: italic; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e7ff;">
                                            "${data.message}"
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Action Button Section -->
                    <tr>
                        <td style="padding: 35px 40px 30px 40px; text-align: center;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="background: linear-gradient(135deg, #0b04d9 0%, #1a0fff 100%); border-radius: 12px; padding: 18px 35px;">
                                                    <a href="${baseUrl}/admin/submissions" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">
                                                        🎯 View in Admin Panel
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 14px;">
                                            Click above to review and respond to this onboarding request
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer Section -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td align="center" style="padding-right: 10px;">
                                                    <img src="${baseUrl}/partnerspointslogo.png" alt="Partners Points" style="height: 30px; width: auto; opacity: 0.7;">
                                                </td>
                                                <td align="center" style="padding-left: 10px;">
                                                    <img src="${baseUrl}/rfmloyalty.png" alt="RFM Loyalty" style="height: 30px; width: auto; opacity: 0.7;">
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="margin: 15px 0 5px 0; color: #6b7280; font-size: 14px; font-weight: 600;">
                                            Partners Points × RFM Loyalty
                                        </p>
                                        <p style="margin: 0; color: #9ca3af; font-size: 13px;">
                                            Building Customer Loyalty, One Transaction at a Time
                                        </p>
                                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                                            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                                This email was generated automatically from the Partners Points website.<br>
                                                Please respond to the customer at: <a href="mailto:${data.email}" style="color: #0b04d9;">${data.email}</a>
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
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