"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { BrandCard } from "@/components/ui/brand-card"
import { Location } from "@/types"
import { Plus, Trash2, MapPin } from "lucide-react"

interface LocationsStepProps {
  data: Location[]
  onChange: (data: Location[]) => void
  errors: Record<string, string>
}

export function LocationsStep({ data, onChange, errors }: LocationsStepProps) {
  const addLocation = () => {
    const newLocation: Location = {
      id: `location-${Date.now()}`,
      name: "",
      city: "",
      contactPhone: ""
    }
    onChange([...data, newLocation])
  }

  const removeLocation = (id: string) => {
    if (data.length > 1) {
      onChange(data.filter(location => location.id !== id))
    }
  }

  const updateLocation = (id: string, field: keyof Omit<Location, 'id'>, value: string) => {
    onChange(data.map(location => 
      location.id === id ? { ...location, [field]: value } : location
    ))
  }

  // Ensure at least one location exists
  if (data.length === 0) {
    onChange([{
      id: `location-${Date.now()}`,
      name: "",
      city: "",
      contactPhone: ""
    }])
  }

  return (
    <BrandCard 
      title="Business Locations"
      description="Add all outlets where you want to offer Partners Points"
      variant="elevated"
      size="lg"
    >
      <div className="space-y-6">
        {data.map((location, index) => (
          <div key={location.id} className="border border-gray-200 rounded-lg p-4 bg-frosted-silver/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-shadow-black flex items-center gap-2">
                <MapPin className="w-4 h-4 text-electric-blue" />
                Location {index + 1}
              </h4>
              {data.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLocation(location.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Location Name */}
              <div className="space-y-2">
                <Label htmlFor={`name-${location.id}`} className="text-sm font-medium">
                  Location Name *
                </Label>
                <Input
                  id={`name-${location.id}`}
                  value={location.name}
                  onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                  placeholder="e.g., Dubai Mall Branch"
                  className={errors[`location-${index}-name`] ? "border-destructive" : ""}
                />
                {errors[`location-${index}-name`] && (
                  <p className="text-xs text-destructive">{errors[`location-${index}-name`]}</p>
                )}
              </div>

              {/* City/Area */}
              <div className="space-y-2">
                <Label htmlFor={`city-${location.id}`} className="text-sm font-medium">
                  City/Area *
                </Label>
                <Input
                  id={`city-${location.id}`}
                  value={location.city}
                  onChange={(e) => updateLocation(location.id, 'city', e.target.value)}
                  placeholder="e.g., Dubai"
                  className={errors[`location-${index}-city`] ? "border-destructive" : ""}
                />
                {errors[`location-${index}-city`] && (
                  <p className="text-xs text-destructive">{errors[`location-${index}-city`]}</p>
                )}
              </div>

              {/* Contact Phone */}
              <div className="space-y-2">
                <Label htmlFor={`phone-${location.id}`} className="text-sm font-medium">
                  Contact Phone *
                </Label>
                <Input
                  id={`phone-${location.id}`}
                  type="tel"
                  value={location.contactPhone}
                  onChange={(e) => updateLocation(location.id, 'contactPhone', e.target.value)}
                  placeholder="e.g., 04-123-4567"
                  className={errors[`location-${index}-phone`] ? "border-destructive" : ""}
                />
                {errors[`location-${index}-phone`] && (
                  <p className="text-xs text-destructive">{errors[`location-${index}-phone`]}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add Location Button */}
        <Button
          type="button"
          variant="outline"
          onClick={addLocation}
          className="w-full border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Location
        </Button>

        {/* Info Note */}
        <div className="p-4 bg-electric-blue/5 border border-electric-blue/20 rounded-lg">
          <h4 className="text-sm font-semibold text-electric-blue mb-2">Location Setup</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Each location can have different reward rules if needed</li>
            <li>• Customers can earn and redeem points at any of your locations</li>
            <li>• You'll get separate analytics for each location</li>
            <li>• Additional locations can be added later through your dashboard</li>
          </ul>
        </div>
      </div>
    </BrandCard>
  )
}