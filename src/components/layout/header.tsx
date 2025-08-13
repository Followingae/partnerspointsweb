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
          {navItems.map((item, index) => (
            <Link
              key={`nav-${index}`}
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
          >
            <Link href={primaryCTA.href}>
              {primaryCTA.label}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => {
            console.log('Mobile menu clicked, current state:', mobileMenuOpen)
            setMobileMenuOpen(!mobileMenuOpen)
          }}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "md:hidden fixed left-0 right-0 bottom-0 z-50 transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ 
          top: '64px',
          height: 'calc(100vh - 64px)',
          backgroundColor: '#ffffff'
        }}
      >
        <div className="flex flex-col w-full h-full px-8 py-12">
          {/* Mode Toggle */}
          <div className="mb-12">
            <ModeToggle variant="default" className="w-full h-14 text-lg" />
          </div>
          
          {/* Navigation */}
          <div className="flex-1 space-y-6">
            {navItems.map((item, index) => (
              <Button
                key={`mobile-nav-${index}`}
                variant="ghost"
                asChild
                className="w-full justify-start text-2xl font-semibold"
                style={{ height: '80px', minHeight: '80px' }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center h-full"
                >
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
          
          {/* CTA */}
          <div className="mt-12">
            <Button 
              asChild
              className="w-full text-2xl font-semibold"
              style={{ height: '80px', minHeight: '80px' }}
            >
              <Link 
                href={primaryCTA.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center h-full"
              >
                {primaryCTA.label}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}