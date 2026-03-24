"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSearch } from "@/components/hero-search";
import { PinnedVehicles } from "@/components/pinned-vehicles";
import { NewsSection } from "@/components/news-section";
import { StoreProvider } from "@/lib/store";
import { Car, Shield, Clock } from "lucide-react";

function HomeContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-28">
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/85 to-primary/90" />
        </div>

        <div className="relative container mx-auto px-4 md:px-6 py-20 md:py-40 lg:py-48">
          <div className="text-center text-primary-foreground mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance leading-tight">
              Premium Vehicles for Your{" "}
              <span className="text-gold">Red Sea Adventure</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto text-pretty leading-relaxed">
              Explore Sharm El Sheikh in style. Choose from our curated
              collection of luxury cars and scooters available for
              rent or purchase.
            </p>
          </div>

          <HeroSearch />
        </div>
      </section>

      {/* Pinned Vehicles */}
      <PinnedVehicles />

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance leading-tight">
              Why Choose <span className="text-gold">AutoSharm</span>
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
              We provide an unmatched experience for all your vehicle needs in
              Sharm El Sheikh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-gold/15 to-transparent rounded-2xl p-6 md:p-8 border border-gold/20 hover:border-gold/40 transition-all">
              <div className="w-14 h-14 rounded-xl bg-gold/30 flex items-center justify-center mb-6">
                <Car className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gold">
                Premium Selection
              </h3>
              <p className="text-sm md:text-base text-primary-foreground/70 leading-relaxed">
                From luxury sedans to convenient scooters, our diverse fleet
                caters to every preference and budget.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gold/15 to-transparent rounded-2xl p-6 md:p-8 border border-gold/20 hover:border-gold/40 transition-all">
              <div className="w-14 h-14 rounded-xl bg-gold/30 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gold">
                Fully Insured
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                All our vehicles come with comprehensive insurance coverage for
                your complete peace of mind.
              </p>
            </div>

            <div className="bg-primary-foreground/5 rounded-2xl p-8 border border-primary-foreground/10">
              <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gold">
                Flexible Rentals
              </h3>
              <p className="text-sm md:text-base text-primary-foreground/70 leading-relaxed">
                Daily, weekly, or monthly rentals available with free delivery
                to your hotel or airport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <HomeContent />
    </StoreProvider>
  );
}
