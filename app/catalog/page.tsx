"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { VehicleCard } from "@/components/vehicle-card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import type { Vehicle } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Car, Bike, Search, X } from "lucide-react";

function CatalogFilters({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  clearFilters,
  hasFilters,
}: {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  typeFilter: string;
  setTypeFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  clearFilters: () => void;
  hasFilters: boolean;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[140px] h-11">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="car">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4" /> Cars
                </div>
              </SelectItem>
              <SelectItem value="bikes">
                <div className="flex items-center gap-2">
                  <Bike className="w-4 h-4" /> Bikes & Scooters
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[130px] h-11">
              <SelectValue placeholder="Listing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Rent & Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[130px] h-11">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-11 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // Get filters from URL params
  const urlCategory = searchParams.get("category") || "all";
  const urlType = searchParams.get("type") || "all";

  // Initialize filters from URL params
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(urlCategory);
  const [typeFilter, setTypeFilter] = useState(urlType);
  const [statusFilter, setStatusFilter] = useState("all");

  // Load vehicles from Supabase
  useEffect(() => {
    loadVehicles();
    
    // Set up polling to stay in sync with Supabase (every 3 seconds)
    const interval = setInterval(() => {
      loadVehicles();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const loadVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        console.log("✅ No vehicles found in Supabase");
        setVehicles([]);
        return;
      }

      const transformedData = data.map((v: any): Vehicle => {
        // Normalize all values to lowercase for consistent filtering
        const category = String(v.category || "car").toLowerCase().trim();
        const listingType = String(v.listing_type || "rent").toLowerCase().trim();
        
        const vehicle: Vehicle = {
          id: v.id,
          name: v.name,
          category: category as any,
          listingType: listingType as any,
          price: parseFloat(v.price) || 0,
          currency: (String(v.currency || "USD").toUpperCase() || "USD") as any,
          rentalPeriod: (String(v.price_period || "day").toLowerCase().trim() || "day") as any,
          status: (String(v.status || "available").toLowerCase().trim() || "available") as any,
          image: v.image || "",
          images: v.images || [],
          reviews: v.reviews || [],
          specs: v.specs || {},
          description: v.description || "",
          isFeatured: v.is_featured || false,
          viewCount: v.view_count || 0,
          inquiries: v.inquiries || 0,
          seasonalPrice: v.seasonal_price || null,
          discount: v.discount || 0,
          discountUntil: v.discount_until || null,
        };
        
        return vehicle;
      });

      console.log(`✅ Loaded ${transformedData.length} vehicles from Supabase`);
      setVehicles(transformedData);
    } catch (error) {
      console.error("❌ Error loading vehicles:", error);
      setVehicles([]);
    } finally {
      if (loading) setLoading(false);
    }
  };

  // Sync filters with URL params when they change (SPA navigation)
  useEffect(() => {
    setCategoryFilter(urlCategory);
    setTypeFilter(urlType);
  }, [urlCategory, urlType]);

  // Update URL when filters change for better shareability
  const updateFilters = (newCategory: string, newType: string) => {
    const params = new URLSearchParams();
    if (newCategory !== "all") params.set("category", newCategory);
    if (newType !== "all") params.set("type", newType);
    const queryString = params.toString();
    router.push(`/catalog${queryString ? `?${queryString}` : ""}`, { scroll: false });
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    updateFilters(value, typeFilter);
  };

  const handleTypeChange = (value: string) => {
    setTypeFilter(value);
    updateFilters(categoryFilter, value);
  };

  const hasFilters =
    searchQuery !== "" ||
    categoryFilter !== "all" ||
    typeFilter !== "all" ||
    statusFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setTypeFilter("all");
    setStatusFilter("all");
    router.push("/catalog", { scroll: false });
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      // Normalize filter values to lowercase for comparison
      const normCategoryFilter = categoryFilter.toLowerCase();
      const normTypeFilter = typeFilter.toLowerCase();
      const normStatusFilter = statusFilter.toLowerCase();

      // Debug: Log filter state for first vehicle
      if (vehicles.indexOf(vehicle) === 0) {
        console.log("🔍 Filter debug:", {
          filters: { category: normCategoryFilter, type: normTypeFilter, status: normStatusFilter },
          vehicle: { category: vehicle.category, listingType: vehicle.listingType, status: vehicle.status },
        });
      }

      // Search filter - case insensitive
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          vehicle.name.toLowerCase().includes(query) ||
          vehicle.description.toLowerCase().includes(query) ||
          (vehicle.specs?.engine && vehicle.specs.engine.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter - case insensitive
      // Special handling for "bikes" category = motorcycle OR scooter
      if (normCategoryFilter !== "all") {
        if (normCategoryFilter === "bikes") {
          if (vehicle.category !== "motorcycle" && vehicle.category !== "scooter") {
            return false;
          }
        } else {
          if (vehicle.category !== normCategoryFilter) {
            return false;
          }
        }
      }

      // Type filter - case insensitive
      if (normTypeFilter !== "all" && vehicle.listingType !== normTypeFilter) {
        return false;
      }

      // Status filter - case insensitive
      if (normStatusFilter !== "all" && vehicle.status !== normStatusFilter) {
        return false;
      }

      return true;
    });
  }, [vehicles, searchQuery, categoryFilter, typeFilter, statusFilter]);

  // Dynamic page title based on filters
  const getPageTitle = () => {
    if (categoryFilter === "bikes" && typeFilter === "rent") return "Bikes & Scooters for Rent";
    if (categoryFilter === "bikes" && typeFilter === "sale") return "Bikes & Scooters for Sale";
    if (categoryFilter === "bikes") return "Bikes & Scooters";
    if (categoryFilter === "car" && typeFilter === "sale") return "Cars for Sale";
    if (categoryFilter === "car" && typeFilter === "rent") return "Cars for Rent";
    if (categoryFilter === "car") return "Cars";
    if (categoryFilter === "scooter" && typeFilter === "rent") return "Scooters for Rent";
    if (categoryFilter === "scooter" && typeFilter === "sale") return "Scooters for Sale";
    if (categoryFilter === "scooter") return "Scooters";
    if (categoryFilter === "motorcycle" && typeFilter === "rent") return "Motorcycles for Rent";
    if (categoryFilter === "motorcycle" && typeFilter === "sale") return "Motorcycles for Sale";
    if (categoryFilter === "motorcycle") return "Motorcycles";
    if (typeFilter === "rent") return "Vehicles for Rent";
    if (typeFilter === "sale") return "Vehicles for Sale";
    return "Vehicle Catalog";
  };

  // Group by category for display (case-insensitive)
  const cars = filteredVehicles.filter((v) => v.category === "car");
  const bikes = filteredVehicles.filter((v) => v.category === "motorcycle" || v.category === "scooter");
  const motorcycles = filteredVehicles.filter((v) => v.category === "motorcycle");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 md:pt-24">
        {/* Page Header */}
        <div className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              <span className="text-gold">Vehicle Catalog</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl">
              Browse our premium collection of vehicles available in Sharm El Sheikh.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Filters */}
          <CatalogFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={handleCategoryChange}
            typeFilter={typeFilter}
            setTypeFilter={handleTypeChange}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            clearFilters={clearFilters}
            hasFilters={hasFilters}
          />

          {/* Bikes & Scooters - Rent/Sale Quick Toggle */}
          {categoryFilter === "bikes" && (
            <div className="bg-card rounded-xl border border-border p-4 mb-6">
              <p className="text-sm font-medium text-foreground mb-3">Quick Filter:</p>
              <div className="flex gap-3">
                <Button
                  variant={typeFilter === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleTypeChange("all")}
                  className={typeFilter === "all" ? "bg-gold text-gold-foreground" : ""}
                >
                  All Bikes & Scooters
                </Button>
                <Button
                  variant={typeFilter === "rent" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleTypeChange("rent")}
                  className={typeFilter === "rent" ? "bg-gold text-gold-foreground" : ""}
                >
                  For Rent
                </Button>
                <Button
                  variant={typeFilter === "sale" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleTypeChange("sale")}
                  className={typeFilter === "sale" ? "bg-gold text-gold-foreground" : ""}
                >
                  For Sale
                </Button>
              </div>
            </div>
          )}

          {/* Results Summary */}
          {!loading && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredVehicles.length}
                </span>{" "}
                vehicle{filteredVehicles.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading vehicles...</p>
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No vehicles found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function CatalogPageContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CatalogContent />
    </Suspense>
  );
}

export default function CatalogPage() {
  return <CatalogPageContent />;
}
