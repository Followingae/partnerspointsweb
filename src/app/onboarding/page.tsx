"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight, ArrowLeft, Check, Phone, Mail, Plus, Minus, MapPin, CreditCard, X } from "lucide-react"
import { gsap } from "gsap"
import Link from "next/link"

interface FormData {
  // Step 1: Personal Introduction
  name: string
  businessName: string
  industry: string
  
  // Step 2: Business Scale
  locationCount: number
  selectedEmirates: string[]
  monthlyCustomers: number[]
  
  // Step 3: Current Setup
  hasRfmTerminal: boolean
  terminalDetails: string
  
  // Step 4: Contact
  email: string
  phone: string
  designation: string
  acceptedTerms: boolean
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    businessName: "",
    industry: "",
    locationCount: 1,
    selectedEmirates: [],
    monthlyCustomers: [1000],
    hasRfmTerminal: false,
    terminalDetails: "",
    email: "",
    phone: "",
    designation: "",
    acceptedTerms: false
  })
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})
  const [isValidating, setIsValidating] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionResponse, setSubmissionResponse] = useState<{message: string, nextSteps: string[]} | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef<HTMLDivElement>(null)

  const industries = [
    { value: "retail", label: "Retail" },
    { value: "restaurant", label: "Restaurant" },
    { value: "healthcare", label: "Healthcare" },
    { value: "service", label: "Service" },
    { value: "other", label: "Other" }
  ]

  const uaeEmirates = [
    { value: "dubai", label: "Dubai", icon: "🏙️" },
    { value: "abu-dhabi", label: "Abu Dhabi", icon: "🏛️" },
    { value: "sharjah", label: "Sharjah", icon: "🎭" },
    { value: "ajman", label: "Ajman", icon: "🏖️" },
    { value: "umm-al-quwain", label: "Umm Al Quwain", icon: "🏞️" },
    { value: "ras-al-khaimah", label: "Ras Al Khaimah", icon: "⛰️" },
    { value: "fujairah", label: "Fujairah", icon: "🏔️" }
  ]

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateField = (field: keyof FormData, value: any, showAnimation: boolean = true): string => {
    let error = ""
    
    switch (field) {
      case "name":
        if (!value || value.trim().length < 2) {
          error = "Please enter your full name"
        }
        break
      case "businessName":
        if (!value || value.trim().length < 2) {
          error = "Please enter your business name"
        }
        break
      case "industry":
        if (!value) {
          error = "Please select your industry"
        }
        break
      case "selectedEmirates":
        if (!value || value.length === 0) {
          error = "Please select at least one emirate"
        }
        break
      case "terminalDetails":
        if (formData.hasRfmTerminal && (!value || value.length !== 9)) {
          error = "Please enter a valid 9-digit Merchant ID"
        }
        break
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) {
          error = "Please enter your email address"
        } else if (!emailRegex.test(value)) {
          error = "Please enter a valid email address"
        }
        break
      case "phone":
        if (!value || value.length !== 13) {
          error = "Please enter a valid UAE phone number (e.g., +971501234123)"
        } else if (!value.startsWith('+971')) {
          error = "UAE phone numbers must start with +971"
        }
        break
      case "designation":
        if (!value || value.trim().length < 2) {
          error = "Please enter your designation"
        }
        break
      case "acceptedTerms":
        if (!value) {
          error = "Please accept the terms and conditions"
        }
        break
    }

    if (error && showAnimation) {
      // Animate validation error
      const fieldElement = document.querySelector(`[data-field="${field}"]`)
      if (fieldElement) {
        gsap.fromTo(fieldElement, { x: 0 }, {
          keyframes: [
            { x: -10, duration: 0.1 },
            { x: 10, duration: 0.1 },
            { x: -5, duration: 0.1 },
            { x: 5, duration: 0.1 },
            { x: 0, duration: 0.1 }
          ],
          ease: "power2.out"
        })
        gsap.to(fieldElement, {
          borderBottomColor: "#ef4444",
          borderBottomWidth: "2px",
          duration: 0.3,
          ease: "power2.out"
        })
      }
    } else if (!error && showAnimation) {
      // Animate success
      const fieldElement = document.querySelector(`[data-field="${field}"]`)
      if (fieldElement) {
        gsap.to(fieldElement, {
          borderBottomColor: "#22c55e",
          borderBottomWidth: "2px",
          duration: 0.3,
          ease: "power2.out"
        })
        // Return to normal after success
        gsap.to(fieldElement, {
          borderBottomColor: "#9ca3af",
          borderBottomWidth: "1px",
          duration: 0.3,
          delay: 1,
          ease: "power2.out"
        })
      }
    }

    return error
  }

  const validateStep = (stepNumber: number): boolean => {
    setIsValidating(true)
    const errors: {[key: string]: string} = {}
    let isValid = true

    switch (stepNumber) {
      case 1:
        const nameError = validateField("name", formData.name, false)
        const businessNameError = validateField("businessName", formData.businessName, false)
        const industryError = validateField("industry", formData.industry, false)
        
        if (nameError) { errors.name = nameError; isValid = false }
        if (businessNameError) { errors.businessName = businessNameError; isValid = false }
        if (industryError) { errors.industry = industryError; isValid = false }
        break
        
      case 2:
        const emiratesError = validateField("selectedEmirates", formData.selectedEmirates, false)
        if (emiratesError) { errors.selectedEmirates = emiratesError; isValid = false }
        break
        
      case 3:
        if (formData.hasRfmTerminal) {
          const terminalError = validateField("terminalDetails", formData.terminalDetails, false)
          if (terminalError) { errors.terminalDetails = terminalError; isValid = false }
        }
        break
        
      case 4:
        const emailError = validateField("email", formData.email, false)
        const phoneError = validateField("phone", formData.phone, false)
        const designationError = validateField("designation", formData.designation, false)
        const termsError = validateField("acceptedTerms", formData.acceptedTerms, false)
        
        if (emailError) { errors.email = emailError; isValid = false }
        if (phoneError) { errors.phone = phoneError; isValid = false }
        if (designationError) { errors.designation = designationError; isValid = false }
        if (termsError) { errors.acceptedTerms = termsError; isValid = false }
        break
    }

    setValidationErrors(errors)
    
    // Animate validation errors
    if (!isValid) {
      Object.keys(errors).forEach(field => {
        validateField(field as keyof FormData, formData[field as keyof FormData], true)
      })
    }
    
    setIsValidating(false)
    return isValid
  }

  const incrementLocationCount = () => {
    const newCount = Math.min(formData.locationCount + 1, 50)
    setFormData(prev => ({ ...prev, locationCount: newCount }))
    
    // GSAP number animation
    const element = document.querySelector('.location-count')
    if (element) {
      gsap.to(element, {
        scale: 1.2,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })
    }
  }

  const decrementLocationCount = () => {
    const newCount = Math.max(formData.locationCount - 1, 1)
    setFormData(prev => ({ ...prev, locationCount: newCount }))
    
    // GSAP number animation
    const element = document.querySelector('.location-count')
    if (element) {
      gsap.to(element, {
        scale: 1.2,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })
    }
  }

  const toggleEmirate = (emirate: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEmirates: prev.selectedEmirates.includes(emirate)
        ? prev.selectedEmirates.filter(e => e !== emirate)
        : [...prev.selectedEmirates, emirate]
    }))
  }

  const handleRfmTerminalChange = (value: boolean) => {
    // Animate out current content if any
    const conditionalContent = document.querySelector('.conditional-content')
    if (conditionalContent) {
      gsap.to(conditionalContent, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          updateFormData("hasRfmTerminal", value)
          // Animate in new content
          setTimeout(() => {
            const newContent = document.querySelector('.conditional-content')
            if (newContent) {
              gsap.fromTo(newContent, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
              )
            }
          }, 50)
        }
      })
    } else {
      updateFormData("hasRfmTerminal", value)
      // Animate in new content
      setTimeout(() => {
        const newContent = document.querySelector('.conditional-content')
        if (newContent) {
          gsap.fromTo(newContent, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          )
        }
      }, 50)
    }
  }

  const toStep = (stepId: number) => {
    if (stepRef.current) {
      // Smooth fade out current step
      gsap.to(stepRef.current.children, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1,
        onComplete: () => {
          setCurrentStep(stepId)
          // Smooth fade in new step
          if (stepRef.current) {
            gsap.fromTo(stepRef.current.children, 
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 }
            )
          }
        }
      })
      
      // Animate progress bar
      gsap.to(".progress-step", {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })
    } else {
      setCurrentStep(stepId)
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      toStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      toStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.businessName && formData.industry
      case 2:
        return formData.selectedEmirates.length > 0
      case 3:
        return true // Always valid - just informational
      case 4:
        return formData.email && formData.phone && formData.designation && formData.acceptedTerms
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      return
    }

    setIsValidating(true)
    
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed')
      }

      // Set submission success state
      setSubmissionResponse(result)
      setIsSubmitted(true)

      // Success animation - fade out current content and show success
      const stepElement = stepRef.current
      if (stepElement) {
        gsap.to(stepElement.children, {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.1,
          onComplete: () => {
            // Let React handle rendering the success state
            setTimeout(() => {
              const successElement = document.querySelector('.success-content')
              if (successElement) {
                gsap.fromTo(successElement.children,
                  { y: 30, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.15 }
                )
              }
            }, 100)
          }
        })
      }

    } catch (error) {
      console.error('Submission error:', error)
      
      // Error animation
      const stepElement = document.querySelector('.step-content')
      if (stepElement) {
        gsap.fromTo(stepElement, { x: 0 }, {
          keyframes: [
            { x: -10, duration: 0.1 },
            { x: 10, duration: 0.1 },
            { x: -5, duration: 0.1 },
            { x: 5, duration: 0.1 },
            { x: 0, duration: 0.1 }
          ],
          ease: "power2.out"
        })
      }

      alert(error instanceof Error ? error.message : 'Failed to submit. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }

  const startNewSubmission = () => {
    // Animate out success content
    const successElement = document.querySelector('.success-content')
    if (successElement) {
      gsap.to(successElement.children, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1,
        onComplete: () => {
          // Reset state
          setFormData({
            name: "",
            businessName: "",
            industry: "",
            locationCount: 1,
            selectedEmirates: [],
            monthlyCustomers: [1000],
            hasRfmTerminal: false,
            terminalDetails: "",
            email: "",
            phone: "",
            designation: "",
            acceptedTerms: false
          })
          setCurrentStep(1)
          setValidationErrors({})
          setIsSubmitted(false)
          setSubmissionResponse(null)
          
          // Animate in step 1
          setTimeout(() => {
            const stepElement = stepRef.current
            if (stepElement) {
              gsap.fromTo(stepElement.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 }
              )
            }
          }, 100)
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      
      {/* Top section - Header */}
      <div className="text-center pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
            Get in touch
          </h1>
          
          {/* Progress indicator */}
          <div className="flex justify-center items-center gap-4 pt-8">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex items-center">
                <div 
                  className={`progress-step flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${
                    step < currentStep 
                      ? 'bg-blue-600 border-blue-600' 
                      : step === currentStep
                      ? 'bg-blue-600 border-blue-600 ring-4 ring-blue-100'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {step < currentStep ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className={`text-sm font-semibold ${
                      step === currentStep ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step}
                    </span>
                  )}
                </div>
                {index < 3 && (
                  <div 
                    className={`w-8 h-0.5 mx-2 transition-all duration-500 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section - Multi-step Form or Success */}
      <div className="pb-16 px-8">
        <div className="max-w-4xl mx-auto" ref={stepRef}>
          
          {/* Success State */}
          {isSubmitted && submissionResponse && (
            <div className="success-content space-y-12 text-center">
              <div className="space-y-6">
                {/* Success checkmark */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                {/* Thank you message */}
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                    Thank you!
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {submissionResponse.message}
                  </p>
                </div>
                
                {/* Next steps */}
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">What happens next?</h3>
                  <div className="space-y-4">
                    {submissionResponse.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4 text-left">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                          {index + 1}
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Start new submission button */}
                <div className="pt-8">
                  <Button
                    onClick={startNewSubmission}
                    variant="outline"
                    className="px-8 py-3 text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    Submit Another Enquiry
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 1: Personal Introduction */}
          {!isSubmitted && currentStep === 1 && (
            <div className="space-y-12">
              {/* First line - single sentence */}
              <div className="text-center">
                <p className="text-3xl lg:text-4xl text-gray-900 leading-tight font-normal whitespace-nowrap">
                  Hi! I'm{" "}
                  <span className="relative inline-block">
                    <Input
                      value={formData.name}
                      data-field="name"
                      onChange={(e) => {
                        updateFormData("name", e.target.value)
                        // Buttery smooth typing feedback
                        gsap.to(e.target, {
                          y: -1,
                          duration: 0.15,
                          ease: "power1.out",
                          yoyo: true,
                          repeat: 1
                        })
                      }}
                      onFocus={(e) => {
                        // Smooth elastic focus animation  
                        gsap.to(e.target, { 
                          borderBottomColor: "#2563eb",
                          borderBottomWidth: "3px",
                          y: -3,
                          duration: 0.8, 
                          ease: "elastic.out(1, 0.6)" 
                        })
                      }}
                      onBlur={(e) => {
                        // Smooth return animation and validate
                        validateField("name", e.target.value)
                        gsap.to(e.target, { 
                          borderBottomColor: validationErrors.name ? "#ef4444" : "#9ca3af",
                          borderBottomWidth: "1px",
                          y: 0,
                          duration: 0.8, 
                          ease: "elastic.out(1, 0.6)" 
                        })
                      }}
                      placeholder="Your Name"
                      className="input-animated inline-block w-auto min-w-[180px] max-w-[250px] border-0 border-b border-gray-400 rounded-none bg-transparent text-3xl lg:text-4xl px-2 py-1 h-auto focus:outline-none focus:ring-0 placeholder:text-gray-400 font-normal text-left"
                      style={{ lineHeight: 'inherit' }}
                    />
                  </span>
                  {" "}from{" "}
                  <span className="relative inline-block">
                    <Input
                      value={formData.businessName}
                      data-field="businessName"
                      onChange={(e) => {
                        updateFormData("businessName", e.target.value)
                        // Buttery smooth typing feedback
                        gsap.to(e.target, {
                          y: -1,
                          duration: 0.15,
                          ease: "power1.out",
                          yoyo: true,
                          repeat: 1
                        })
                      }}
                      onFocus={(e) => {
                        // Smooth elastic focus animation
                        gsap.to(e.target, { 
                          borderBottomColor: "#2563eb",
                          borderBottomWidth: "3px",
                          y: -3,
                          duration: 0.8, 
                          ease: "elastic.out(1, 0.6)" 
                        })
                      }}
                      onBlur={(e) => {
                        // Smooth return animation and validate
                        validateField("businessName", e.target.value)
                        gsap.to(e.target, { 
                          borderBottomColor: validationErrors.businessName ? "#ef4444" : "#9ca3af",
                          borderBottomWidth: "1px",
                          y: 0,
                          duration: 0.8, 
                          ease: "elastic.out(1, 0.6)" 
                        })
                      }}
                      placeholder="Business Name"
                      className="input-animated inline-block w-auto min-w-[220px] max-w-[320px] border-0 border-b border-gray-400 rounded-none bg-transparent text-3xl lg:text-4xl px-2 py-1 h-auto focus:outline-none focus:ring-0 placeholder:text-gray-400 font-normal text-left"
                      style={{ lineHeight: 'inherit' }}
                    />
                  </span>
                  ,
                </p>
              </div>
              
              {/* Second line */}
              <div className="text-center">
                <p className="text-3xl lg:text-4xl text-gray-900 leading-tight font-normal whitespace-nowrap">
                  and I'm in the{" "}
                  <span className="relative inline-block">
                    <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                      <SelectTrigger data-field="industry" className="inline-flex w-auto min-w-[260px] max-w-[350px] border-0 border-b-2 border-gray-400 rounded-none bg-transparent text-3xl lg:text-4xl px-2 py-1 h-auto focus:outline-none focus:ring-0 text-left justify-start font-normal">
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry.value} value={industry.value}>
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </span>
                  {" "}business
                </p>
              </div>
              
              {/* Validation errors for Step 1 */}
              {(validationErrors.name || validationErrors.businessName || validationErrors.industry) && (
                <div className="text-center space-y-2 pt-4">
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm animate-pulse">{validationErrors.name}</p>
                  )}
                  {validationErrors.businessName && (
                    <p className="text-red-500 text-sm animate-pulse">{validationErrors.businessName}</p>
                  )}
                  {validationErrors.industry && (
                    <p className="text-red-500 text-sm animate-pulse">{validationErrors.industry}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Business Scale */}
          {!isSubmitted && currentStep === 2 && (
            <div className="space-y-16">
              {/* Location count with +/- buttons */}
              <div className="text-center">
                <p className="text-3xl lg:text-4xl text-gray-900 leading-tight font-normal whitespace-nowrap">
                  We have{" "}
                  <span className="relative inline-flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={decrementLocationCount}
                      disabled={formData.locationCount <= 1}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="location-count text-3xl lg:text-4xl font-normal text-gray-900 min-w-[60px] text-center">
                      {formData.locationCount}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={incrementLocationCount}
                      disabled={formData.locationCount >= 50}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </span>
                  {" "}location{formData.locationCount !== 1 ? 's' : ''} across
                </p>
              </div>

              {/* UAE Emirates multi-select */}
              <div className="text-center">
                <div className="grid grid-cols-7 gap-2 max-w-6xl mx-auto">
                  {uaeEmirates.map((emirate) => (
                    <div
                      key={emirate.value}
                      onClick={() => toggleEmirate(emirate.value)}
                      className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${
                        formData.selectedEmirates.includes(emirate.value)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center space-y-1">
                        <div className="text-xl">{emirate.icon}</div>
                        <div className={`text-xs font-medium leading-tight ${
                          formData.selectedEmirates.includes(emirate.value)
                            ? 'text-blue-700'
                            : 'text-gray-700'
                        }`}>
                          {emirate.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly customers */}
              <div className="text-center">
                <p className="text-3xl lg:text-4xl text-gray-900 leading-tight font-normal">
                  and serve approximately{" "}
                  <span className="font-normal text-gray-900">
                    {formData.monthlyCustomers[0].toLocaleString()}
                  </span>
                  {" "}customers monthly
                </p>
                
                <div className="max-w-md mx-auto px-8 mt-8">
                  <Slider
                    value={formData.monthlyCustomers}
                    onValueChange={(value) => updateFormData("monthlyCustomers", value)}
                    max={10000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Validation errors for Step 2 */}
              {validationErrors.selectedEmirates && (
                <div className="text-center pt-4">
                  <p className="text-red-500 text-sm animate-pulse">{validationErrors.selectedEmirates}</p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Current Setup */}
          {!isSubmitted && currentStep === 3 && (
            <div className="space-y-12">
              {/* Single line conversational question */}
              <div className="text-center">
                <p className="text-2xl lg:text-3xl text-gray-900 leading-tight font-normal whitespace-nowrap">
                  Currently, we{" "}
                  <button
                    onClick={() => handleRfmTerminalChange(false)}
                    className={`mx-1 px-2 py-1 text-2xl lg:text-3xl font-normal border-0 border-b-2 bg-transparent transition-all duration-300 cursor-pointer ${
                      formData.hasRfmTerminal === false
                        ? 'border-red-500 text-red-600'
                        : 'border-gray-400 text-gray-900 hover:border-gray-500'
                    }`}
                  >
                    don't use
                  </button>
                  {" / "}
                  <button
                    onClick={() => handleRfmTerminalChange(true)}
                    className={`mx-1 px-2 py-1 text-2xl lg:text-3xl font-normal border-0 border-b-2 bg-transparent transition-all duration-300 cursor-pointer ${
                      formData.hasRfmTerminal === true
                        ? 'border-green-500 text-green-600'
                        : 'border-gray-400 text-gray-900 hover:border-gray-500'
                    }`}
                  >
                    use
                  </button>
                  {" "}RFM Payment Terminals
                </p>
              </div>

              {/* Conditional content based on selection */}
              {formData.hasRfmTerminal === true && (
                <div className="conditional-content space-y-8">
                  <div className="text-center space-y-4">
                    <p className="text-2xl lg:text-3xl text-gray-900 leading-tight font-normal">
                      Great! What's your MID{" "}
                      <span className="relative inline-block">
                        <Input
                          value={formData.terminalDetails}
                          data-field="terminalDetails"
                          onChange={(e) => {
                            // Only allow numbers and limit to 9 digits
                            const value = e.target.value.replace(/\D/g, '').slice(0, 9)
                            updateFormData("terminalDetails", value)
                            // Buttery smooth typing feedback
                            gsap.to(e.target, {
                              y: -1,
                              duration: 0.15,
                              ease: "power1.out",
                              yoyo: true,
                              repeat: 1
                            })
                          }}
                          onFocus={(e) => {
                            // Smooth elastic focus animation
                            gsap.to(e.target, { 
                              borderBottomColor: "#2563eb",
                              borderBottomWidth: "3px",
                              y: -3,
                              duration: 0.8, 
                              ease: "elastic.out(1, 0.6)" 
                            })
                          }}
                          onBlur={(e) => {
                            // Smooth return animation and validate
                            validateField("terminalDetails", e.target.value)
                            gsap.to(e.target, { 
                              borderBottomColor: validationErrors.terminalDetails ? "#ef4444" : "#9ca3af",
                              borderBottomWidth: "1px",
                              y: 0,
                              duration: 0.8, 
                              ease: "elastic.out(1, 0.6)" 
                            })
                          }}
                          placeholder="123456789"
                          maxLength={9}
                          className="input-animated inline-block w-auto min-w-[180px] max-w-[220px] border-0 border-b border-gray-400 rounded-none bg-transparent text-2xl lg:text-3xl px-2 py-1 h-auto focus:outline-none focus:ring-0 placeholder:text-gray-400 font-normal text-center"
                          style={{ lineHeight: 'inherit' }}
                        />
                      </span>
                      ?
                    </p>
                    
                    {/* Helpful badge */}
                    <div className="flex justify-center">
                      <Badge variant="secondary" className="text-xs text-gray-600 bg-gray-100 px-3 py-1">
                        The MID can be found on your RFM Payment Terminal screen
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {formData.hasRfmTerminal === false && (
                <div className="conditional-content max-w-xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">No worries!</h3>
                    <p className="text-base text-gray-600">
                      We'll provide terminals, setup, and training.
                    </p>
                    <div className="pt-1">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        Everything included 🚀
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Validation errors for Step 3 */}
              {validationErrors.terminalDetails && (
                <div className="text-center pt-4">
                  <p className="text-red-500 text-sm animate-pulse">{validationErrors.terminalDetails}</p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Contact */}
          {!isSubmitted && currentStep === 4 && (
            <div className="space-y-16">
              {/* Email line */}
              <div className="text-center">
                <p className="text-3xl lg:text-4xl text-gray-900 leading-tight font-normal">
                  Contact me at{" "}
                  <span className="relative inline-block">
                    <Input
                      type="email"
                      value={formData.email}
                      data-field="email"
                      onChange={(e) => {
                        updateFormData("email", e.target.value)
                        // Buttery smooth typing feedback
                        gsap.to(e.target, {
                          y: -1,
                          duration: 0.15,
                          ease: "power1.out",
                          yoyo: true,
                          repeat: 1
                        })
                      }}
                      onFocus={(e) => {
                        gsap.to(e.target, { 
                          borderBottomColor: "#2563eb",
                          borderBottomWidth: "3px",
                          y: -3,
                          duration: 0.8, 
                          ease: "elastic.out(1, 0.6)" 
                        })
                      }}
                      onBlur={(e) => {
                        validateField("email", e.target.value)
                        gsap.to(e.target, { 
                          borderBottomColor: validationErrors.email ? "#ef4444" : "#9ca3af",
                          borderBottomWidth: "1px",
                          y: 0,
                          duration: 0.8, 
                          ease: "elastic.out(1, 0.6)" 
                        })
                      }}
                      placeholder="your.email@business.com"
                      className="input-animated inline-block w-auto min-w-[450px] max-w-[600px] border-0 border-b border-gray-400 rounded-none bg-transparent text-3xl lg:text-4xl px-2 py-1 h-auto focus:outline-none focus:ring-0 placeholder:text-gray-400 font-normal text-left"
                      style={{ lineHeight: 'inherit' }}
                    />
                  </span>
                  {" "}or
                </p>
              </div>

              {/* Mobile number line */}
              <div className="text-center">
                <p className="text-3xl lg:text-4xl text-gray-900 leading-tight font-normal">
                  call me on{" "}
                  <span className="relative inline-block">
                    <Input
                      type="tel"
                      value={formData.phone}
                      data-field="phone"
                      onChange={(e) => {
                        // Format phone number (UAE format) - +971501234123
                        let value = e.target.value
                        
                        // If user starts typing numbers, auto-prepend +971
                        if (value.match(/^[0-9]/) && !value.startsWith('+971')) {
                          value = '+971' + value
                        }
                        
                        // Only allow +971 followed by 9 digits
                        if (value.startsWith('+971')) {
                          const digits = value.slice(4).replace(/\D/g, '').slice(0, 9)
                          value = '+971' + digits
                        } else if (value.startsWith('+')) {
                          // If they start with + but not +971, correct it
                          const allDigits = value.replace(/\D/g, '')
                          if (allDigits.startsWith('971')) {
                            const remainingDigits = allDigits.slice(3).slice(0, 9)
                            value = '+971' + remainingDigits
                          } else {
                            value = '+971'
                          }
                        } else {
                          // If no +, just allow clearing
                          value = value === '' ? '' : '+971'
                        }
                        
                        updateFormData("phone", value)
                        // Buttery smooth typing feedback
                        gsap.to(e.target, {
                          y: -1,
                          duration: 0.15,
                          ease: "power1.out",
                          yoyo: true,
                          repeat: 1
                        })
                      }}
                      onFocus={(e) => {
                        gsap.to(e.target, { 
                          borderBottomColor: "#2563eb",
                          borderBottomWidth: "3px",
                          y: -3,
                          duration: 0.8, 
                          ease: "elastic.out(1, 0.6)" 
                        })
                      }}
                      onBlur={(e) => {
                        validateField("phone", e.target.value)
                        gsap.to(e.target, { 
                          borderBottomColor: validationErrors.phone ? "#ef4444" : "#9ca3af",
                          borderBottomWidth: "1px",
                          y: 0,
                          duration: 0.8, 
                          ease: "elastic.out(1, 0.6)" 
                        })
                      }}
                      placeholder="+971501234123"
                      className="input-animated inline-block w-auto min-w-[280px] max-w-[350px] border-0 border-b border-gray-400 rounded-none bg-transparent text-3xl lg:text-4xl px-2 py-1 h-auto focus:outline-none focus:ring-0 placeholder:text-gray-400 font-normal text-left"
                      style={{ lineHeight: 'inherit' }}
                    />
                  </span>
                </p>
              </div>

              {/* Designation line */}
              <div className="text-center">
                <p className="text-3xl lg:text-4xl text-gray-900 leading-tight font-normal">
                  I'm the{" "}
                  <span className="relative inline-block">
                    <Input
                      value={formData.designation}
                      data-field="designation"
                      onChange={(e) => {
                        updateFormData("designation", e.target.value)
                        // Buttery smooth typing feedback
                        gsap.to(e.target, {
                          y: -1,
                          duration: 0.15,
                          ease: "power1.out",
                          yoyo: true,
                          repeat: 1
                        })
                      }}
                      onFocus={(e) => {
                        gsap.to(e.target, { 
                          borderBottomColor: "#2563eb",
                          borderBottomWidth: "3px",
                          y: -3,
                          duration: 0.8, 
                          ease: "elastic.out(1, 0.6)" 
                        })
                      }}
                      onBlur={(e) => {
                        validateField("designation", e.target.value)
                        gsap.to(e.target, { 
                          borderBottomColor: validationErrors.designation ? "#ef4444" : "#9ca3af",
                          borderBottomWidth: "1px",
                          y: 0,
                          duration: 0.8, 
                          ease: "elastic.out(1, 0.6)" 
                        })
                      }}
                      placeholder="Owner / Manager / Director"
                      className="input-animated inline-block w-auto min-w-[300px] max-w-[400px] border-0 border-b border-gray-400 rounded-none bg-transparent text-3xl lg:text-4xl px-2 py-1 h-auto focus:outline-none focus:ring-0 placeholder:text-gray-400 font-normal text-left"
                      style={{ lineHeight: 'inherit' }}
                    />
                  </span>
                  {" "}here
                </p>
              </div>
              
              {/* Terms checkbox */}
              <div className="flex items-start justify-center space-x-3 pt-8">
                <Checkbox
                  id="terms"
                  data-field="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onCheckedChange={(checked) => updateFormData("acceptedTerms", checked)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-lg text-gray-700 leading-relaxed">
                  I hereby accept all terms and conditions.
                </Label>
              </div>
              
              {/* Validation errors for Step 4 */}
              {(validationErrors.email || validationErrors.phone || validationErrors.designation || validationErrors.acceptedTerms) && (
                <div className="text-center space-y-2 pt-4">
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm animate-pulse">{validationErrors.email}</p>
                  )}
                  {validationErrors.phone && (
                    <p className="text-red-500 text-sm animate-pulse">{validationErrors.phone}</p>
                  )}
                  {validationErrors.designation && (
                    <p className="text-red-500 text-sm animate-pulse">{validationErrors.designation}</p>
                  )}
                  {validationErrors.acceptedTerms && (
                    <p className="text-red-500 text-sm animate-pulse">{validationErrors.acceptedTerms}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation - Fixed positioning */}
          {!isSubmitted && (
          <div className="flex justify-between items-center pt-16">
            {/* Left side - Back button container (fixed width) */}
            <div className="w-20 flex justify-start">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`text-gray-600 hover:text-gray-900 ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
            
            {/* Right side - Continue/Submit button container (fixed width) */}
            <div className="w-40 flex justify-end">
              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isValidating}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  {isValidating ? 'Submitting...' : 'Send Enquiry'}
                  {!isValidating && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              )}
            </div>
          </div>
          )}
          
        </div>
      </div>
    </div>
  )
}