"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Documents } from "@/types"
import { Upload, FileText, Trash2, CheckCircle, Image } from "lucide-react"

interface DocumentsStepProps {
  data: Documents
  onChange: (data: Documents) => void
  errors: Record<string, string>
}

export function DocumentsStep({ data, onChange, errors }: DocumentsStepProps) {
  const tradeLicenseRef = useRef<HTMLInputElement>(null)
  const ownerIdRef = useRef<HTMLInputElement>(null)
  const logoRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (field: keyof Documents, file: File | null) => {
    onChange({ ...data, [field]: file })
  }

  const handleTextChange = (field: keyof Documents, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const FileUploadCard = ({ 
    title, 
    description, 
    file, 
    onUpload, 
    accept, 
    required = false,
    icon: Icon = FileText 
  }: {
    title: string
    description: string
    file: File | undefined
    onUpload: (file: File | null) => void
    accept: string
    required?: boolean
    icon?: any
  }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-frosted-silver/30">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-electric-blue" />
            <h4 className="font-medium text-shadow-black">
              {title} {required && <span className="text-destructive">*</span>}
            </h4>
          </div>
          {file && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpload(null)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        {file ? (
          <div className="flex items-center gap-3 p-3 bg-lime-burst/10 border border-lime-burst/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-lime-burst" />
            <div className="flex-1">
              <p className="text-sm font-medium text-shadow-black">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        ) : (
          <div>
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onUpload(file)
              }}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              className="w-full border-dashed border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload {title}
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Max size: 10MB • Formats: {accept.replace(/\./g, '').toUpperCase()}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Documents & Branding</CardTitle>
        <CardDescription>Upload required documents and add your branding</CardDescription>
      </CardHeader>
      <CardContent>
      <div className="space-y-6">
        {/* Required Documents */}
        <div>
          <h3 className="text-lg font-semibold text-shadow-black mb-4">Required Documents</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FileUploadCard
              title="Trade License"
              description="Copy of your UAE trade license"
              file={data.tradeLicense}
              onUpload={(file) => handleFileUpload('tradeLicense', file)}
              accept=".pdf,.jpg,.jpeg,.png"
              required
              icon={FileText}
            />
            
            <FileUploadCard
              title="Owner ID"
              description="Emirates ID or passport of business owner"
              file={data.ownerId}
              onUpload={(file) => handleFileUpload('ownerId', file)}
              accept=".pdf,.jpg,.jpeg,.png"
              required
              icon={FileText}
            />
          </div>
          {(errors.tradeLicense || errors.ownerId) && (
            <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium mb-1">Required documents missing:</p>
              <ul className="text-xs text-destructive space-y-1">
                {errors.tradeLicense && <li>• Trade License</li>}
                {errors.ownerId && <li>• Owner ID</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Optional Branding */}
        <div>
          <h3 className="text-lg font-semibold text-shadow-black mb-4">Branding (Optional)</h3>
          <div className="space-y-6">
            {/* Logo Upload */}
            <FileUploadCard
              title="Business Logo"
              description="Your logo for receipts and customer communications"
              file={data.logo}
              onUpload={(file) => handleFileUpload('logo', file)}
              accept=".jpg,.jpeg,.png,.svg"
              icon={Image}
            />

            {/* Brand Notes */}
            <div className="space-y-2">
              <Label htmlFor="brandNotes" className="text-sm font-medium">
                Brand Notes
              </Label>
              <Textarea
                id="brandNotes"
                value={data.brandNotes || ""}
                onChange={(e) => handleTextChange('brandNotes', e.target.value)}
                placeholder="Any specific brand guidelines, colors, or messaging preferences for customer communications..."
                rows={4}
                className={errors.brandNotes ? "border-destructive" : ""}
              />
              {errors.brandNotes && (
                <p className="text-xs text-destructive">{errors.brandNotes}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Help us customize receipts and communications to match your brand
              </p>
            </div>
          </div>
        </div>

        {/* Information Note */}
        <div className="p-4 bg-electric-blue/5 border border-electric-blue/20 rounded-lg">
          <h4 className="text-sm font-semibold text-electric-blue mb-2">Document Security</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• All documents are encrypted and stored securely</li>
            <li>• Used only for verification and compliance purposes</li>
            <li>• Never shared with third parties</li>
            <li>• You can update these documents anytime in your dashboard</li>
          </ul>
        </div>
      </div>
      </CardContent>
    </Card>
  )
}