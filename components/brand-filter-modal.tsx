"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Brand {
  id: number;
  name: string;
  logo_url: string | null;
  country: string | null;
}

interface BrandFilterProps {
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
}

export function BrandFilterModal({ selectedBrand, onBrandChange }: BrandFilterProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data, error } = await supabase
          .from("car_brands")
          .select("id, name, logo_url, country")
          .eq("is_active", true)
          .order("display_order", { ascending: true })
          .limit(500);

        if (!error && data) {
          setBrands(data);
        }
      } catch (error) {
        console.error("Failed to load brands:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      loadBrands();
    }
  }, [isOpen]);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectBrand = (brandName: string) => {
    onBrandChange(brandName);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-[140px] h-11 border-2 hover:border-gold/50 hover:text-gold transition-colors"
        >
          {selectedBrand || "Brand"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Select Brand</span>
            {selectedBrand && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onBrandChange("all");
                  setIsOpen(false);
                }}
              >
                Clear
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Brand Grid */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading brands...
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No brands found
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {filteredBrands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleSelectBrand(brand.name)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all hover:border-gold hover:shadow-lg ${
                  selectedBrand === brand.name
                    ? "border-gold bg-gold/10"
                    : "border-border hover:border-gold/50"
                }`}
              >
                {brand.logo_url && (
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-medium line-clamp-2">
                    {brand.name}
                  </p>
                  {brand.country && (
                    <p className="text-[10px] text-muted-foreground">
                      {brand.country}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
