import { NextResponse } from 'next/server'

export async function GET() {
  console.log('🔍 Debug Environment Variables:')
  console.log('- NODE_ENV:', process.env.NODE_ENV)
  console.log('- SMTP_HOST:', process.env.SMTP_HOST)
  console.log('- SMTP_PORT:', process.env.SMTP_PORT)
  console.log('- SMTP_USER:', process.env.SMTP_USER)
  console.log('- SMTP_PASS:', process.env.SMTP_PASS ? `[SET - ${process.env.SMTP_PASS.length} chars]` : 'NOT SET')
  console.log('- EMAIL_FROM:', process.env.EMAIL_FROM)
  console.log('- ADMIN_EMAIL:', process.env.ADMIN_EMAIL)
  
  return NextResponse.json({
    message: 'Environment Debug Endpoint',
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      smtpHost: process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT,
      smtpUser: process.env.SMTP_USER,
      smtpPass: process.env.SMTP_PASS ? `[SET - ${process.env.SMTP_PASS.length} chars]` : 'NOT SET',
      emailFrom: process.env.EMAIL_FROM,
      adminEmail: process.env.ADMIN_EMAIL
    },
    envFileCheck: {
      recommendation: 'Check if .env file is in project root and properly formatted',
      expectedLocation: '.env file should be at project root level',
      commonIssues: [
        'Missing .env file',
        'Variables not starting with correct prefix',
        'Quotes around values causing issues',
        'Special characters in password not properly escaped'
      ]
    }
  })
}