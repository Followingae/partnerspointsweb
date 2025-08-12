import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { AlertCircle, Shield } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-frosted-silver py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-shadow-black mb-4">
            <span className="text-primary">
              Terms of Service
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 2024
          </p>
        </div>

        {/* Summary */}
        <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 mb-8">
          <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-electric-blue mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-shadow-black mb-3">Terms Summary</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• You only pay fees when customers redeem rewards (no charges on unredeemed points)</li>
                <li>• Service fees are calculated as: (Monthly Sales × Redemption Rate) × Service Fee Rate</li>
                <li>• You can modify your reward rules anytime through the dashboard</li>
                <li>• We protect your customer data and never sell it to third parties</li>
                <li>• Either party may terminate with 30 days notice</li>
              </ul>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Full Terms */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-shadow-black mb-4">1. Service Description</h2>
            <p className="mb-6">
              Partners Points provides loyalty program services to businesses ("Merchants") in the United Arab Emirates. 
              Our platform enables merchants to offer point-based rewards to their customers, with fees charged only 
              when customers redeem their earned points.
            </p>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">2. Fee Structure</h2>
            <div className="mb-6">
              <p className="mb-4">Our fee model is simple and transparent:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Service Fee:</strong> Calculated as (Monthly Sales × Redemption Rate) × Service Fee Rate</li>
                <li><strong>No charges</strong> on unredeemed points or their corresponding sales</li>
                <li><strong>No setup fees</strong> or monthly minimums</li>
                <li><strong>Billing:</strong> Monthly in arrears based on actual redemptions</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">3. Merchant Responsibilities</h2>
            <div className="mb-6">
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate business information during onboarding</li>
                <li>Honor point redemptions as per the agreed reward structure</li>
                <li>Maintain valid trade licenses and compliance with UAE regulations</li>
                <li>Pay service fees according to the agreed schedule</li>
                <li>Notify us of any changes to business operations or contact information</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">4. Platform Responsibilities</h2>
            <div className="mb-6">
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Maintain secure and reliable loyalty program infrastructure</li>
                <li>Provide accurate tracking of points earned and redeemed</li>
                <li>Protect customer data in accordance with UAE data protection laws</li>
                <li>Provide merchant dashboard and reporting tools</li>
                <li>Offer customer support during business hours</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">5. Data Protection & Privacy</h2>
            <div className="mb-6">
              <p className="mb-4">We take data protection seriously:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Customer data is never sold to third parties</li>
                <li>All data is encrypted and stored securely</li>
                <li>Merchants retain ownership of their customer relationships</li>
                <li>We comply with UAE data protection regulations</li>
                <li>Customers can request deletion of their data at any time</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">6. Service Modifications</h2>
            <p className="mb-6">
              We may update our services, features, or fee structure with 30 days advance notice. 
              Merchants will be notified via email and through the dashboard. Continued use of 
              services after notification constitutes acceptance of changes.
            </p>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">7. Termination</h2>
            <div className="mb-6">
              <p className="mb-4">Either party may terminate this agreement:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>With Notice:</strong> 30 days written notice for any reason</li>
                <li><strong>Immediate:</strong> For breach of terms, non-payment, or illegal activity</li>
                <li><strong>Upon Termination:</strong> Outstanding balances become immediately due</li>
                <li><strong>Data Retention:</strong> Customer data deleted within 90 days unless legally required</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">8. Limitation of Liability</h2>
            <p className="mb-6">
              Partners Points liability is limited to the fees paid by the merchant in the 12 months 
              preceding the claim. We are not liable for indirect, incidental, or consequential damages, 
              including lost profits or business interruption.
            </p>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">9. Governing Law</h2>
            <p className="mb-6">
              These terms are governed by UAE law. Any disputes will be resolved through arbitration 
              in Dubai under the rules of the Dubai International Arbitration Centre (DIAC).
            </p>

            <h2 className="text-2xl font-bold text-shadow-black mb-4">10. Contact Information</h2>
            <div className="mb-6">
              <p className="mb-2">For questions about these terms:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Email: legal@partnerspoints.com</li>
                <li>Phone: +971 4 123 4567</li>
                <li>Address: Level 12, Emirates Financial Towers, DIFC, Dubai, UAE</li>
              </ul>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <div className="mt-8">
          <Card className="shadow-lg border-tangerine-glow/20 bg-tangerine-glow/5">
            <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-tangerine-glow mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-shadow-black mb-1">Important Notice</p>
                <p className="text-muted-foreground">
                  These terms constitute a legally binding agreement. If you do not agree with any part of these terms, 
                  please do not use our services. By using Partners Points, you acknowledge that you have read, 
                  understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}