import { BrandCard } from "@/components/ui/brand-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Shield, Lock, Eye, AlertCircle } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-frosted-silver py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-shadow-black mb-4">
            <GradientText variant="blue">
              Privacy Policy
            </GradientText>
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 2024
          </p>
        </div>

        {/* Summary */}
        <BrandCard variant="gradient" size="lg" className="mb-8">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-electric-blue mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-shadow-black mb-3">Privacy Summary</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• We collect business information for KYC compliance and customer transaction data for loyalty program operations</li>
                <li>• Customer data is never sold to third parties or used for advertising</li>
                <li>• All data is encrypted in transit and at rest using bank-grade security</li>
                <li>• You can request data deletion or export at any time</li>
                <li>• We comply with UAE data protection laws and international standards</li>
              </ul>
            </div>
          </div>
        </BrandCard>

        {/* Full Policy */}
        <BrandCard variant="elevated" size="lg">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-shadow-black mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-electric-blue" />
              Information We Collect
            </h2>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Business Information</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-4">
                <li>Legal business name, trade license number, and TRN</li>
                <li>Business owner identification documents</li>
                <li>Contact information (name, email, phone)</li>
                <li>Business locations and operating details</li>
                <li>Banking information for payment processing</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-4">
                <li>Phone number or email for account identification</li>
                <li>Transaction amounts and dates</li>
                <li>Points earned and redeemed</li>
                <li>Purchase preferences and patterns</li>
                <li>Device information and app usage</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>IP addresses and device identifiers</li>
                <li>Browser type and operating system</li>
                <li>Usage patterns and performance metrics</li>
                <li>Security logs and fraud prevention data</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-shadow-black mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-electric-blue" />
              How We Use Information
            </h2>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Business Operations</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-4">
                <li>Verify business identity and comply with regulations</li>
                <li>Process payments and maintain financial records</li>
                <li>Provide customer support and account management</li>
                <li>Send important service updates and notifications</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3">Loyalty Program Services</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-4">
                <li>Track points earned and redeemed by customers</li>
                <li>Generate analytics and business insights</li>
                <li>Prevent fraud and unauthorized access</li>
                <li>Improve platform functionality and user experience</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3">Legal Compliance</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Meet UAE regulatory requirements</li>
                <li>Respond to lawful requests from authorities</li>
                <li>Maintain records as required by law</li>
                <li>Protect against legal liability</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">Information Sharing</h2>
            <div className="mb-8">
              <p className="mb-4 font-semibold text-shadow-black">We never sell personal information to third parties.</p>
              
              <h3 className="text-lg font-semibold mb-3">Limited Sharing Occurs Only For:</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Service Providers:</strong> Trusted partners who help operate our platform (payment processors, hosting providers) under strict confidentiality agreements</li>
                <li><strong>Legal Requirements:</strong> When required by UAE law or court order</li>
                <li><strong>Business Transfers:</strong> In case of merger or acquisition (with advance notice)</li>
                <li><strong>Merchant Analytics:</strong> Aggregated, anonymized insights about customer behavior patterns</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">Data Security</h2>
            <div className="mb-8">
              <p className="mb-4">We implement comprehensive security measures:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Encryption:</strong> All data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
                <li><strong>Regular Audits:</strong> Quarterly security assessments and penetration testing</li>
                <li><strong>Data Minimization:</strong> We collect only necessary information</li>
                <li><strong>Secure Infrastructure:</strong> Enterprise-grade hosting with 24/7 monitoring</li>
                <li><strong>Staff Training:</strong> Regular privacy and security training for all employees</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">Your Rights</h2>
            <div className="mb-8">
              <p className="mb-4">You have the following rights regarding your data:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update incorrect or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Restriction:</strong> Limit how we process your information</li>
                <li><strong>Objection:</strong> Object to certain types of data processing</li>
              </ul>
              <p className="mt-4 text-sm">
                To exercise these rights, contact us at privacy@partnerspoints.com or through your account dashboard.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">Data Retention</h2>
            <div className="mb-8">
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Business Records:</strong> 7 years after account closure (UAE regulatory requirement)</li>
                <li><strong>Customer Transaction Data:</strong> 3 years after last activity</li>
                <li><strong>Marketing Data:</strong> Until consent is withdrawn</li>
                <li><strong>Technical Logs:</strong> 90 days for security purposes</li>
                <li><strong>Support Communications:</strong> 2 years for service improvement</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">International Transfers</h2>
            <p className="mb-8">
              Your data is primarily stored in UAE data centers. If we need to transfer data internationally 
              for service provision, we ensure adequate protection through standard contractual clauses 
              and adequacy decisions recognized by UAE authorities.
            </p>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">Children's Privacy</h2>
            <p className="mb-8">
              Our services are not intended for individuals under 18 years of age. We do not knowingly 
              collect personal information from children. If we become aware that we have collected 
              information from a child, we will delete it immediately.
            </p>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">Policy Updates</h2>
            <p className="mb-8">
              We may update this privacy policy to reflect changes in our practices or for legal reasons. 
              We will notify you of significant changes via email and through our platform. 
              The "Last Updated" date at the top indicates when the policy was last modified.
            </p>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">Contact Information</h2>
            <div className="mb-6">
              <p className="mb-2">For privacy-related questions or requests:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li><strong>Email:</strong> privacy@partnerspoints.com</li>
                <li><strong>Phone:</strong> +971 4 123 4567</li>
                <li><strong>Mail:</strong> Privacy Officer, Partners Points, Level 12, Emirates Financial Towers, DIFC, Dubai, UAE</li>
                <li><strong>Response Time:</strong> We will respond to your request within 30 days</li>
              </ul>
            </div>
          </div>
        </BrandCard>

        {/* Important Notice */}
        <div className="mt-8">
          <BrandCard variant="elevated" className="border-electric-blue/20 bg-electric-blue/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-electric-blue mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-shadow-black mb-1">Your Consent</p>
                <p className="text-muted-foreground">
                  By using Partners Points, you consent to the collection, use, and processing of your information 
                  as described in this privacy policy. If you do not agree with our privacy practices, 
                  please do not use our services.
                </p>
              </div>
            </div>
          </BrandCard>
        </div>
      </div>
    </div>
  )
}