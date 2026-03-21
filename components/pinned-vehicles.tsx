"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VehicleCard } from "./vehicle-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Vehicle } from "@/lib/data";

export function PinnedVehicles() {
  const [pinnedVehicles, setPinnedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPinnedVehicles = async () => {
      try {
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("is_pinned", true)
          .eq("status", "available")
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) {
          console.error("❌ Error loading pinned vehicles:", error);
          setPinnedVehicles([]);
          return;
        }

        if (!data || data.length === 0) {
          setPinnedVehicles([]);
          return;
        }

        // Transform Supabase data to Vehicle format
        const transformedVehicles: Vehicle[] = data.map((v: any) => ({
          id: v.id,
          name: v.name,
          category: v.category || "car",
          listingType: v.listing_type || "rent",
          price: parseFloat(v.price) || 0,
          currency: v.currency || "USD",
          rentalPeriod: v.price_period || "day",
          status: v.status || "available",
          image: v.image || "",
          images: v.images || [],
          reviews: v.reviews || [],
          specs: v.specs || {},
          description: v.description || "",
          isFeatured: v.is_featured || false,
          isPinned: v.is_pinned || false,
          viewCount: v.view_count || 0,
          inquiries: v.inquiries || 0,
          seasonalPrice: v.seasonal_price || null,
          discount: v.discount || 0,
          discountUntil: v.discount_until || null,
        }));

        setPinnedVehicles(transformedVehicles);
      } catch (error) {
        console.error("🔥 Error loading pinned vehicles:", error);
        setPinnedVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    loadPinnedVehicles();
  }, []);

  if (loading || pinnedVehicles.length === 0) return null;

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
