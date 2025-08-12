import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "AED"): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value}%`
}

// Calculator business logic as per requirements
export function calculateServiceFee(
  monthlySales: number,
  redemptionRate: number,
  serviceFeeRate: number
): {
  feeBase: number
  serviceFee: number
  awardedValue: number
  discountComparison: number
} {
  const redemptionDecimal = redemptionRate / 100
  const serviceFeeDecimal = serviceFeeRate / 100
  
  const feeBase = monthlySales * redemptionDecimal
  const serviceFee = feeBase * serviceFeeDecimal
  
  // For comparison with discount
  const discountComparison = monthlySales * (serviceFeeDecimal) // If applied to all sales
  
  // Awarded value (for context, not charged)
  const awardedValue = monthlySales * redemptionDecimal
  
  return {
    feeBase,
    serviceFee,
    awardedValue,
    discountComparison,
  }
}

// Preset example from requirements: AED 100,000 sales, 10% award, 40% redemption, 2% fee = AED 800
export const CALCULATOR_PRESET = {
  monthlySales: 100000,
  awardRule: 10,
  redemptionRate: 40,
  serviceFeeRate: 2,
  discountRate: 5
}