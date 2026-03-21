"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { VehicleCard } from "./vehicle-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export function PinnedVehicles() {
  const { vehicles } = useStore();

  // Show only pinned vehicles that are available
  const pinnedVehicles = vehicles
    .filter((v) => v.isPinned && v.status === "available")
    .slice(0, 6);

  if (pinnedVehicles.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-accent/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Premium Selection
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Pinned on Home
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Our top-rated vehicles picked specially for you. Check these premium
              options first!
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground w-fit"
          >
            <Link href="/catalog">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pinnedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
