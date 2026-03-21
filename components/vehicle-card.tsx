"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Fuel, Gauge, Calendar, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Vehicle } from "@/lib/data";

interface VehicleCardProps {
  vehicle: Vehicle;
}

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

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${vehicle.name} (${vehicle.listingType === "rent" ? "Rental" : "For Sale"}). Can you provide more details?`
  );
  const whatsappUrl = `https://wa.me/201055777826?text=${whatsappMessage}`;

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
      {/* Make entire card clickable - links to internal vehicle details page */}
      <Link 
        href={`/vehicle/${vehicle.id}`}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex gap-2">
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
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-card/90 text-card-foreground capitalize"
            >
              {vehicle.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-semibold text-lg text-foreground leading-tight text-balance">
              {vehicle.name}
            </h3>
            <div className="text-right shrink-0">
              <div className="text-xl font-bold text-gold">
                {vehicle.currency === "EGP" 
                  ? `${vehicle.price.toLocaleString()} EGP`
                  : `$${vehicle.price.toLocaleString()}`
                }
              </div>
              <div className="text-xs text-muted-foreground">
                {vehicle.listingType === "sale" 
                  ? "total" 
                  : `per ${vehicle.rentalPeriod === "month" ? "month" : "day"}`
                }
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {vehicle.description}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Gauge className="w-4 h-4 text-gold" />
              <span>{vehicle.specs.engine}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Cog className="w-4 h-4 text-gold" />
              <span>{vehicle.specs.transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Fuel className="w-4 h-4 text-gold" />
              <span>{vehicle.specs.fuel}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-4 h-4 text-gold" />
              <span>{vehicle.specs.year}</span>
            </div>
          </div>
        </CardContent>
      </Link>

      {/* WhatsApp button outside the main link to allow separate action */}
      <div className="px-4 pb-4 md:px-5 md:pb-5 -mt-1">
        <Button
          asChild
          className="w-full text-white hover:opacity-90"
          style={{ backgroundColor: "#25d366" }}
          disabled={vehicle.status !== "available"}
        >
          <a
            href={vehicle.status === "available" ? whatsappUrl : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={vehicle.status !== "available" ? "pointer-events-none opacity-50" : ""}
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {vehicle.status === "available"
              ? "Inquire on WhatsApp"
              : statusLabels[vehicle.status]}
          </a>
        </Button>
      </div>
    </Card>
  );
}
