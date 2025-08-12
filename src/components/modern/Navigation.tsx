"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMode } from "@/context/mode-context";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Industries",
    href: "#",
    submenu: [
      { label: "Retail", href: "/business/retail" },
      { label: "Restaurants", href: "/business/restaurants" },
      { label: "Clinics", href: "/business/clinics" },
      { label: "Supermarkets", href: "/business/supermarkets" },
    ],
  },
  { label: "Calculator", href: "/calculator" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mode, setMode } = useMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (label: string) => {
    setDropdownOpen(dropdownOpen === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-40">
      {isScrolled && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-md border-b border-black/10" />
      )}
      <div className="relative">
        <div className="mx-auto max-w-page px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl">Partners Points</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          {navItems.map((item) => (
            <div key={item.label} className="relative" ref={item.submenu ? dropdownRef : undefined}>
              {item.submenu ? (
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="flex items-center gap-1 hover:underline underline-offset-4 transition-colors font-medium"
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      dropdownOpen === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="hover:underline underline-offset-4 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown Menu */}
              {item.submenu && dropdownOpen === item.label && (
                <Card className="absolute top-full left-0 mt-2 w-56 p-0 shadow-lg overflow-hidden">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-4 py-3 text-sm hover:bg-muted transition-colors"
                      onClick={() => setDropdownOpen(null)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </Card>
              )}
            </div>
          ))}
        </nav>
        
        {/* Mode Toggle Buttons */}
        <div className="hidden md:flex items-center gap-2 mr-4">
          <Button
            variant={mode === "businesses" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("businesses")}
            className="text-xs px-3 py-1 h-8"
          >
            Business
          </Button>
          <Button
            variant={mode === "customers" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("customers")}
            className="text-xs px-3 py-1 h-8"
          >
            Customers
          </Button>
        </div>
        </div>
      </div>
    </header>
  );
}