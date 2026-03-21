import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden bg-card flex items-center justify-center border-2 border-gold/30">
                <Image
                  src="/logo.png"
                  alt="AutoSharm Logo"
                  fill
                  className="object-contain"
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
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-4">
              Your trusted partner for premium vehicle rentals and sales in
              Sharm El Sheikh. Explore the Red Sea coast in style.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/autosharm.eg?igsh=OXhndGRqb3UwMGp5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 text-gold hover:bg-gold hover:text-gold-foreground transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/188NggBcnw/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold/20 text-gold hover:bg-gold hover:text-gold-foreground transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
              >
                Home
              </Link>
              <Link
                href="/catalog?type=sale&category=car"
                className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
              >
                Cars for Sale
              </Link>
              <Link
                href="/catalog?type=rent&category=car"
                className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
              >
                Cars for Rent
              </Link>
              <Link
                href="/catalog?type=rent&category=scooter"
                className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
              >
                Scooter for Rent
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-gold mb-4">Contact</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/aTrk1dehDZfXVGga8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                >
                  Egypt sharm el sheikh south sinai
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gold shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a
                  href="https://wa.me/201055777826"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                >
                  +201055777826
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a
                  href="mailto:sharmrental@gmail.com"
                  className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                >
                  sharmrental@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            {new Date().getFullYear()} AutoSharm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
