"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Glass, GlassButton } from "@/components/ui/glass";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Industries",
    href: "#",
    submenu: [
      { label: "Retail", href: "/business/retail" },
      { label: "Hospitality", href: "/business/hospitality" },
      { label: "Healthcare", href: "/business/healthcare" },
      { label: "Financial Services", href: "/business/financial" },
    ],
  },
  { label: "Calculator", href: "/calculator" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <Glass
        className="mx-auto max-w-page transition-all duration-300"
        variant="light"
        blur="xl"
      >
        <div className="px-6">
          <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/Main-BnW.png" 
              alt="Partners Points" 
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative" ref={item.submenu ? dropdownRef : undefined}>
                {item.submenu ? (
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center space-x-1 text-inkMuted hover:text-inkPrimary transition-colors duration-200 font-medium"
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
                    className="text-inkMuted hover:text-inkPrimary transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.submenu && dropdownOpen === item.label && (
                  <Glass className="absolute top-full left-0 mt-2 w-56 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200" variant="light">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-3 text-sm text-inkMuted hover:text-inkPrimary hover:bg-surfaceSecondary transition-colors duration-150"
                        onClick={() => setDropdownOpen(null)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </Glass>
                )}
              </div>
            ))}
          </div>


          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-inkMuted hover:text-inkPrimary">
            <div className="w-5 h-5 flex flex-col justify-center items-center">
              <span className="block w-full h-0.5 bg-current mb-1"></span>
              <span className="block w-full h-0.5 bg-current mb-1"></span>
              <span className="block w-full h-0.5 bg-current"></span>
            </div>
          </button>
          </div>
        </div>
      </Glass>
    </div>
  );
}