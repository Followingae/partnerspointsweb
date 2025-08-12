"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { ContactInfo } from "@/types"
import { Phone, Mail, User } from "lucide-react"

interface ContactStepProps {
  data: ContactInfo
  onChange: (data: ContactInfo) => void
  errors: Record<string, string>
}

export function ContactStep({ data, onChange, errors }: ContactStepProps) {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Primary contact details for your account</CardDescription>
      </CardHeader>
      <CardContent>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-electric-blue" />
            Full Name *
          </Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g., Ahmed Al Mansoori"
            className={errors.fullName ? "border-destructive" : ""}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Primary contact person for this account
          </p>
        </div>

        {/* Work Email */}
        <div className="space-y-2">
          <Label htmlFor="workEmail" className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-electric-blue" />
            Work Email *
          </Label>
          <Input
            id="workEmail"
            type="email"
            value={data.workEmail}
            onChange={(e) => handleChange('workEmail', e.target.value)}
            placeholder="e.g., ahmed@almanara.ae"
            className={errors.workEmail ? "border-destructive" : ""}
          />
          {errors.workEmail && (
            <p className="text-xs text-destructive">{errors.workEmail}</p>
          )}
          <p className="text-xs text-muted-foreground">
            We'll send important updates and login details here
          </p>
        </div>

        {/* Mobile/WhatsApp */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="mobile" className="text-sm font-medium flex items-center gap-2">
            <Phone className="w-4 h-4 text-electric-blue" />
            Mobile/WhatsApp Number *
          </Label>
          <Input
            id="mobile"
            type="tel"
            value={data.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            placeholder="e.g., +971 50 123 4567"
            className={errors.mobile ? "border-destructive" : ""}
          />
          {errors.mobile && (
            <p className="text-xs text-destructive">{errors.mobile}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Include country code. We may contact you for verification or support.
          </p>
        </div>
      </div>

      {/* Contact Preferences Note */}
      <div className="mt-6 p-4 bg-electric-blue/5 border border-electric-blue/20 rounded-lg">
        <h4 className="text-sm font-semibold text-electric-blue mb-2">Contact Preferences</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Account updates and security notifications via email</li>
          <li>• Optional promotional updates (you can opt-out anytime)</li>
          <li>• SMS notifications for critical account issues only</li>
          <li>• WhatsApp support available during business hours</li>
        </ul>
      </div>
      </CardContent>
    </Card>
  )
}