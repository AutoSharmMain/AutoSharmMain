"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Brand {
  id: number;
  name: string | null;
  logo_url: string | null;
  country: string | null;
}

interface BrandSelectorProps {
  value: string;
  onChange: (brandName: string) => void;
}

export function BrandSelector({ value, onChange }: BrandSelectorProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch brands from Supabase
    const loadBrands = async () => {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data, error: fetchError } = await supabase
          .from("car_brands")
          .select("id, name, logo_url, country")
          .order("display_order", { ascending: true })
          .limit(500);

        if (fetchError) {
          console.error("❌ Error fetching brands:", fetchError);
          setError("Failed to load brands");
          setBrands([]);
        } else if (!data || data.length === 0) {
          console.warn("⚠️ No brands found in car_brands table");
          setError("No brands available");
          setBrands([]);
        } else {
          console.log("✅ Brands loaded successfully:", data.length, "brands");
          setBrands(data);
          setError(null);
        }
      } catch (error) {
        console.error("🔥 Failed to load brands:", error);
        setError("Error loading brands");
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Brand</label>
      <div className="space-y-2">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Brand selector dropdown */}
        <Select 
          value={value || "none"} 
          onValueChange={(val) => onChange(val === "none" ? "" : val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent className="max-h-48">
            <SelectItem value="none">None</SelectItem>
            {loading ? (
              <SelectItem value="loading" disabled>Loading brands...</SelectItem>
            ) : error ? (
              <SelectItem value="error" disabled>Unable to load brands</SelectItem>
            ) : filteredBrands.length === 0 ? (
              <SelectItem value="empty" disabled>No brands found</SelectItem>
            ) : (
              filteredBrands.map((brand) => (
                <SelectItem key={brand.id} value={brand.name || "unknown"}>
                  <div className="flex items-center gap-2">
                    {brand.logo_url && (
                      <img
                        src={brand.logo_url}
                        alt={brand.name || "Brand"}
                        className="w-4 h-4 object-contain"
                      />
                    )}
                    <span>{brand.name || "Unknown Brand"}</span>
                    {brand.country && (
                      <span className="text-xs text-muted-foreground">({brand.country})</span>
                    )}
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        {/* Display selected brand with option to clear */}
        {value && (
          <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
            <span className="font-medium text-sm">{value}</span>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
