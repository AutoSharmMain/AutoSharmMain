"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSearch } from "@/components/hero-search";
import { FeaturedVehicles } from "@/components/featured-vehicles";
import { NewsSection } from "@/components/news-section";
import { StoreProvider } from "@/lib/store";
import { Car, Shield, Clock } from "lucide-react";

function HomeContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-32 lg:py-40">
          <div className="text-center text-primary-foreground mb-10 md:mb-14">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Premium Vehicles for Your{" "}
              <span className="text-gold">Red Sea Adventure</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto text-pretty">
              Explore Sharm El Sheikh in style. Choose from our curated
              collection of luxury cars and scooters available for
              rent or purchase.
            </p>
          </div>

          <HeroSearch />
        </div>
      </section>

      {/* Featured Vehicles */}
      <FeaturedVehicles />

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Why Choose <span className="text-gold">AutoSharm</span>
            </h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              We provide an unmatched experience for all your vehicle needs in
              Sharm El Sheikh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-foreground/5 rounded-2xl p-8 border border-primary-foreground/10">
              <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6">
                <Car className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gold">
                Premium Selection
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                From luxury sedans to convenient scooters, our diverse fleet
                caters to every preference and budget.
              </p>
            </div>

            <div className="bg-primary-foreground/5 rounded-2xl p-8 border border-primary-foreground/10">
              <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gold">
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
              <h3 className="text-xl font-semibold mb-3 text-gold">
                Flexible Rentals
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
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
