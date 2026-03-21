"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { VehicleCard } from "./vehicle-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Vehicle } from "@/lib/data";

export function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedVehicles = async () => {
      try {
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("status", "available")
          .eq("is_pinned", true)
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) {
          console.error("❌ Error loading featured vehicles:", error);
          setVehicles([]);
          return;
        }

        if (!data || data.length === 0) {
          setVehicles([]);
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
          brand: v.brand || undefined,
          body_type: v.body_type || undefined,
          isFeatured: v.is_featured || false,
          isPinned: v.is_pinned || false,
          viewCount: v.view_count || 0,
          inquiries: v.inquiries || 0,
          seasonalPrice: v.seasonal_price || null,
          discount: v.discount || 0,
          discountUntil: v.discount_until || null,
        }));

        setVehicles(transformedVehicles);
      } catch (error) {
        console.error("🔥 Error loading featured vehicles:", error);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedVehicles();
  }, []);

  if (loading || vehicles.length === 0) return null;

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
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
