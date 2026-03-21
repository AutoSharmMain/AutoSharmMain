"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Cars for Sale", href: "/catalog?type=sale&category=car" },
  { label: "Cars for Rent", href: "/catalog?type=rent&category=car" },
  { label: "Bikes & Scooters", href: "/catalog?category=bikes" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Area with Placeholder */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden bg-card flex items-center justify-center border-2 border-gold/30">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoautosharm-zTR2GiuqqtlDQmiyiSnDy9edrXLJqV.jpeg"
                alt="AutoSharm Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base md:text-lg leading-tight text-primary-foreground">
                AUTO SHARM
              </span>
              <span className="text-[10px] md:text-xs text-gold font-medium tracking-wide">
                SALES & RENTALS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href || 
                  (item.href !== "/" && pathname?.startsWith(item.href.split("?")[0]))
                    ? "text-gold"
                    : "text-primary-foreground/80 hover:text-gold"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              className="bg-gold text-gold-foreground hover:bg-gold/90"
            >
              <a
                href="https://wa.me/201055777826"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-foreground/10">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-gold"
                      : "text-primary-foreground/80 hover:text-gold"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Button
                asChild
                className="bg-gold text-gold-foreground hover:bg-gold/90 w-full"
              >
                <a
                  href="https://wa.me/201055777826"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Us
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
