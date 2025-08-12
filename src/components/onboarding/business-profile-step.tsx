"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { BusinessProfile } from "@/types"

interface BusinessProfileStepProps {
  data: BusinessProfile
  onChange: (data: BusinessProfile) => void
  errors: Record<string, string>
}

const industries = [
  "Restaurant",
  "Café",
  "Retail Store", 
  "Beauty Salon",
  "Gym/Fitness",
  "Healthcare Clinic",
  "Automotive",
  "Professional Services",
  "Other"
]

export function BusinessProfileStep({ data, onChange, errors }: BusinessProfileStepProps) {
  const handleChange = (field: keyof BusinessProfile, value: string | number) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Business Profile</CardTitle>
        <CardDescription>Tell us about your business to set up your loyalty program</CardDescription>
      </CardHeader>
      <CardContent>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Legal Name */}
        <div className="space-y-2">
          <Label htmlFor="legalName" className="text-sm font-medium">
            Legal Business Name *
          </Label>
          <Input
            id="legalName"
            value={data.legalName}
            onChange={(e) => handleChange('legalName', e.target.value)}
            placeholder="e.g., Al Manara Trading LLC"
            className={errors.legalName ? "border-destructive" : ""}
          />
          {errors.legalName && (
            <p className="text-xs text-destructive">{errors.legalName}</p>
          )}
          <p className="text-xs text-muted-foreground">
            As registered with UAE authorities
          </p>
        </div>

        {/* Trade License Number */}
        <div className="space-y-2">
          <Label htmlFor="tradeLicenseNo" className="text-sm font-medium">
            Trade License Number *
          </Label>
          <Input
            id="tradeLicenseNo"
            value={data.tradeLicenseNo}
            onChange={(e) => handleChange('tradeLicenseNo', e.target.value)}
            placeholder="e.g., CN-1234567"
            className={errors.tradeLicenseNo ? "border-destructive" : ""}
          />
          {errors.tradeLicenseNo && (
            <p className="text-xs text-destructive">{errors.tradeLicenseNo}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Your UAE trade license number
          </p>
        </div>

        {/* TRN (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="trn" className="text-sm font-medium">
            Tax Registration Number (TRN)
          </Label>
          <Input
            id="trn"
            value={data.trn || ""}
            onChange={(e) => handleChange('trn', e.target.value)}
            placeholder="e.g., 100123456700003"
            className={errors.trn ? "border-destructive" : ""}
          />
          {errors.trn && (
            <p className="text-xs text-destructive">{errors.trn}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Optional - for VAT registered businesses
          </p>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-sm font-medium">
            Industry *
          </Label>
          <Select value={data.industry} onValueChange={(value) => handleChange('industry', value)}>
            <SelectTrigger className={errors.industry ? "border-destructive" : ""}>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-xs text-destructive">{errors.industry}</p>
          )}
        </div>

        {/* Average Ticket Size */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="averageTicketSize" className="text-sm font-medium">
            Average Ticket Size (AED) *
          </Label>
          <Input
            id="averageTicketSize"
            type="number"
            min="1"
            value={data.averageTicketSize || ""}
            onChange={(e) => handleChange('averageTicketSize', parseFloat(e.target.value) || 0)}
            placeholder="e.g., 85"
            className={errors.averageTicketSize ? "border-destructive" : ""}
          />
          {errors.averageTicketSize && (
            <p className="text-xs text-destructive">{errors.averageTicketSize}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Approximate average amount customers spend per visit
          </p>
        </div>
      </div>
      </CardContent>
    </Card>
  )
}