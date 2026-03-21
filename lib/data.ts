export type VehicleCategory = "car" | "motorcycle" | "scooter";
export type VehicleStatus = "available" | "rented" | "sold";
export type ListingType = "rent" | "sale";
export type CurrencyType = "USD" | "EGP";
export type RentalPeriod = "day" | "month";

export interface VehicleReview {
  id: string;
  author: string;
  rating: number; // 1-5 stars
  comment: string;
  date: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  listingType: ListingType;
  price: number; // per day/month for rent, total for sale
  currency?: CurrencyType; // USD or EGP (defaults to USD)
  rentalPeriod?: RentalPeriod; // "day" or "month" for rental vehicles
  status: VehicleStatus;
  image: string;
  images?: string[]; // additional gallery images
  reviews?: VehicleReview[]; // Vehicle-specific reviews (only for rent)
  specs: {
    engine: string;
    transmission: string;
    fuel: string;
    year: number;
    mileage?: string;
    seats?: string; // e.g., "5 seats"
    brand?: string; // e.g., "Mercedes-Benz"
    type?: string; // e.g., "Sedan", "SUV"
    features?: string[];
  };
  description: string;
  detailUrl?: string; // Custom listing detail URL
  isFeatured?: boolean; // For featured/promotional tools
  viewCount?: number; // Analytics tracking
  inquiries?: number; // Number of inquiries received
  seasonalPrice?: number; // Seasonal pricing override
  discount?: number; // Percentage discount (0-100)
  discountUntil?: string; // Discount expiration date
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  readMoreUrl?: string; // Custom read more URL
}

// Customer Inquiry/Booking Type
export interface CustomerInquiry {
  id: string;
  vehicleId: string;
  vehicleName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  inquiryDate: string; // ISO date
  status: "new" | "contacted" | "booked" | "completed" | "cancelled";
  notes?: string;
  followUpDate?: string; // For follow-ups
}

// Testimonial/Review
export interface Testimonial {
  id: string;
  customerName: string;
  rating: number; // 1-5 stars
  comment: string;
  date: string;
  vehicleUsed?: string;
  isPublished: boolean;
}

// FAQ Item
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "rental" | "purchase" | "general" | "policies";
}

// Content Page
export interface ContentPage {
  id: string;
  slug: string; // e.g., "about-us", "rental-policies"
  title: string;
  content: string;
  isPublished: boolean;
}

// Business Settings
export interface BusinessSettings {
  businessName: string;
  businessVision?: string;
  phone: string;
  email: string;
  address: string;
  workingHours: {
    weekdays: { start: string; end: string }; // "09:00" format
    weekends: { start: string; end: string };
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  defaultPolicy?: string; // Default rental/purchase policy
  paymentMethods?: string[];
  insuranceIncluded?: boolean;
  cancellationPolicy?: string;
  emergencyContact?: string;
}

// Analytics Data
export interface AnalyticsData {
  date: string;
  vehicleViews: number;
  inquiries: number;
  bookings: number;
  revenue?: number; // For sales
}

// Temporary placeholder URL for all links
export const TEMP_LINK_URL = "https://maps.app.goo.gl/aTrk1dehDZfXVGga8";

// Initial mock data - DEPRECATED: Using Supabase as source of truth
// Keep empty array - all vehicles should be loaded from Supabase
export const initialVehicles: Vehicle[] = [];

export const initialNews: NewsItem[] = [
  {
    id: "1",
    title: "New Fleet of Premium Vehicles Arriving This Month",
    content: "We're excited to announce the arrival of 10 new luxury vehicles including the latest Mercedes S-Class and Range Rover Sport models. These additions will expand our premium collection, offering you even more choices for your Sharm El Sheikh adventure.",
    date: "2026-03-15",
    readMoreUrl: TEMP_LINK_URL,
  },
  {
    id: "2",
    title: "Special Ramadan Rates Now Available",
    content: "Enjoy exclusive discounts of up to 30% on all vehicle rentals during the holy month of Ramadan. Book now and experience the beauty of Sharm El Sheikh at unbeatable prices. Offer valid for bookings made before the end of Ramadan.",
    date: "2026-03-10",
    readMoreUrl: TEMP_LINK_URL,
  },
  {
    id: "3",
    title: "Desert Safari Package Launched",
    content: "Book our new desert safari package including a Land Cruiser rental with experienced driver guide. Explore the stunning Sinai desert, visit Bedouin camps, and witness breathtaking sunsets over the mountains.",
    date: "2026-03-05",
    readMoreUrl: TEMP_LINK_URL,
  },
];
