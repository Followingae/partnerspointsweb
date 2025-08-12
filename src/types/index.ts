export interface BusinessProfile {
  legalName: string
  tradeLicenseNo: string
  trn?: string
  industry: string
  averageTicketSize: number
}

export interface ContactInfo {
  fullName: string
  workEmail: string
  mobile: string
}

export interface Location {
  id: string
  name: string
  city: string
  contactPhone: string
}

export interface AwardRule {
  earnBackPercentage: number
  minimumSpend?: number
  exclusions?: string
}

export interface Documents {
  tradeLicense?: File
  ownerId?: File
  logo?: File
  brandNotes?: string
}

export interface OnboardingData {
  businessProfile: BusinessProfile
  contact: ContactInfo
  locations: Location[]
  awardRule: AwardRule
  documents: Documents
  termsAccepted: boolean
  privacyAccepted: boolean
  marketingOptIn: boolean
}

export interface CalculatorInputs {
  monthlySales: number
  awardRule: number
  redemptionRate: number
  serviceFeeRate: number
  discountRate?: number
}

export interface CalculatorResults {
  serviceFee: number
  feeBase: number
  awardedValue: number
  discountComparison: number
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: "business" | "customer" | "general"
}

export type Mode = "businesses" | "customers"