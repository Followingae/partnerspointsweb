import nodemailer from 'nodemailer'

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Partners Points" <noreply@partnerspoints.com>',
      to,
      subject,
      text,
      html,
    })

    console.log('Message sent: %s', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
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