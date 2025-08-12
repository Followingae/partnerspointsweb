"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMode } from "@/context/mode-context";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const industries = [
  { label: "Retail", href: "/business/retail" },
  { label: "Restaurants", href: "/business/restaurants" },
  { label: "Clinics", href: "/business/clinics" },
  { label: "Supermarkets", href: "/business/supermarkets" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mode, setMode } = useMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-300 rounded-xl mt-4 ${
          isScrolled 
            ? 'bg-white shadow-sm' 
            : 'bg-transparent'
        }`}>
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation - Shadcn NavigationMenu */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" className={cn(navigationMenuTriggerStyle(), "text-muted-foreground hover:text-foreground")}>
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" className={cn(navigationMenuTriggerStyle(), "text-muted-foreground hover:text-foreground")}>
                    About
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
                    Industries
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {industries.map((industry) => (
                        <Link
                          key={industry.href}
                          href={industry.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {industry.label}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Solutions tailored for {industry.label.toLowerCase()}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/pricing" className={cn(navigationMenuTriggerStyle(), "text-muted-foreground hover:text-foreground")}>
                    Pricing
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Desktop Mode Toggle */}
            <div className="hidden md:flex items-center">
              <Button 
                variant="outline" 
                className="rounded-full px-4"
                onClick={() => setMode(mode === "businesses" ? "customers" : "businesses")}
              >
                {mode === "businesses" ? "For Customers" : "For Businesses"}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile Menu Overlay */}
          <div 
            className={cn(
              "md:hidden fixed inset-0 z-50 transition-transform duration-300",
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
            style={{ 
              top: '80px',
              height: 'calc(100vh - 80px)',
              backgroundColor: '#ffffff'
            }}
          >
            <div className="flex flex-col w-full h-full px-8 py-12">
              {/* Mobile Navigation */}
              <nav className="flex-1 space-y-0">
                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-start text-2xl font-semibold"
                  style={{ height: '80px', minHeight: '80px' }}
                >
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center h-full"
                  >
                    Home
                  </Link>
                </Button>
                <Separator />

                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-start text-2xl font-semibold"
                  style={{ height: '80px', minHeight: '80px' }}
                >
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center h-full"
                  >
                    About
                  </Link>
                </Button>
                <Separator />
                
                {/* Mobile Industries - Same size as other nav items */}
                {industries.map((industry, index) => (
                  <div key={industry.href}>
                    <Button
                      variant="ghost"
                      asChild
                      className="w-full justify-start text-2xl font-semibold"
                      style={{ height: '80px', minHeight: '80px' }}
                    >
                      <Link
                        href={industry.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center h-full"
                      >
                        {industry.label}
                      </Link>
                    </Button>
                    <Separator />
                  </div>
                ))}

                <Button
                  variant="ghost"
                  asChild
                  className="w-full justify-start text-2xl font-semibold"
                  style={{ height: '80px', minHeight: '80px' }}
                >
                  <Link
                    href="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center h-full"
                  >
                    Pricing
                  </Link>
                </Button>
              </nav>

              {/* Mobile Mode Toggle */}
              <div className="mt-8">
                <Button 
                  variant="outline" 
                  className="w-full text-xl font-semibold"
                  style={{ height: '80px', minHeight: '80px' }}
                  onClick={() => setMode(mode === "businesses" ? "customers" : "businesses")}
                >
                  {mode === "businesses" ? "For Customers" : "For Businesses"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}