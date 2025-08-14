"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, User, MapPin, CreditCard, Settings, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { gsap } from "gsap"
import Flip from "gsap/Flip"
import Link from "next/link"

// Register GSAP plugins
gsap.registerPlugin(Flip)

interface FormData {
  // Step 1: You & business
  fullName: string
  businessName: string
  phone: string
  email: string
  industry: string
  
  // Step 2: Locations
  locations: { city: string }[]
  
  // Step 3: RFM Terminal
  hasRfmTerminal: boolean
  terminalModel: string
  merchantId: string
  
  // Step 4: Program preference
  earnRule: string
  
  // Step 5: Review & go
  acceptedTerms: boolean
  acceptedPrivacy: boolean
}

interface Outlet {
  city: string
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    businessName: "",
    phone: "+971 ",
    email: "",
    industry: "",
    locations: [{ city: "" }],
    hasRfmTerminal: false,
    terminalModel: "",
    merchantId: "",
    earnRule: "",
    acceptedTerms: false,
    acceptedPrivacy: false
  })
  
  const [reducedMotion, setReducedMotion] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Autosave functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('onboarding-data', JSON.stringify(formData))
      showSaveIndicator()
    }, 1000)
    return () => clearTimeout(timer)
  }, [formData])

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem('onboarding-data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFormData(parsed)
      } catch (e) {
        console.error('Error loading saved data:', e)
      }
    }
  }, [])

  const showSaveIndicator = () => {
    const indicator = document.querySelector('.save-indicator')
    if (indicator && !reducedMotion) {
      gsap.set(indicator, { opacity: 1, y: 0 })
      gsap.to(indicator, { opacity: 0, y: -10, duration: 1.2, delay: 0.5, ease: "power2.out" })
    }
  }

  const industries = [
    { id: "retail", label: "Retail" },
    { id: "restaurants", label: "Restaurants" },
    { id: "clinics", label: "Clinics" },
    { id: "supermarkets", label: "Supermarkets" },
    { id: "other", label: "Other" }
  ]

  const earnRules = [
    { id: "5", label: "5%" },
    { id: "8", label: "8%" },
    { id: "10", label: "10%" },
    { id: "custom", label: "Custom" }
  ]

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addLocation = () => {
    setFormData(prev => ({
      ...prev,
      locations: [...prev.locations, { city: "" }]
    }))
    
    // Confetti after adding location (step 2)
    if (currentStep === 2 && !reducedMotion) {
      confettiBurst(document.querySelector('.step-container') as HTMLElement)
    }
  }

  const updateLocation = (index: number, city: string) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.map((loc, i) => i === index ? { city } : loc)
    }))
  }

  const removeLocation = (index: number) => {
    if (formData.locations.length > 1) {
      setFormData(prev => ({
        ...prev,
        locations: prev.locations.filter((_, i) => i !== index)
      }))
    }
  }

  const toStep = (stepId: number) => {
    if (!reducedMotion) {
      const state = Flip.getState(".step.active, .progress-dot.active")
      
      // Hide current step with autoAlpha
      const currentStepEl = document.querySelector(".step.active")
      if (currentStepEl) {
        gsap.to(currentStepEl, { autoAlpha: 0, duration: 0.15, ease: "power2.out" })
      }
      
      // Update active step after fade
      setTimeout(() => {
        document.querySelector(".step.active")?.classList.remove("active")
        const nextStepEl = document.getElementById(`step-${stepId}`)
        nextStepEl?.classList.add("active")
        
        // Update progress dots
        document.querySelectorAll(".progress-dot").forEach((d, i) => {
          d.classList.toggle("active", i < stepId)
        })
        
        // Animate step transition with Flip
        Flip.from(state, { duration: 0.35, ease: "power2.out", absolute: true })
        
        // Show new step with autoAlpha
        if (nextStepEl) {
          gsap.fromTo(nextStepEl, 
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.2, ease: "power2.out" }
          )
        }
        
        // Animate fields with stagger
        const fields = document.querySelectorAll(`#step-${stepId} .field`)
        gsap.fromTo(fields, 
          { y: 12, autoAlpha: 0 }, 
          { 
            y: 0, 
            autoAlpha: 1, 
            stagger: 0.05, 
            duration: 0.28, 
            ease: "power2.out",
            delay: 0.1
          }
        )
      }, 150)
      
      // Update progress bar with enhanced animation
      gsap.to(".progress-fill", { 
        width: `${(stepId / 5) * 100}%`, 
        duration: 0.4, 
        ease: "power3.out" 
      })
      
      // Enhanced parallax animation for background dots
      gsap.to(".bg-dots", { 
        x: "+=20", 
        duration: 2, 
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
      
      // Animate parallax dots in progress bar
      gsap.to(".parallax-dots > div", { 
        x: "+=15", 
        duration: 3, 
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.05
      })
    }
    
    setCurrentStep(stepId)
  }

  const nextStep = () => {
    if (currentStep < 5) {
      // Confetti for steps 2 & 4
      if ((currentStep === 2 || currentStep === 4) && !reducedMotion) {
        confettiBurst(document.querySelector('.step-container') as HTMLElement)
      }
      toStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      toStep(currentStep - 1)
    }
  }

  const confettiBurst = (container: HTMLElement) => {
    if (!container) return
    
    const dots = Array.from({ length: 8 }, () => {
      const d = document.createElement("div")
      d.className = "confetti"
      d.style.cssText = "width:6px;height:6px;border-radius:9999px;background:currentColor;position:absolute;color:#3b82f6;"
      container.appendChild(d)
      return d
    })
    
    gsap.set(dots, { x: 0, y: 0, opacity: 1, scale: 0.8, rotate: 0 })
    gsap.to(dots, {
      keyframes: [
        { 
          x: () => gsap.utils.random(-40, 40), 
          y: () => gsap.utils.random(-60, -100), 
          rotate: () => gsap.utils.random(-90, 90), 
          duration: 0.5, 
          ease: "power2.out" 
        },
        { 
          y: "+=120", 
          opacity: 0, 
          duration: 0.6, 
          ease: "power1.in" 
        }
      ],
      stagger: 0.03,
      onComplete() {
        dots.forEach(d => d.remove())
      }
    })
  }

  const setupMagneticButton = (btn: HTMLElement) => {
    if (reducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      gsap.to(btn, { x: x * 0.08, y: y * 0.1, duration: 0.2, ease: "power2.out" })
    }

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.3 })
    }

    const handleClick = () => {
      gsap.fromTo(btn, 
        { scale: 0.98 }, 
        { scale: 1, duration: 0.15, ease: "back.out(3)" }
      )
    }

    btn.addEventListener("mousemove", handleMouseMove)
    btn.addEventListener("mouseleave", handleMouseLeave)
    btn.addEventListener("click", handleClick)

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove)
      btn.removeEventListener("mouseleave", handleMouseLeave)
      btn.removeEventListener("click", handleClick)
    }
  }

  const wiggle = (el: HTMLElement) => {
    if (reducedMotion) return
    gsap.fromTo(el, 
      { x: -3 }, 
      { 
        x: 0, 
        keyframes: [{ x: 3 }, { x: -2 }, { x: 2 }, { x: 0 }], 
        duration: 0.28, 
        ease: "power2.out" 
      }
    )
  }

  const showSuccessCheckmark = (el: HTMLElement) => {
    if (reducedMotion) return
    
    // Create checkmark element
    const checkmark = document.createElement("div")
    checkmark.innerHTML = `
      <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" style="stroke-dasharray: 20; stroke-dashoffset: 20;"></path>
      </svg>
    `
    checkmark.className = "absolute -right-8 top-1/2 transform -translate-y-1/2"
    el.parentElement?.appendChild(checkmark)
    
    // Animate checkmark drawing
    const path = checkmark.querySelector("path")
    if (path) {
      gsap.to(path, { 
        strokeDashoffset: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      })
    }
    
    // Glow effect on field
    gsap.fromTo(el, 
      { boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.4)" }, 
      { 
        boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.4)", 
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      }
    )
    
    // Remove checkmark after delay
    setTimeout(() => checkmark.remove(), 2000)
  }

  const showErrorTooltip = (el: HTMLElement, message: string) => {
    if (reducedMotion) return
    
    // Remove existing tooltip
    const existingTooltip = el.parentElement?.querySelector('.error-tooltip')
    if (existingTooltip) existingTooltip.remove()
    
    // Create tooltip
    const tooltip = document.createElement("div")
    tooltip.className = "error-tooltip absolute -top-10 left-0 bg-red-100 text-red-800 text-xs px-2 py-1 rounded shadow-lg z-10"
    tooltip.textContent = message
    el.parentElement?.appendChild(tooltip)
    
    // Animate tooltip
    gsap.fromTo(tooltip, 
      { autoAlpha: 0, y: 5 },
      { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }
    )
    
    // Wiggle the field
    wiggle(el)
    
    // Auto-hide tooltip
    gsap.to(tooltip, { 
      autoAlpha: 0, 
      duration: 0.2, 
      delay: 3, 
      ease: "power2.out",
      onComplete: () => tooltip.remove()
    })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.businessName && formData.phone && formData.email && formData.industry
      case 2:
        return formData.locations.every(loc => loc.city.trim() !== "")
      case 3:
        return formData.hasRfmTerminal !== undefined && 
               (!formData.hasRfmTerminal || (formData.terminalModel && formData.merchantId))
      case 4:
        return formData.earnRule !== ""
      case 5:
        return formData.acceptedTerms && formData.acceptedPrivacy
      default:
        return false
    }
  }

  const handleSubmit = () => {
    if (!reducedMotion) {
      // Enhanced success animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } })
      
      // Big checkmark draw with rotation
      tl.from(".success-check", { 
        scale: 0, 
        duration: 0.4, 
        rotate: -20,
        ease: "back.out(2)"
      })
      
      // Confetti microburst
      .add(() => {
        confettiBurst(document.querySelector('.step-container') as HTMLElement)
      }, "-=0.2")
      
      // Success headline reveal
      .from(".success-headline", { 
        y: 10, 
        autoAlpha: 0, 
        duration: 0.3 
      }, "-=0.1")
      
      // Next steps timeline with enhanced stagger
      .from(".next-steps li", { 
        y: 8, 
        autoAlpha: 0, 
        stagger: 0.06, 
        duration: 0.25,
        ease: "power2.out"
      }, "-=0.1")
      
      // Add final celebration pulse
      .to(".success-check", {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }, "+=0.5")
    }
    
    // Handle form submission
    console.log("Form submitted:", formData)
    localStorage.removeItem('onboarding-data')
    
    // Show success message after animation
    setTimeout(() => {
      alert("Your RFM Payment Terminal is now being configured for loyalty. You'll be live within 1–2 business days.")
    }, 1500)
  }

  // Validation handlers
  const handleInputValidation = (value: string, field: string, element: HTMLInputElement) => {
    if (!value.trim()) {
      showErrorTooltip(element, `${field} is required`)
      return false
    } else if (value.trim().length > 0) {
      showSuccessCheckmark(element)
      return true
    }
    return false
  }

  const handleEmailValidation = (email: string, element: HTMLInputElement) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      showErrorTooltip(element, "Email is required")
      return false
    } else if (!emailRegex.test(email)) {
      showErrorTooltip(element, "Please enter a valid email")
      return false
    } else {
      showSuccessCheckmark(element)
      return true
    }
  }

  const handlePhoneValidation = (phone: string, element: HTMLInputElement) => {
    if (!phone || phone.length < 10) {
      showErrorTooltip(element, "Please enter a valid phone number")
      return false
    } else {
      showSuccessCheckmark(element)
      return true
    }
  }

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return User
      case 2: return MapPin
      case 3: return CreditCard
      case 4: return Settings
      case 5: return CheckCircle
      default: return User
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "You & Business"
      case 2: return "Locations" 
      case 3: return "RFM Terminal"
      case 4: return "Program Preference"
      case 5: return "Review & Go"
      default: return ""
    }
  }

  useEffect(() => {
    if (buttonRef.current) {
      setupMagneticButton(buttonRef.current)
    }
  }, [currentStep, reducedMotion])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20 relative overflow-hidden">
      {/* Background animated dots */}
      <div className="bg-dots absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-purple-400 rounded-full"></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-green-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-yellow-400 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            From sign-up to your first rewarded sale in hours
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Simple 5-step flow — we configure your RFM Payment Terminal for loyalty.
          </p>
          
          {/* Progress indicator - Better desktop spacing */}
          <div className="flex justify-center items-center gap-8 lg:gap-16 mb-4">
            {[1, 2, 3, 4, 5].map((step, index) => {
              const Icon = getStepIcon(step)
              const isActive = step <= currentStep
              const isCompleted = step < currentStep
              
              return (
                <div key={step} className="flex items-center">
                  <div
                    className={`progress-dot flex flex-col items-center ${
                      isActive ? "active text-blue-600" : "text-gray-400"
                    }`}
                    data-step={step}
                  >
                    <div
                      className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center border-2 mb-2 transition-all duration-300 ${
                        isActive
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 lg:w-7 lg:h-7" />
                      ) : (
                        <Icon className="w-6 h-6 lg:w-7 lg:h-7" />
                      )}
                    </div>
                    <span className="text-xs lg:text-sm font-medium hidden md:block text-center">
                      {getStepTitle(step)}
                    </span>
                  </div>
                  
                  {/* Connection line */}
                  {index < 4 && (
                    <div className="hidden md:flex items-center mx-4 lg:mx-8">
                      <div className={`h-0.5 w-12 lg:w-20 transition-all duration-500 ${
                        step < currentStep ? "bg-blue-600" : "bg-gray-300"
                      }`}></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          {/* Progress bar with parallax dots */}
          <div className="relative w-full max-w-md mx-auto mb-6">
            {/* Background parallax dots - Fixed for SSR */}
            <div className="parallax-dots absolute inset-0 flex items-center justify-center opacity-20 overflow-hidden">
              <div className="flex gap-1">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-blue-400 rounded-full"
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Main progress bar */}
            <div className="relative bg-gray-200 rounded-full h-2">
              <div 
                className="progress-fill bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-400 relative overflow-hidden"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              >
                {/* Moving stripe effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 max-w-md mx-auto">
            <span>Step {currentStep} of 5</span>
            <span>~{Math.max(5 - currentStep, 0) * 15 + 15}s left</span>
          </div>
        </div>

        {/* Save indicator */}
        <div className="save-indicator fixed top-6 right-6 bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium opacity-0">
          Saved ✓
        </div>

        {/* Sticky promise */}
        <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg border max-w-xs">
          <h4 className="font-semibold text-sm mb-2">What you get:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Runs inside your RFM Payment Terminal</li>
            <li>• No extra hardware needed</li>
            <li>• Activation in ~1–2 days</li>
          </ul>
        </div>

        {/* Form container - Match the 5 icons width */}
        <div className="step-container relative w-full">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl w-full">
            <CardContent className="p-8 md:p-12 lg:p-16">
              
              {/* Step 1: You & Business */}
              <div id="step-1" className={`step ${currentStep === 1 ? "active" : "hidden"}`}>
                <div className="text-center mb-8">
                  <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">You & Business</h2>
                  <p className="text-gray-600">Tell us about yourself and your business</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                  <div className="field relative">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      onBlur={(e) => handleInputValidation(e.target.value, "Full name", e.target)}
                      className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div className="field relative">
                    <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                      Business Name *
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => updateFormData("businessName", e.target.value.replace(/\b\w/g, l => l.toUpperCase()))}
                      onBlur={(e) => handleInputValidation(e.target.value, "Business name", e.target)}
                      className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="My Amazing Business"
                    />
                  </div>
                  
                  <div className="field relative">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      onBlur={(e) => handlePhoneValidation(e.target.value, e.target)}
                      className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                  
                  <div className="field relative">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      onBlur={(e) => handleEmailValidation(e.target.value, e.target)}
                      className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@business.com"
                    />
                  </div>
                </div>
                
                <div className="field mt-8">
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Industry *
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {industries.map((industry) => (
                      <button
                        key={industry.id}
                        type="button"
                        onClick={() => updateFormData("industry", industry.id)}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                          formData.industry === industry.id
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                        }`}
                      >
                        {industry.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Locations */}
              <div id="step-2" className={`step ${currentStep === 2 ? "active" : "hidden"}`}>
                <div className="text-center mb-8">
                  <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Locations</h2>
                  <p className="text-gray-600">Where are your outlets located?</p>
                </div>
                
                <div className="max-w-md mx-auto space-y-4">
                  {formData.locations.map((location, index) => (
                    <div key={index} className="field flex gap-3 relative">
                      <Input
                        value={location.city}
                        onChange={(e) => updateLocation(index, e.target.value)}
                        onBlur={(e) => handleInputValidation(e.target.value, "City name", e.target)}
                        placeholder="City name"
                        className="flex-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {formData.locations.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeLocation(index)}
                          className="px-3"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addLocation}
                    className="w-full border-dashed border-2 border-gray-300 hover:border-blue-400"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add outlet
                  </Button>
                </div>
              </div>

              {/* Step 3: RFM Terminal */}
              <div id="step-3" className={`step ${currentStep === 3 ? "active" : "hidden"}`}>
                <div className="text-center mb-8">
                  <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">RFM Terminal</h2>
                  <p className="text-gray-600">Do you already use an RFM Payment Terminal?</p>
                </div>
                
                <div className="max-w-md mx-auto">
                  <div className="field flex gap-4 justify-center mb-6">
                    <button
                      type="button"
                      onClick={() => updateFormData("hasRfmTerminal", true)}
                      className={`px-8 py-3 rounded-full border-2 transition-all duration-200 ${
                        formData.hasRfmTerminal === true
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateFormData("hasRfmTerminal", false)}
                      className={`px-8 py-3 rounded-full border-2 transition-all duration-200 ${
                        formData.hasRfmTerminal === false
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                      }`}
                    >
                      No
                    </button>
                  </div>
                  
                  {formData.hasRfmTerminal === true && (
                    <Card className="field p-4 border-2 border-blue-200 bg-blue-50">
                      <div className="space-y-4">
                        <div className="relative">
                          <Label htmlFor="terminalModel" className="text-sm font-medium text-gray-700">
                            Terminal Model
                          </Label>
                          <Input
                            id="terminalModel"
                            value={formData.terminalModel}
                            onChange={(e) => updateFormData("terminalModel", e.target.value)}
                            onBlur={(e) => handleInputValidation(e.target.value, "Terminal model", e.target)}
                            className="mt-1"
                            placeholder="e.g., PAX A920"
                          />
                        </div>
                        <div className="relative">
                          <Label htmlFor="merchantId" className="text-sm font-medium text-gray-700">
                            Merchant ID
                          </Label>
                          <Input
                            id="merchantId"
                            value={formData.merchantId}
                            onChange={(e) => updateFormData("merchantId", e.target.value)}
                            onBlur={(e) => handleInputValidation(e.target.value, "Merchant ID", e.target)}
                            className="mt-1"
                            placeholder="Your merchant ID"
                          />
                        </div>
                      </div>
                    </Card>
                  )}
                  
                  {formData.hasRfmTerminal === false && (
                    <Card className="field p-6 border-2 border-green-200 bg-green-50 text-center">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <p className="text-green-800 font-medium">We&apos;ll set you up!</p>
                      <p className="text-green-700 text-sm mt-1">
                        Our team will help you get an RFM Payment Terminal with loyalty built-in.
                      </p>
                    </Card>
                  )}
                </div>
              </div>

              {/* Step 4: Program Preference */}
              <div id="step-4" className={`step ${currentStep === 4 ? "active" : "hidden"}`}>
                <div className="text-center mb-8">
                  <Settings className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Program Preference</h2>
                  <p className="text-gray-600">How much should customers earn back in points?</p>
                </div>
                
                <div className="max-w-md mx-auto">
                  <div className="field grid grid-cols-2 gap-3 mb-6">
                    {earnRules.map((rule) => (
                      <button
                        key={rule.id}
                        type="button"
                        onClick={() => updateFormData("earnRule", rule.id)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          formData.earnRule === rule.id
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                        }`}
                      >
                        <div className="text-lg font-bold">{rule.label}</div>
                        {rule.id !== "custom" && (
                          <div className="text-sm opacity-75">back in points</div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {formData.earnRule === "custom" && (
                    <div className="field">
                      <Input
                        type="number"
                        placeholder="Enter percentage (e.g., 12)"
                        className="text-center text-lg"
                        min="1"
                        max="30"
                      />
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => updateFormData("earnRule", "later")}
                    className={`w-full mt-4 p-3 border-2 border-dashed rounded-lg transition-all duration-200 ${
                      formData.earnRule === "later"
                        ? "border-blue-400 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-600 hover:border-blue-400"
                    }`}
                  >
                    I&apos;ll decide later
                  </button>
                </div>
              </div>

              {/* Step 5: Review & Go */}
              <div id="step-5" className={`step ${currentStep === 5 ? "active" : "hidden"}`}>
                <div className="text-center mb-8">
                  <CheckCircle className="success-check w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="success-headline text-2xl font-bold text-gray-900 mb-2">Review & Go</h2>
                  <p className="text-gray-600">Almost there! Review your information and submit.</p>
                </div>
                
                <div className="w-full">
                  {/* Summary card */}
                  <Card className="field p-6 bg-gray-50 mb-6">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Business</div>
                        <div className="font-semibold">{formData.businessName}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Industry</div>
                        <Badge variant="secondary" className="capitalize">
                          {formData.industry}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-gray-600">Contact</div>
                        <div className="font-semibold">{formData.fullName}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Locations</div>
                        <div className="font-semibold">{formData.locations.length} outlet{formData.locations.length !== 1 ? 's' : ''}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">RFM Terminal</div>
                        <div className="font-semibold">
                          {formData.hasRfmTerminal ? "Already have one" : "Need setup"}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Earn Rate</div>
                        <div className="font-semibold">
                          {formData.earnRule === "later" ? "Will decide later" : `${formData.earnRule}% back`}
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  {/* Terms checkboxes */}
                  <div className="field space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptedTerms}
                        onCheckedChange={(checked) => updateFormData("acceptedTerms", checked)}
                        className="mt-1"
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                        I accept the{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Terms & Conditions
                        </Link>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="privacy"
                        checked={formData.acceptedPrivacy}
                        onCheckedChange={(checked) => updateFormData("acceptedPrivacy", checked)}
                        className="mt-1"
                      />
                      <Label htmlFor="privacy" className="text-sm text-gray-700 leading-relaxed">
                        I accept the{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>
                  
                  {/* Next steps preview */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3">What happens next:</h4>
                    <ul className="next-steps space-y-2 text-sm text-blue-800">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                        Terminal activation within 1-2 business days
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                        Email with document upload link
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                        Staff training materials provided
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                        24/7 support contact details
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
            </CardContent>
            
            {/* Navigation */}
            <div className="px-8 md:px-12 pb-8">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={currentStep === 1 ? "invisible" : ""}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                
                {currentStep < 5 ? (
                  <Button
                    ref={buttonRef}
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="btn-primary bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                    style={{ willChange: "transform" }}
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    ref={buttonRef}
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                    className="btn-primary bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                    size="lg"
                    style={{ willChange: "transform" }}
                  >
                    Submit Application
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Reduced motion toggle */}
        <div className="text-center mt-8">
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            {reducedMotion ? "Enable" : "Disable"} animations
          </button>
        </div>
      </div>
    </div>
  )
}