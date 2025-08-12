"use client"

import { Logo } from "@/components/brand/logo"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "@/components/ui/button"
import { useMode } from "@/context/mode-context"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const businessNav = [
  { label: "Calculator", href: "/calculator" },
  { label: "Pricing", href: "/pricing" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "FAQ", href: "/faq" },
]

const customerNav = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Where to earn", href: "/merchants" },
  { label: "FAQ", href: "/faq" },
]

export function Header() {
  const { mode } = useMode()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navItems = mode === "businesses" ? businessNav : customerNav
  const primaryCTA = mode === "businesses" 
    ? { label: "Start Onboarding", href: "/onboarding" }
    : { label: "Find Merchants", href: "/merchants" }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle variant="pills" />
          <Button 
            asChild
            className="bg-electric-blue hover:bg-electric-blue/90 text-white"
          >
            <Link href={primaryCTA.href}>
              {primaryCTA.label}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mode Toggle */}
            <ModeToggle variant="default" className="w-full" />
            
            {/* Navigation */}
            <nav className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* CTA */}
            <Button 
              asChild
              className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white"
            >
              <Link href={primaryCTA.href}>
                {primaryCTA.label}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}