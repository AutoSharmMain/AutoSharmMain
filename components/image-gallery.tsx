"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  vehicleName: string;
  imageLabels?: string[];
}

export function ImageGallery({
  images,
  vehicleName,
  imageLabels = ["Front", "Side", "Interior", "Rear", "Wheels", "Trunk", "Detail", "Engine"],
}: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setAutoPlay(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setAutoPlay(false);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setAutoPlay(false);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative">
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-muted">
          <Image
            src={images[currentImageIndex]}
            alt={`${vehicleName} - ${imageLabels[currentImageIndex] || `Image ${currentImageIndex + 1}`}`}
            fill
            className="object-cover"
            priority
          />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors shadow-lg z-10 group"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors shadow-lg z-10 group"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Image Counter Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-sm font-medium text-white hover:bg-black/70 transition-colors shadow-lg">
              <Camera className="w-4 h-4" />
              {images.length} photos
            </button>
          </div>

          {/* Image Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentImageIndex === index
                    ? "bg-gold w-8"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all group ${
              currentImageIndex === index
                ? "border-gold ring-2 ring-gold/30 scale-105"
                : "border-border/50 hover:border-gold/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          >
            <Image
              src={img}
              alt={`${vehicleName} thumbnail ${index + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center text-sm text-muted-foreground">
        Image {currentImageIndex + 1} of {images.length}
      </div>
    </div>
  );
}
