import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Email test endpoint called')
    
    const { to, subject, message } = await request.json()
    
    const testSubject = subject || '🧪 Test Email from Partners Points'
    const testMessage = message || 'This is a test email to verify the email delivery system is working correctly.'
    const testRecipient = to || process.env.ADMIN_EMAIL || 'zain.ali@rfmloyaltyco.ae'
    
    console.log('🧪 Test email parameters:')
    console.log('- To:', testRecipient)
    console.log('- Subject:', testSubject)
    console.log('- Message:', testMessage)
    
    console.log('🔧 Environment Variables Check:')
    console.log('- SMTP_HOST:', process.env.SMTP_HOST)
    console.log('- SMTP_PORT:', process.env.SMTP_PORT)
    console.log('- SMTP_USER:', process.env.SMTP_USER)
    console.log('- SMTP_PASS:', process.env.SMTP_PASS ? `[${process.env.SMTP_PASS.length} chars]` : 'NOT SET')
    console.log('- EMAIL_FROM:', process.env.EMAIL_FROM)
    console.log('- ADMIN_EMAIL:', process.env.ADMIN_EMAIL)
    
    const result = await sendEmail({
      to: testRecipient,
      subject: testSubject,
      text: testMessage,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>🧪 Email Test from Partners Points</h2>
        <p>${testMessage}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
        <p><strong>From:</strong> ${process.env.SMTP_USER}</p>
        <p><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</p>
        <p><strong>SMTP Port:</strong> ${process.env.SMTP_PORT}</p>
      </div>`
    })
    
    console.log('🧪 Test email result:', result)
    
    return NextResponse.json({
      success: result.success,
      message: result.success ? 'Test email sent successfully!' : 'Test email failed to send',
      details: result,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('🧪 Test email endpoint error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function GET() {
  console.log('🔍 Environment Variables Debug:')
  console.log('- SMTP_HOST:', process.env.SMTP_HOST)
  console.log('- SMTP_PORT:', process.env.SMTP_PORT)
  console.log('- SMTP_USER:', process.env.SMTP_USER)
  console.log('- SMTP_PASS:', process.env.SMTP_PASS ? `[SET - ${process.env.SMTP_PASS.length} chars]` : 'NOT SET')
  console.log('- EMAIL_FROM:', process.env.EMAIL_FROM)
  console.log('- ADMIN_EMAIL:', process.env.ADMIN_EMAIL)
  
  return NextResponse.json({
    message: 'Email Test Endpoint - Environment Check',
    usage: 'POST with { "to": "email@example.com", "subject": "Test", "message": "Hello" }',
    environment: {
      smtpHost: process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT,
      smtpUser: process.env.SMTP_USER,
      smtpPass: process.env.SMTP_PASS ? `[SET - ${process.env.SMTP_PASS.length} chars]` : 'NOT SET',
      emailFrom: process.env.EMAIL_FROM,
      adminEmail: process.env.ADMIN_EMAIL
    },
    connectivityTest: {
      smtpHost: process.env.SMTP_HOST,
      port465: 'Should be tested manually with: powershell "Test-NetConnection -ComputerName ' + process.env.SMTP_HOST + ' -Port 465"',
      port587: 'Should be tested manually with: powershell "Test-NetConnection -ComputerName ' + process.env.SMTP_HOST + ' -Port 587"'
    }
  })
}