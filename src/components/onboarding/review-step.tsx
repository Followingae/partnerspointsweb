"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { BrandCard } from "@/components/ui/brand-card"
import { OnboardingData } from "@/types"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { Building2, User, MapPin, Gift, FileText, CheckCircle } from "lucide-react"

interface ReviewStepProps {
  data: OnboardingData
  onChange: (data: OnboardingData) => void
  errors: Record<string, string>
}

export function ReviewStep({ data, onChange, errors }: ReviewStepProps) {
  const handleConsentChange = (field: 'termsAccepted' | 'privacyAccepted' | 'marketingOptIn', checked: boolean) => {
    onChange({ ...data, [field]: checked })
  }

  return (
    <div className="space-y-6">
      {/* Application Summary */}
      <BrandCard 
        title="Application Summary"
        description="Review your information before submitting"
        variant="elevated"
        size="lg"
      >
        <div className="space-y-6">
          {/* Business Profile */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-shadow-black mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-electric-blue" />
              Business Profile
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Legal Name:</span>
                <p className="font-medium">{data.businessProfile.legalName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Industry:</span>
                <p className="font-medium">{data.businessProfile.industry}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Trade License:</span>
                <p className="font-medium">{data.businessProfile.tradeLicenseNo}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Average Ticket:</span>
                <p className="font-medium">{formatCurrency(data.businessProfile.averageTicketSize)}</p>
              </div>
              {data.businessProfile.trn && (
                <div>
                  <span className="text-muted-foreground">TRN:</span>
                  <p className="font-medium">{data.businessProfile.trn}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-shadow-black mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-electric-blue" />
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Full Name:</span>
                <p className="font-medium">{data.contact.fullName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Work Email:</span>
                <p className="font-medium">{data.contact.workEmail}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Mobile:</span>
                <p className="font-medium">{data.contact.mobile}</p>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-shadow-black mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-electric-blue" />
              Locations ({data.locations.length})
            </h3>
            <div className="space-y-3">
              {data.locations.map((location, index) => (
                <div key={location.id} className="bg-frosted-silver/50 rounded-lg p-3">
                  <div className="grid md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p className="font-medium">{location.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">City:</span>
                      <p className="font-medium">{location.city}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="font-medium">{location.contactPhone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Award Rule */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-shadow-black mb-3 flex items-center gap-2">
              <Gift className="w-5 h-5 text-electric-blue" />
              Award Rule
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Earn-back Rate:</span>
                <p className="font-medium text-electric-blue">{formatPercentage(data.awardRule.earnBackPercentage)}</p>
              </div>
              {data.awardRule.minimumSpend && (
                <div>
                  <span className="text-muted-foreground">Minimum Spend:</span>
                  <p className="font-medium">{formatCurrency(data.awardRule.minimumSpend)}</p>
                </div>
              )}
              {data.awardRule.exclusions && (
                <div className="md:col-span-3">
                  <span className="text-muted-foreground">Exclusions:</span>
                  <p className="font-medium">{data.awardRule.exclusions}</p>
                </div>
              )}
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-lg font-semibold text-shadow-black mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-electric-blue" />
              Documents
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-lime-burst" />
                <span className="text-sm">Trade License: {data.documents.tradeLicense?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-lime-burst" />
                <span className="text-sm">Owner ID: {data.documents.ownerId?.name}</span>
              </div>
              {data.documents.logo && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-lime-burst" />
                  <span className="text-sm">Logo: {data.documents.logo.name}</span>
                </div>
              )}
            </div>
            {data.documents.brandNotes && (
              <div className="mt-3">
                <span className="text-muted-foreground text-sm">Brand Notes:</span>
                <p className="text-sm bg-frosted-silver/50 rounded p-2 mt-1">{data.documents.brandNotes}</p>
              </div>
            )}
          </div>
        </div>
      </BrandCard>

      {/* Consent Checkboxes */}
      <BrandCard title="Terms & Consent" variant="elevated" size="lg">
        <div className="space-y-4">
          {/* Terms of Service */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={data.termsAccepted}
              onCheckedChange={(checked) => handleConsentChange('termsAccepted', checked as boolean)}
              className={errors.termsAccepted ? "border-destructive" : ""}
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I have read and agree to the{" "}
              <a href="/terms" target="_blank" className="text-electric-blue hover:underline">
                Terms of Service
              </a>
              {" "}and understand the service fee structure. *
            </Label>
          </div>
          {errors.termsAccepted && (
            <p className="text-xs text-destructive ml-6">{errors.termsAccepted}</p>
          )}

          {/* Privacy Policy */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="privacy"
              checked={data.privacyAccepted}
              onCheckedChange={(checked) => handleConsentChange('privacyAccepted', checked as boolean)}
              className={errors.privacyAccepted ? "border-destructive" : ""}
            />
            <Label htmlFor="privacy" className="text-sm leading-relaxed">
              I agree to the{" "}
              <a href="/privacy" target="_blank" className="text-electric-blue hover:underline">
                Privacy Policy
              </a>
              {" "}and consent to processing of business and customer data as described. *
            </Label>
          </div>
          {errors.privacyAccepted && (
            <p className="text-xs text-destructive ml-6">{errors.privacyAccepted}</p>
          )}

          {/* Marketing Opt-in (Optional) */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketing"
              checked={data.marketingOptIn}
              onCheckedChange={(checked) => handleConsentChange('marketingOptIn', checked as boolean)}
            />
            <Label htmlFor="marketing" className="text-sm leading-relaxed text-muted-foreground">
              I would like to receive marketing updates about new features and Partners Points news (optional).
            </Label>
          </div>
        </div>
      </BrandCard>

      {/* Next Steps */}
      <BrandCard variant="gradient" size="lg">
        <div className="text-center">
          <h3 className="text-xl font-bold text-shadow-black mb-3">What happens next?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="w-8 h-8 bg-electric-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
              <p className="font-medium">Application Review</p>
              <p className="text-muted-foreground">We'll review your application within 1-2 business days</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-electric-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
              <p className="font-medium">Account Setup</p>
              <p className="text-muted-foreground">Once approved, we'll set up your loyalty program</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-electric-blue text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
              <p className="font-medium">Go Live</p>
              <p className="text-muted-foreground">Start rewarding customers and growing your business</p>
            </div>
          </div>
        </div>
      </BrandCard>
    </div>
  )
}