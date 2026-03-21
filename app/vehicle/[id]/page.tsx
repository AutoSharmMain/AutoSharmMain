"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ImageGallery } from "@/components/image-gallery";
import { StoreProvider, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageCircle,
  ArrowLeft,
  MapPin,
  Star,
  Users,
  Cog,
  Fuel,
  Car,
  Gauge,
  ChevronRight,
} from "lucide-react";

const statusStyles = {
  available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  rented: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  sold: "bg-red-500/10 text-red-600 border-red-500/20",
};

const statusLabels = {
  available: "Available",
  rented: "Rented",
  sold: "Sold",
};

function VehicleDetailContent({ vehicleId }: { vehicleId: string }) {
  const { vehicles } = useStore();

  const vehicle = vehicles.find((v) => v.id === vehicleId);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-20 md:pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Vehicle Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The vehicle you are looking for does not exist.
            </p>
            <Button asChild>
              <Link href="/catalog">Back to Catalog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${vehicle.name} (${vehicle.listingType === "rent" ? "Rental" : "For Sale"}). Can you provide more details?`
  );
  const whatsappUrl = `https://wa.me/201055777826?text=${whatsappMessage}`;

  const [showReviewsDialog, setShowReviewsDialog] = useState(false);

  // Use multiple images with descriptive labels
  const images = vehicle.images && vehicle.images.length > 0 
    ? vehicle.images 
    : [vehicle.image];
  
  const imageLabels = ["Front 3/4", "Side View", "Interior", "Rear", "Wheels", "Engine", "Sunroof", "Details"];

  // Determine vehicle type label
  const vehicleTypeLabel = vehicle.specs.type || (vehicle.category === "car" ? "SUV" : 
    vehicle.category === "motorcycle" ? "Motorcycle" : "Scooter");

  // Determine seats based on specs or category
  const seatsCount = vehicle.specs.seats || (vehicle.category === "car" ? "5 seats" : 
    vehicle.category === "motorcycle" ? "2 seats" : "2 seats");

  // Get brand from specs
  const vehicleBrand = vehicle.specs.brand || vehicle.name.split(" ")[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 md:pt-24">
        {/* Breadcrumb */}
        <div className="bg-secondary/30 border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Catalog
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Image Gallery & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image Gallery Component */}
              <ImageGallery 
                images={images} 
                vehicleName={vehicle.name}
                imageLabels={imageLabels}
              />

              {/* Title Section */}
              <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className="bg-primary text-primary-foreground font-medium"
                      >
                        {vehicle.listingType === "rent" ? "For Rent" : "For Sale"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`font-medium ${statusStyles[vehicle.status]}`}
                      >
                        {statusLabels[vehicle.status]}
                      </Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      {vehicle.name} {vehicle.specs.year}
                    </h1>
                  </div>
                </div>

                {/* Rating & Location - Only for Rent Vehicles */}
                {vehicle.listingType === "rent" && (
                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <Dialog open={showReviewsDialog} onOpenChange={setShowReviewsDialog}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="p-0 h-auto text-gold hover:text-gold/80 font-medium flex items-center gap-1"
                        >
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-gold text-gold" />
                            {vehicle.reviews && vehicle.reviews.length > 0
                              ? `${vehicle.reviews.length} ${vehicle.reviews.length === 1 ? "review" : "reviews"}`
                              : "Check reviews"}
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      
                      <DialogContent className="max-w-lg max-h-[60vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{vehicle.name} - Customer Reviews</DialogTitle>
                        </DialogHeader>
                        
                        {vehicle.reviews && vehicle.reviews.length > 0 ? (
                          <div className="space-y-4">
                            {vehicle.reviews.map((review) => (
                              <div 
                                key={review.id}
                                className="p-4 border border-border/50 rounded-lg space-y-2"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-medium text-foreground">{review.author}</p>
                                    <p className="text-xs text-muted-foreground">{review.date}</p>
                                  </div>
                                  <div className="flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating
                                            ? "fill-gold text-gold"
                                            : "text-border"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{review.comment}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-8 text-center space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              No reviews yet. If you'd like to leave a review, please message us on WhatsApp and we'll be happy to publish it. Thank you for helping us improve!
                            </p>
                            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90 w-full">
                              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Write to us on WhatsApp
                              </a>
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Sharm El Sheikh, South Sinai</span>
                    </div>
                  </div>
                )}
                
                {/* Location Only - For Sale Vehicles */}
                {vehicle.listingType === "sale" && (
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Sharm El Sheikh, South Sinai</span>
                  </div>
                )}
              </div>

              {/* Characteristics Grid - Styled like image_2.png */}
              <Card className="border-border/50">
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Characteristics</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Seats</p>
                        <p className="font-medium text-sm">{seatsCount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Cog className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Gearbox</p>
                        <p className="font-medium text-sm">{vehicle.specs.transmission}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Fuel className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Fuel</p>
                        <p className="font-medium text-sm">{vehicle.specs.fuel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Car className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Brand</p>
                        <p className="font-medium text-sm">{vehicleBrand}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Car className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="font-medium text-sm">{vehicleTypeLabel}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Gauge className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Mileage</p>
                        <p className="font-medium text-sm">{vehicle.specs.mileage || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="border-border/50">
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-3">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {vehicle.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    This vehicle is available for {vehicle.listingType === "rent" ? "rental" : "purchase"} at our Sharm El Sheikh location. 
                    All vehicles are fully insured, regularly maintained, and come with 24/7 roadside assistance. 
                    Contact us on WhatsApp for immediate booking or to schedule a viewing.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Price & Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-border/50 shadow-lg">
                  <CardContent className="p-5 md:p-6 space-y-6">
                    {/* Price Display */}
                    <div className="text-center pb-4 border-b border-border">
                      <p className="text-sm text-muted-foreground mb-1">
                        {vehicle.listingType === "sale" 
                          ? "Price" 
                          : vehicle.rentalPeriod === "month" 
                          ? "Monthly Rate" 
                          : "Daily Rate"
                        }
                      </p>
                      <div className="flex items-baseline justify-center gap-2 flex-wrap">
                        <span className="text-3xl md:text-4xl font-bold text-gold">
                          {vehicle.currency === "EGP" 
                            ? `${vehicle.price.toLocaleString()} EGP`
                            : `$${vehicle.price.toLocaleString()}`
                          }
                        </span>
                        {vehicle.listingType === "rent" && (
                          <span className="text-muted-foreground text-sm">
                            / per {vehicle.rentalPeriod === "month" ? "month" : "day"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge
                          variant="outline"
                          className={statusStyles[vehicle.status]}
                        >
                          {statusLabels[vehicle.status]}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-medium capitalize">{vehicle.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Year</span>
                        <span className="font-medium">{vehicle.specs.year}</span>
                      </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-gold text-gold-foreground hover:bg-gold/90 h-12 text-base font-semibold"
                      disabled={vehicle.status !== "available"}
                    >
                      <a
                        href={vehicle.status === "available" ? whatsappUrl : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={vehicle.status !== "available" ? "pointer-events-none" : ""}
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Contact on WhatsApp
                      </a>
                    </Button>

                    {vehicle.status !== "available" && (
                      <p className="text-center text-sm text-muted-foreground">
                        This vehicle is currently {vehicle.status}. Contact us for alternatives.
                      </p>
                    )}

                    {/* Trust badges */}
                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        Fully insured vehicles
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        24/7 roadside assistance
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        Free delivery in Sharm El Sheikh
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return (
    <StoreProvider>
      <VehicleDetailContent vehicleId={id} />
    </StoreProvider>
  );
}
