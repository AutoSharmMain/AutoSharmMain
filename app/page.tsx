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
      <section className="relative w-full pt-20 md:pt-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundPosition: "center bottom",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/25 dark:from-black/65 dark:via-black/55 dark:to-transparent" />
        </div>

        <div className="relative w-full px-4 md:px-6 py-20 md:py-40 lg:py-48">
          <div className="flex flex-col items-center">
            <div className="text-center text-white dark:text-white mb-12 md:mb-16 max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance leading-tight">
                Premium Vehicles for Your{" "}
                <span className="text-gold">Red Sea Adventure</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white dark:text-white/90 max-w-3xl mx-auto text-pretty leading-relaxed">
                Explore Sharm El Sheikh in style. Choose from our curated
                collection of luxury cars and scooters available for
                rent or purchase.
              </p>
            </div>

            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Pinned Vehicles */}
      <PinnedVehicles />

      {/* Why Choose Us */}
      <section className="relative py-16 md:py-24 bg-primary text-primary-foreground overflow-hidden">
        {/* Blurred Background Texture */}
        <div
          className="absolute inset-0 opacity-5 blur-3xl"
          style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 800%22><defs><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.02%22 numOctaves=%224%22 result=%22noise%22 seed=%221%22 /></filter></defs><rect width=%221200%22 height=%22800%22 fill=%22%23d4af37%22 filter=%22url(%23noise)%22 /></svg>')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative container mx-auto px-4 md:px-6">
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
            {/* Card 1 - Premium Selection */}
            <div className="group relative rounded-2xl p-6 md:p-8 border border-gold/30 hover:border-gold/60 transition-all duration-300">
              {/* Animated Glow Background */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/0 via-gold/15 to-gold/0 premium-card-glow"
                style={{
                  backgroundPosition: "0% 50%",
                }}
              />
              {/* Card Content with background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/40 transition-all">
                  <Car className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gold">
                  Premium Selection
                </h3>
                <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                  From luxury sedans to convenient scooters, our diverse fleet
                  caters to every preference and budget.
                </p>
              </div>
            </div>

            {/* Card 2 - Fully Insured */}
            <div className="group relative rounded-2xl p-6 md:p-8 border border-gold/30 hover:border-gold/60 transition-all duration-300">
              {/* Animated Glow Background */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/0 via-gold/15 to-gold/0 premium-card-glow"
                style={{
                  backgroundPosition: "0% 50%",
                }}
              />
              {/* Card Content with background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/40 transition-all">
                  <Shield className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gold">
                  Fully Insured
                </h3>
                <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                  All our vehicles come with comprehensive insurance coverage for
                  your complete peace of mind.
                </p>
              </div>
            </div>

            {/* Card 3 - Flexible Rentals */}
            <div className="group relative rounded-2xl p-6 md:p-8 border border-gold/30 hover:border-gold/60 transition-all duration-300">
              {/* Animated Glow Background */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/0 via-gold/15 to-gold/0 premium-card-glow"
                style={{
                  backgroundPosition: "0% 50%",
                }}
              />
              {/* Card Content with background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/40 transition-all">
                  <Clock className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gold">
                  Flexible Rentals
                </h3>
                <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                  Daily, weekly, or monthly rentals available with free delivery
                  to your hotel or airport.
                </p>
              </div>
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
