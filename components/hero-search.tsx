"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Car, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HeroSearch() {
  const router = useRouter();
  const [listingType, setListingType] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (listingType !== "all") params.set("type", listingType);
    if (category !== "all") params.set("category", category);
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-6 border border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              Looking to
            </label>
            <Select value={listingType} onValueChange={setListingType}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Rent or Buy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Rent or Buy</SelectItem>
                <SelectItem value="rent">Rent a Vehicle</SelectItem>
                <SelectItem value="sale">Buy a Vehicle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              Vehicle Type
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="All Vehicles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    All Vehicles
                  </div>
                </SelectItem>
                <SelectItem value="car">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Cars
                  </div>
                </SelectItem>
                <SelectItem value="scooter">
                  <div className="flex items-center gap-2">
                    <Bike className="w-4 h-4" />
                    Scooters
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              size="lg"
              className="w-full md:w-auto h-12 px-8 bg-gold text-gold-foreground hover:bg-gold/90 font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
          <button
            onClick={() => {
              setCategory("car");
              setListingType("sale");
            }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            <Car className="w-4 h-4" />
            Cars for Sale
          </button>
          <span className="text-border">|</span>
          <button
            onClick={() => {
              setCategory("car");
              setListingType("rent");
            }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            <Car className="w-4 h-4" />
            Cars for Rent
          </button>
          <span className="text-border">|</span>
          <button
            onClick={() => {
              setCategory("scooter");
              setListingType("rent");
            }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            <Bike className="w-4 h-4" />
            Scooter for Rent
          </button>
        </div>
      </div>
    </div>
  );
}
