"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { VehicleCard } from "./vehicle-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedVehicles() {
  const { vehicles } = useStore();

  // Show only available vehicles, prioritize rent listings
  const featuredVehicles = vehicles
    .filter((v) => v.status === "available")
    .slice(0, 6);

  if (featuredVehicles.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Featured Vehicles
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our handpicked selection of premium vehicles available for
              rent or purchase.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-gold-foreground w-fit"
          >
            <Link href="/catalog">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
