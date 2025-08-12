"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Building, User, CreditCard, ArrowRight, ArrowLeft } from "lucide-react"

type OnboardingStep = "business" | "contact" | "complete"

interface FormData {
  // Business Info
  businessName: string
  industry: string
  monthlySales: string
  
  // Contact Info
  fullName: string
  email: string
  phone: string
  
  // Preferences
  earnBackRate: string
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("business")
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    industry: "",
    monthlySales: "",
    fullName: "",
    email: "",
    phone: "",
    earnBackRate: "10"
  })

  const steps = {
    business: { title: "Business Details", icon: Building, progress: 33 },
    contact: { title: "Contact Information", icon: User, progress: 66 },
    complete: { title: "Complete", icon: CheckCircle, progress: 100 }
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isStepValid = (step: OnboardingStep) => {
    switch (step) {
      case "business":
        return formData.businessName && formData.industry && formData.monthlySales
      case "contact":
        return formData.fullName && formData.email && formData.phone
      default:
        return true
    }
  }

  const nextStep = () => {
    if (currentStep === "business") setCurrentStep("contact")
    else if (currentStep === "contact") setCurrentStep("complete")
  }

  const prevStep = () => {
    if (currentStep === "contact") setCurrentStep("business")
    else if (currentStep === "complete") setCurrentStep("contact")
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Your RFM Payment Terminal is now being configured for loyalty. You'll be live within 1–2 business days. Our team will contact you within 24 hours with next steps.")
  }

  const CurrentIcon = steps[currentStep].icon

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CurrentIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">From sign-up to your first rewarded sale in hours</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Simple onboarding flow — we configure your RFM Payment Terminal for loyalty.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep === "business" ? "1" : currentStep === "contact" ? "2" : "3"} of 3
            </span>
            <span className="text-sm text-muted-foreground">
              {steps[currentStep].progress}% complete
            </span>
          </div>
          <Progress value={steps[currentStep].progress} className="w-full" />
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CurrentIcon className="h-5 w-5" />
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription>
              {currentStep === "business" && "Business profile — Legal info, TRN, industry."}
              {currentStep === "contact" && "Contact — Who we liaise with."}
              {currentStep === "complete" && "Review & submit — We take it from there."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Business Step */}
            {currentStep === "business" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name *</Label>
                  <Input
                    id="business-name"
                    placeholder="Your Business Name"
                    value={formData.businessName}
                    onChange={(e) => updateFormData("businessName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant">Restaurant & Food</SelectItem>
                      <SelectItem value="retail">Retail & Shopping</SelectItem>
                      <SelectItem value="healthcare">Healthcare & Wellness</SelectItem>
                      <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly-sales">Approximate Monthly Sales *</Label>
                  <Select value={formData.monthlySales} onValueChange={(value) => updateFormData("monthlySales", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sales range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-25k">AED 0 - 25,000</SelectItem>
                      <SelectItem value="25k-50k">AED 25,000 - 50,000</SelectItem>
                      <SelectItem value="50k-100k">AED 50,000 - 100,000</SelectItem>
                      <SelectItem value="100k-250k">AED 100,000 - 250,000</SelectItem>
                      <SelectItem value="250k+">AED 250,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="earn-back">Points Earn Back Rate</Label>
                  <Select value={formData.earnBackRate} onValueChange={(value) => updateFormData("earnBackRate", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5% back in points</SelectItem>
                      <SelectItem value="8">8% back in points</SelectItem>
                      <SelectItem value="10">10% back in points (Recommended)</SelectItem>
                      <SelectItem value="12">12% back in points</SelectItem>
                      <SelectItem value="15">15% back in points</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    How much customers earn back in points per AED spent
                  </p>
                </div>
              </>
            )}

            {/* Contact Step */}
            {currentStep === "contact" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name *</Label>
                  <Input
                    id="full-name"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Business Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@business.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                  />
                </div>

                <Separator />

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">After Submit</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    We configure your RFM Payment Terminal for loyalty. You're live within 1–2 business days.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ Terminal configuration for loyalty features</li>
                    <li>✓ Staff training materials and setup guide</li>
                    <li>✓ Merchant Portal access and customer app setup</li>
                    <li>✓ Go live with your first loyalty transaction!</li>
                  </ul>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-sm mb-2">Required Documents:</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• Trade license copy</p>
                      <p>• Business owner ID</p>
                      <p>• Company logo (for customer app)</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Complete Step */}
            {currentStep === "complete" && (
              <div className="text-center space-y-6 py-8">
                <CheckCircle className="h-24 w-24 text-green-500 mx-auto" />
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Application Summary</h2>
                  <p className="text-muted-foreground">
                    Please review your information before submitting
                  </p>
                </div>

                <div className="grid gap-4 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Business:</span>
                    <span className="font-semibold">{formData.businessName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry:</span>
                    <Badge variant="secondary">{formData.industry}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Sales:</span>
                    <span>{formData.monthlySales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contact:</span>
                    <span>{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points Rate:</span>
                    <Badge>{formData.earnBackRate}% back</Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          {/* Navigation */}
          <div className="p-6 pt-0">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === "business"}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentStep !== "complete" ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} size="lg">
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}