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

// Initial mock data - in production this would come from a database
export const initialVehicles: Vehicle[] = [
  {
    id: "1",
    name: "Mercedes-Benz E-Class",
    category: "car",
    listingType: "rent",
    price: 150,
    currency: "USD",
    rentalPeriod: "day",
    status: "available",
    image: "https://images.unsplash.com/photo-1606611013016-969c19d14311?w=1200&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606611013016-969c19d14311?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1624262407292-882cad30f046?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1589537926505-e42f21123854?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19d14311?w=1200&h=750&fit=crop&flip=h",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop",
    ],
    reviews: [
      {
        id: "r1",
        author: "Ahmed Hassan",
        rating: 5,
        comment: "Excellent car! Very clean and comfortable. The driver was professional.",
        date: "2026-03-10",
      },
      {
        id: "r2",
        author: "Fatima Al-Zahara",
        rating: 4,
        comment: "Great experience overall. Smooth ride and good service.",
        date: "2026-03-05",
      },
    ],
    specs: {
      engine: "2.0L Turbo",
      transmission: "Automatic",
      fuel: "Petrol",
      year: 2024,
      mileage: "15,000 km",
      seats: "5 seats",
      brand: "Mercedes-Benz",
      type: "Sedan",
      features: ["Leather Seats", "Navigation", "Sunroof", "Cruise Control"],
    },
    description: "Luxury sedan perfect for exploring Sharm El Sheikh in style. Features premium leather interior, advanced navigation system, and smooth automatic transmission for ultimate comfort.",
    detailUrl: TEMP_LINK_URL,
  },
  {
    id: "2",
    name: "Toyota Land Cruiser",
    category: "car",
    listingType: "rent",
    price: 200,
    currency: "USD",
    rentalPeriod: "day",
    status: "available",
    reviews: [],
    image: "https://images.unsplash.com/photo-1533473359331-35f3dd343f51?w=1200&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1533473359331-35f3dd343f51?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1559305714-3b5b60b5d4c8?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1577721643141-8efb1509c1b7?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1609174084888-94efbc4dfc44?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1533473359331-35f3dd343f51?w=1200&h=750&fit=crop&flip=h",
      "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=1200&h=750&fit=crop",
    ],
    specs: {
      engine: "4.0L V6",
      transmission: "Automatic",
      fuel: "Petrol",
      year: 2023,
      mileage: "25,000 km",
      seats: "7 seats",
      brand: "Toyota",
      type: "SUV",
      features: ["4WD", "Off-Road Package", "Third Row Seating", "Tow Package"],
    },
    description: "Perfect for desert adventures and off-road excursions. This powerful SUV handles any terrain while keeping passengers comfortable.",
    detailUrl: TEMP_LINK_URL,
  },
  {
    id: "3",
    name: "BMW X5",
    category: "car",
    listingType: "sale",
    price: 45000,
    currency: "USD",
    status: "available",
    reviews: [],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1559305714-3b5b60b5d4c8?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1608949212680-9725f96b0d0e?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=750&fit=crop&flip=h",
      "https://images.unsplash.com/photo-1606611013016-969c19d14311?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop",
    ],
    specs: {
      engine: "3.0L Turbo",
      transmission: "Automatic",
      fuel: "Petrol",
      year: 2022,
      mileage: "32,000 km",      seats: "5 seats",
      brand: "BMW",
      type: "SUV",      features: ["M Sport Package", "Panoramic Roof", "Harman Kardon Audio", "Adaptive Cruise"],
    },
    description: "Premium SUV in excellent condition, low mileage. Features include M Sport package, panoramic sunroof, and premium audio system.",
    detailUrl: TEMP_LINK_URL,
  },
  {
    id: "4",
    name: "Yamaha MT-07",
    category: "motorcycle",
    listingType: "rent",
    price: 75,
    currency: "USD",
    rentalPeriod: "day",
    status: "available",
    reviews: [],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1532521b1e7e51226e1439cf5c18b64bb6c9f9c3?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1505202335551-b89485a50d4f?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1584345604794-716a215d9ebc?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop&flip=h",
      "https://images.unsplash.com/photo-1532521b1e7e51226e1439cf5c18b64bb6c9f9c3?w=1200&h=750&fit=crop&flip=h",
    ],
    specs: {
      engine: "689cc Twin",
      transmission: "Manual",
      fuel: "Petrol",
      year: 2024,
      mileage: "5,000 km",
      seats: "2 seats",
      brand: "Yamaha",
      type: "Motorcycle",
      features: ["ABS", "LED Lights", "Digital Dashboard"],
    },
    description: "Agile and fun motorcycle for coastal rides. Perfect balance of power and handling for both new and experienced riders.",
    detailUrl: TEMP_LINK_URL,
  },
  {
    id: "5",
    name: "Honda PCX 160",
    category: "scooter",
    listingType: "rent",
    price: 35,
    currency: "USD",
    rentalPeriod: "day",
    status: "rented",
    reviews: [],
    image: "https://images.unsplash.com/photo-1605559424843-9e4c3dec3106?w=1200&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c3dec3106?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1564159266597-5f9d25e76de4?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1609174084888-94efbc4dfc44?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c3dec3106?w=1200&h=750&fit=crop&flip=h",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=750&fit=crop",
    ],
    specs: {
      engine: "160cc",
      transmission: "Automatic",
      fuel: "Petrol",
      year: 2024,
      mileage: "3,000 km",
      seats: "2 seats",
      brand: "Honda",
      type: "Scooter",
      features: ["USB Charging", "Storage Compartment", "ABS"],
    },
    description: "Efficient and comfortable scooter for city exploration. Great fuel economy and easy to ride.",
    detailUrl: TEMP_LINK_URL,
  },
  {
    id: "6",
    name: "Vespa Primavera",
    category: "scooter",
    listingType: "rent",
    price: 40,
    currency: "USD",
    rentalPeriod: "day",
    status: "available",
    reviews: [],
    image: "https://images.unsplash.com/photo-1605559424843-9e4c3dec3106?w=1200&h=750&fit=crop&flip=h",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c3dec3106?w=1200&h=750&fit=crop&flip=h",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1609174084888-94efbc4dfc44?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1584345604794-716a215d9ebc?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c3dec3106?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=750&fit=crop&flip=h",
    ],
    specs: {
      engine: "150cc",
      transmission: "Automatic",
      fuel: "Petrol",
      year: 2023,
      mileage: "8,000 km",
      seats: "2 seats",
      brand: "Vespa",
      type: "Scooter",
      features: ["Classic Design", "Front Storage", "Comfortable Seat"],
    },
    description: "Iconic Italian scooter, perfect beach companion. Stylish design meets practical city transportation.",
    detailUrl: TEMP_LINK_URL,
  },
  {
    id: "7",
    name: "Porsche 911 Carrera",
    category: "car",
    listingType: "rent",
    price: 450,
    currency: "USD",
    rentalPeriod: "day",
    status: "available",
    reviews: [],
    image: "https://images.unsplash.com/photo-1624262407292-882cad30f046?w=1200&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1624262407292-882cad30f046?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1589537926505-e42f21123854?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1624262407292-882cad30f046?w=1200&h=750&fit=crop&flip=h",
      "https://images.unsplash.com/photo-1606611013016-969c19d14311?w=1200&h=750&fit=crop",
    ],
    specs: {
      engine: "3.0L Twin-Turbo",
      transmission: "PDK",
      fuel: "Petrol",
      year: 2024,
      mileage: "8,000 km",
      seats: "4 seats",
      brand: "Porsche",
      type: "Sports Car",
      features: ["Sport Chrono Package", "PASM Suspension", "Bose Audio", "Sport Exhaust"],
    },
    description: "Experience ultimate driving pleasure along the Red Sea coast. The legendary 911 delivers exhilarating performance and timeless design.",
    detailUrl: TEMP_LINK_URL,
  },
  {
    id: "8",
    name: "Kawasaki Ninja 650",
    category: "motorcycle",
    listingType: "sale",
    price: 8500,
    currency: "USD",
    status: "sold",
    reviews: [],
    image: "https://images.unsplash.com/photo-1532521b1e7e51226e1439cf5c18b64bb6c9f9c3?w=1200&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1532521b1e7e51226e1439cf5c18b64bb6c9f9c3?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1505202335551-b89485a50d4f?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1584345604794-716a215d9ebc?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1589537926505-e42f21123854?w=1200&h=750&fit=crop",
      "https://images.unsplash.com/photo-1532521b1e7e51226e1439cf5c18b64bb6c9f9c3?w=1200&h=750&fit=crop&flip=h",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=750&fit=crop",
    ],
    specs: {
      engine: "649cc Twin",
      transmission: "Manual",
      fuel: "Petrol",
      year: 2023,
      mileage: "12,000 km",
      seats: "2 seats",
      brand: "Kawasaki",
      type: "Motorcycle",
      features: ["ABS", "Slipper Clutch", "LED Lights"],
    },
    description: "Sport bike with excellent handling and performance. Great for both daily commuting and weekend rides.",
    detailUrl: TEMP_LINK_URL,
  },
];

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
