"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BrandCard } from "@/components/ui/brand-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { AwardRule } from "@/types"
import { formatPercentage, formatCurrency } from "@/lib/utils"
import { Gift, AlertCircle } from "lucide-react"

interface AwardRuleStepProps {
  data: AwardRule
  onChange: (data: AwardRule) => void
  errors: Record<string, string>
  averageTicketSize?: number
}

export function AwardRuleStep({ data, onChange, errors, averageTicketSize = 100 }: AwardRuleStepProps) {
  const handleChange = (field: keyof AwardRule, value: string | number) => {
    onChange({ ...data, [field]: value })
  }

  // Calculate example rewards
  const exampleEarning = (averageTicketSize * data.earnBackPercentage) / 100
  const recommendedRange = {
    min: Math.max(5, Math.floor((5 / 100) * averageTicketSize * 10) / 10),
    max: Math.max(15, Math.floor((15 / 100) * averageTicketSize * 10) / 10)
  }

  return (
    <BrandCard 
      title="Award Rule Setup"
      description="Configure how customers earn points at your business"
      variant="elevated"
      size="lg"
    >
      <div className="space-y-6">
        {/* Earn Back Percentage */}
        <div className="space-y-2">
          <Label htmlFor="earnBackPercentage" className="text-sm font-medium flex items-center gap-2">
            <Gift className="w-4 h-4 text-electric-blue" />
            Earn-back Percentage *
          </Label>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Input
                id="earnBackPercentage"
                type="number"
                min="1"
                max="20"
                step="0.5"
                value={data.earnBackPercentage || ""}
                onChange={(e) => handleChange('earnBackPercentage', parseFloat(e.target.value) || 0)}
                placeholder="e.g., 10"
                className={errors.earnBackPercentage ? "border-destructive" : ""}
              />
              {errors.earnBackPercentage && (
                <p className="text-xs text-destructive mt-1">{errors.earnBackPercentage}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Recommended: 5-15% based on your margins
              </p>
            </div>
            
            {/* Live Preview */}
            {data.earnBackPercentage > 0 && (
              <div className="bg-electric-blue/5 border border-electric-blue/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-electric-blue mb-2">Example</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Customer spends: {formatCurrency(averageTicketSize)}</div>
                  <div>Points earned: <span className="text-electric-blue font-semibold">{exampleEarning.toFixed(0)} points</span></div>
                  <div>Value: {formatPercentage(data.earnBackPercentage)} back</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Minimum Spend (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="minimumSpend" className="text-sm font-medium">
            Minimum Spend Threshold (Optional)
          </Label>
          <Input
            id="minimumSpend"
            type="number"
            min="0"
            value={data.minimumSpend || ""}
            onChange={(e) => handleChange('minimumSpend', parseFloat(e.target.value) || 0)}
            placeholder="e.g., 50"
            className={errors.minimumSpend ? "border-destructive" : ""}
          />
          {errors.minimumSpend && (
            <p className="text-xs text-destructive">{errors.minimumSpend}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Minimum amount customers must spend to earn points (leave empty for no minimum)
          </p>
        </div>

        {/* Exclusions (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="exclusions" className="text-sm font-medium">
            Exclusions (Optional)
          </Label>
          <Textarea
            id="exclusions"
            value={data.exclusions || ""}
            onChange={(e) => handleChange('exclusions', e.target.value)}
            placeholder="e.g., Gift cards, promotional items, delivery fees"
            rows={3}
            className={errors.exclusions ? "border-destructive" : ""}
          />
          {errors.exclusions && (
            <p className="text-xs text-destructive">{errors.exclusions}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Items or services that don't earn points (optional)
          </p>
        </div>

        {/* Guidance */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Best Practices */}
          <div className="p-4 bg-lime-burst/5 border border-lime-burst/20 rounded-lg">
            <h4 className="text-sm font-semibold text-lime-burst mb-2 flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Best Practices
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Start with 8-12% for most businesses</li>
              <li>• Higher margins = higher percentages possible</li>
              <li>• Consider customer frequency in your decision</li>
              <li>• You can adjust these rules anytime later</li>
            </ul>
          </div>

          {/* Warnings */}
          <div className="p-4 bg-tangerine-glow/5 border border-tangerine-glow/20 rounded-lg">
            <h4 className="text-sm font-semibold text-tangerine-glow mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Important Notes
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• You only pay fees when points are redeemed</li>
              <li>• Typical redemption rates: 30-50% of earnings</li>
              <li>• Higher percentages drive more engagement</li>
              <li>• Consider seasonal adjustments for promotions</li>
            </ul>
          </div>
        </div>

        {/* Cost Preview */}
        {data.earnBackPercentage > 0 && (
          <div className="p-4 bg-electric-blue/5 border border-electric-blue/20 rounded-lg">
            <h4 className="text-sm font-semibold text-electric-blue mb-3">Estimated Monthly Impact</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-electric-blue">
                  <AnimatedCounter value={recommendedRange.min} suffix=" pts" />
                </div>
                <p className="text-xs text-muted-foreground">Min per visit</p>
              </div>
              <div>
                <div className="text-lg font-bold text-electric-blue">
                  <AnimatedCounter value={Math.round(exampleEarning)} suffix=" pts" />
                </div>
                <p className="text-xs text-muted-foreground">Avg per visit</p>
              </div>
              <div>
                <div className="text-lg font-bold text-electric-blue">
                  <AnimatedCounter value={recommendedRange.max} suffix=" pts" />
                </div>
                <p className="text-xs text-muted-foreground">Max per visit</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </BrandCard>
  )
}