"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "./supabase";
import {
  Vehicle,
  NewsItem,
  CustomerInquiry,
  Testimonial,
  FAQ,
  ContentPage,
  BusinessSettings,
  AnalyticsData,
  initialVehicles,
  initialNews,
  VehicleStatus,
} from "./data";

interface StoreContextType {
  // Vehicles
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  updateVehicleStatus: (id: string, status: VehicleStatus) => void;
  toggleFeatured: (id: string) => void;
  updateViewCount: (id: string, count: number) => void;

  // News
  news: NewsItem[];
  addNews: (news: Omit<NewsItem, "id">) => void;
  updateNews: (id: string, news: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;

  // Customer Inquiries
  inquiries: CustomerInquiry[];
  addInquiry: (inquiry: Omit<CustomerInquiry, "id">) => void;
  updateInquiry: (id: string, inquiry: Partial<CustomerInquiry>) => void;
  deleteInquiry: (id: string) => void;

  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, "id">) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  publishTestimonial: (id: string) => void;

  // FAQs
  faqs: FAQ[];
  addFAQ: (faq: Omit<FAQ, "id">) => void;
  updateFAQ: (id: string, faq: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;

  // Content Pages
  contentPages: ContentPage[];
  addContentPage: (page: Omit<ContentPage, "id">) => void;
  updateContentPage: (id: string, page: Partial<ContentPage>) => void;
  deleteContentPage: (id: string) => void;

  // Business Settings
  settings: BusinessSettings;
  updateSettings: (settings: Partial<BusinessSettings>) => void;

  // Analytics
  analytics: AnalyticsData[];
  recordAnalytics: (data: AnalyticsData) => void;

  // Combined stats for dashboard
  getDashboardStats: () => {
    totalVehicles: number;
    available: number;
    rented: number;
    sold: number;
    totalInquiries: number;
    newInquiries: number;
    totalPublishedTestimonials: number;
    totalPageViews: number;
  };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Default business settings
const defaultSettings: BusinessSettings = {
  businessName: "AutoSharm",
  phone: "+201055777826",
  email: "sharmrental@gmail.com",
  address: "Sharm El Sheikh, South Sinai, Egypt",
  workingHours: {
    weekdays: { start: "09:00", end: "18:00" },
    weekends: { start: "10:00", end: "20:00" },
  },
  socialMedia: {
    instagram: "autosharm.eg",
    facebook: "autosharm",
    whatsapp: "+201055777826",
  },
  defaultPolicy: "All rentals include basic insurance and 24/7 roadside assistance.",
  paymentMethods: ["Cash", "Credit Card", "WhatsApp Payment"],
  insuranceIncluded: true,
  cancellationPolicy: "Free cancellation up to 24 hours before booking",
};

// LocalStorage keys
const STORAGE_KEYS = {
  VEHICLES: "autosharm_vehicles",
  NEWS: "autosharm_news",
  INQUIRIES: "autosharm_inquiries",
  TESTIMONIALS: "autosharm_testimonials",
  FAQS: "autosharm_faqs",
  CONTENT_PAGES: "autosharm_content_pages",
  SETTINGS: "autosharm_settings",
  ANALYTICS: "autosharm_analytics",
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [contentPages, setContentPages] = useState<ContentPage[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(defaultSettings);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load vehicles from Supabase on mount
  useEffect(() => {
    const loadVehiclesFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("❌ Error loading vehicles from Supabase:", error);
          // Start with empty array, not mock data
          setVehicles([]);
        } else if (data && data.length > 0) {
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
          console.log(
            `✅ Loaded ${transformedVehicles.length} vehicles from Supabase`
          );
          setVehicles(transformedVehicles);
        } else {
          console.log("ℹ️ No vehicles found in Supabase, starting with empty list");
          setVehicles([]);
        }
      } catch (error) {
        console.error("🔥 Error in loadVehiclesFromSupabase:", error);
        setVehicles([]);
      }
    };

    loadVehiclesFromSupabase();

    // Load news from Supabase
    const loadNewsFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("date", { ascending: false });

        if (error) {
          console.error("❌ Error loading news from Supabase:", error);
          setNews(initialNews); // Fallback to initial news
        } else if (data && data.length > 0) {
          const transformedNews: NewsItem[] = data.map((n: any) => ({
            id: n.id,
            title: n.title || "",
            content: n.content || "",
            date: n.date || new Date().toISOString(),
            readMoreUrl: n.read_more_url || "",
          }));
          console.log(`✅ Loaded ${transformedNews.length} news items from Supabase`);
          setNews(transformedNews);
        } else {
          console.log("ℹ️ No news found in Supabase, using initial data");
          setNews(initialNews);
        }
      } catch (error) {
        console.error("🔥 Error in loadNewsFromSupabase:", error);
        setNews(initialNews);
      }
    };

    loadNewsFromSupabase();

    // Load other data from localStorage
    try {
      const storedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (storedInquiries) setInquiries(JSON.parse(storedInquiries));

      const storedTestimonials = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedFAQs = localStorage.getItem(STORAGE_KEYS.FAQS);
      if (storedFAQs) setFAQs(JSON.parse(storedFAQs));

      const storedContentPages = localStorage.getItem(STORAGE_KEYS.CONTENT_PAGES);
      if (storedContentPages) setContentPages(JSON.parse(storedContentPages));

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) setSettings(JSON.parse(storedSettings));

      const storedAnalytics = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      if (storedAnalytics) setAnalytics(JSON.parse(storedAnalytics));
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
    setIsHydrated(true);
  }, []);

  // Remove the localStorage save effect for vehicles - Supabase is source of truth
  // (Keeping other localStorage effects for non-vehicle data)

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      } catch (error) {
        console.error("Error saving inquiries to localStorage:", error);
      }
    }
  }, [inquiries, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
      } catch (error) {
        console.error("Error saving testimonials to localStorage:", error);
      }
    }
  }, [testimonials, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
      } catch (error) {
        console.error("Error saving FAQs to localStorage:", error);
      }
    }
  }, [faqs, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEYS.CONTENT_PAGES, JSON.stringify(contentPages));
      } catch (error) {
        console.error("Error saving content pages to localStorage:", error);
      }
    }
  }, [contentPages, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      } catch (error) {
        console.error("Error saving settings to localStorage:", error);
      }
    }
  }, [settings, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
      } catch (error) {
        console.error("Error saving analytics to localStorage:", error);
      }
    }
  }, [analytics, isHydrated]);

  // Vehicle management - Supabase as source of truth (async operations in background)
  const addVehicle = (vehicle: Omit<Vehicle, "id">) => {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: `temp_${Date.now()}`, // Temporary ID, will be replaced by Supabase ID
      viewCount: 0,
      inquiries: 0,
      isFeatured: false,
    };
    setVehicles((prev) => [...prev, newVehicle]);

    // Queue Supabase operation in background
    (async () => {
      try {
        const vehicleData = {
          name: vehicle.name,
          category: String(vehicle.category || "car").toLowerCase(),
          listing_type: String(vehicle.listingType || "rent").toLowerCase(),
          price: vehicle.price,
          currency: String(vehicle.currency || "USD").toUpperCase(),
          price_period: String(vehicle.rentalPeriod || "day").toLowerCase(),
          status: String(vehicle.status || "available").toLowerCase(),
          image: vehicle.image,
          images: vehicle.images || [],
          reviews: vehicle.reviews || [],
          specs: vehicle.specs || {},
          description: vehicle.description,
          brand: vehicle.brand || null,
          body_type: vehicle.body_type || null,
          is_featured: vehicle.isFeatured || false,
          is_pinned: vehicle.isPinned || false,
          view_count: vehicle.viewCount || 0,
          inquiries: vehicle.inquiries || 0,
          seasonal_price: vehicle.seasonalPrice,
          discount: vehicle.discount || 0,
          discount_until: vehicle.discountUntil,
        };

        const { data, error } = await supabase
          .from("vehicles")
          .insert([vehicleData])
          .select()
          .single();

        if (error) {
          console.error("❌ Error adding vehicle to Supabase:", error);
          // Remove the temporary vehicle if it failed
          setVehicles((prev) => prev.filter((v) => v.id !== newVehicle.id));
          return;
        }

        if (!data) {
          console.error("❌ No data returned from Supabase insert");
          setVehicles((prev) => prev.filter((v) => v.id !== newVehicle.id));
          return;
        }

        // Replace temporary vehicle with real one from Supabase
        const savedVehicle: Vehicle = {
          id: data.id,
          name: data.name,
          category: data.category || "car",
          listingType: data.listing_type || "rent",
          price: parseFloat(data.price) || 0,
          currency: data.currency || "USD",
          rentalPeriod: data.price_period || "day",
          status: data.status || "available",
          image: data.image || "",
          images: data.images || [],
          reviews: data.reviews || [],
          specs: data.specs || {},
          description: data.description || "",
          brand: data.brand || undefined,
          body_type: data.body_type || undefined,
          isFeatured: data.is_featured || false,
          isPinned: data.is_pinned || false,
          viewCount: data.view_count || 0,
          inquiries: data.inquiries || 0,
          seasonalPrice: data.seasonal_price || null,
          discount: data.discount || 0,
          discountUntil: data.discount_until || null,
        };

        setVehicles((prev) =>
          prev.map((v) => (v.id === newVehicle.id ? savedVehicle : v))
        );
        console.log("✅ Vehicle saved to Supabase:", savedVehicle);
      } catch (error) {
        console.error("🔥 Error in addVehicle background operation:", error);
        setVehicles((prev) => prev.filter((v) => v.id !== newVehicle.id));
      }
    })();
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    // Update local state immediately for responsive UI
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );

    // Queue Supabase operation in background
    (async () => {
      try {
        const updateData: Record<string, any> = {};
        if (updates.name !== undefined) updateData.name = updates.name;
        if (updates.category !== undefined) updateData.category = updates.category;
        if (updates.listingType !== undefined) updateData.listing_type = updates.listingType;
        if (updates.price !== undefined) updateData.price = updates.price;
        if (updates.currency !== undefined) updateData.currency = updates.currency;
        if (updates.rentalPeriod !== undefined) updateData.price_period = updates.rentalPeriod;
        if (updates.status !== undefined) updateData.status = updates.status;
        if (updates.image !== undefined) updateData.image = updates.image;
        if (updates.images !== undefined) updateData.images = updates.images;
        if (updates.reviews !== undefined) updateData.reviews = updates.reviews;
        if (updates.specs !== undefined) updateData.specs = updates.specs;
        if (updates.description !== undefined) updateData.description = updates.description;
        if (updates.brand !== undefined) updateData.brand = updates.brand;
        if (updates.body_type !== undefined) updateData.body_type = updates.body_type;
        if (updates.isFeatured !== undefined) updateData.is_featured = updates.isFeatured;
        if (updates.isPinned !== undefined) updateData.is_pinned = updates.isPinned;
        if (updates.viewCount !== undefined) updateData.view_count = updates.viewCount;
        if (updates.inquiries !== undefined) updateData.inquiries = updates.inquiries;
        if (updates.seasonalPrice !== undefined) updateData.seasonal_price = updates.seasonalPrice;
        if (updates.discount !== undefined) updateData.discount = updates.discount;
        if (updates.discountUntil !== undefined) updateData.discount_until = updates.discountUntil;

        const { error } = await supabase
          .from("vehicles")
          .update(updateData)
          .eq("id", id);

        if (error) {
          console.error("❌ Error updating vehicle in Supabase:", error);
          return;
        }

        console.log("✅ Vehicle updated in Supabase:", id);
      } catch (error) {
        console.error("🔥 Error in updateVehicle background operation:", error);
      }
    })();
  };

  const deleteVehicle = (id: string) => {
    // Update local state immediately for responsive UI
    setVehicles((prev) => prev.filter((v) => v.id !== id));

    // Queue Supabase operation in background
    (async () => {
      try {
        const { error } = await supabase
          .from("vehicles")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("❌ Error deleting vehicle from Supabase:", error);
          return;
        }

        console.log("✅ Vehicle deleted from Supabase:", id);
      } catch (error) {
        console.error("🔥 Error in deleteVehicle background operation:", error);
      }
    })();
  };

  const updateVehicleStatus = (id: string, status: VehicleStatus) => {
    updateVehicle(id, { status });
  };

  const toggleFeatured = (id: string) => {
    const vehicle = vehicles.find((v) => v.id === id);
    if (vehicle) {
      updateVehicle(id, { isFeatured: !vehicle.isFeatured });
    }
  };

  const updateViewCount = (id: string, count: number) => {
    updateVehicle(id, { viewCount: count });
  };

  // News management - Supabase as source of truth
  const addNews = (newsItem: Omit<NewsItem, "id">) => {
    const newNews: NewsItem = {
      ...newsItem,
      id: `temp_${Date.now()}`,
    };
    setNews((prev) => [newNews, ...prev]);

    // Save to Supabase in background
    (async () => {
      try {
        const newsData = {
          title: newsItem.title,
          content: newsItem.content,
          date: newsItem.date,
          read_more_url: newsItem.readMoreUrl || null,
        };

        const { data, error } = await supabase
          .from("news")
          .insert([newsData])
          .select()
          .single();

        if (error) {
          console.error("❌ Error adding news to Supabase:", error);
          setNews((prev) => prev.filter((n) => n.id !== newNews.id));
          return;
        }

        if (!data) {
          console.error("❌ No data returned from Supabase insert");
          setNews((prev) => prev.filter((n) => n.id !== newNews.id));
          return;
        }

        // Replace temporary news with real one from Supabase
        const savedNews: NewsItem = {
          id: data.id,
          title: data.title || "",
          content: data.content || "",
          date: data.date || new Date().toISOString(),
          readMoreUrl: data.read_more_url || "",
        };

        setNews((prev) =>
          prev.map((n) => (n.id === newNews.id ? savedNews : n))
        );
        console.log("✅ News added to Supabase successfully");
      } catch (error) {
        console.error("🔥 Error in addNews:", error);
        setNews((prev) => prev.filter((n) => n.id !== newNews.id));
      }
    })();
  };

  const updateNews = (id: string, updates: Partial<NewsItem>) => {
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );

    // Update in Supabase in background
    (async () => {
      try {
        const updateData: any = {};
        if (updates.title !== undefined) updateData.title = updates.title;
        if (updates.content !== undefined) updateData.content = updates.content;
        if (updates.date !== undefined) updateData.date = updates.date;
        if (updates.readMoreUrl !== undefined) {
          updateData.read_more_url = updates.readMoreUrl;
        }

        const { error } = await supabase
          .from("news")
          .update(updateData)
          .eq("id", id);

        if (error) {
          console.error("❌ Error updating news in Supabase:", error);
          return;
        }

        console.log("✅ News updated in Supabase successfully");
      } catch (error) {
        console.error("🔥 Error in updateNews:", error);
      }
    })();
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));

    // Delete from Supabase in background
    (async () => {
      try {
        const { error } = await supabase.from("news").delete().eq("id", id);

        if (error) {
          console.error("❌ Error deleting news from Supabase:", error);
          return;
        }

        console.log("✅ News deleted from Supabase successfully");
      } catch (error) {
        console.error("🔥 Error in deleteNews:", error);
      }
    })();
  };

  // Customer Inquiry management
  const addInquiry = (inquiry: Omit<CustomerInquiry, "id">) => {
    const newInquiry: CustomerInquiry = {
      ...inquiry,
      id: Date.now().toString(),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const updateInquiry = (id: string, updates: Partial<CustomerInquiry>) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updates } : i))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  // Testimonial management
  const addTestimonial = (testimonial: Omit<Testimonial, "id">) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Date.now().toString(),
    };
    setTestimonials((prev) => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const publishTestimonial = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isPublished: !t.isPublished } : t
      )
    );
  };

  // FAQ management
  const addFAQ = (faq: Omit<FAQ, "id">) => {
    const newFAQ: FAQ = {
      ...faq,
      id: Date.now().toString(),
    };
    setFAQs((prev) => [...prev, newFAQ]);
  };

  const updateFAQ = (id: string, updates: Partial<FAQ>) => {
    setFAQs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const deleteFAQ = (id: string) => {
    setFAQs((prev) => prev.filter((f) => f.id !== id));
  };

  // Content Page management
  const addContentPage = (page: Omit<ContentPage, "id">) => {
    const newPage: ContentPage = {
      ...page,
      id: Date.now().toString(),
    };
    setContentPages((prev) => [...prev, newPage]);
  };

  const updateContentPage = (id: string, updates: Partial<ContentPage>) => {
    setContentPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteContentPage = (id: string) => {
    setContentPages((prev) => prev.filter((p) => p.id !== id));
  };

  // Business Settings
  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Analytics
  const recordAnalytics = (data: AnalyticsData) => {
    setAnalytics((prev) => [...prev, data]);
  };

  // Dashboard stats
  const getDashboardStats = () => ({
    totalVehicles: vehicles.length,
    available: vehicles.filter((v) => v.status === "available").length,
    rented: vehicles.filter((v) => v.status === "rented").length,
    sold: vehicles.filter((v) => v.status === "sold").length,
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter((i) => i.status === "new").length,
    totalPublishedTestimonials: testimonials.filter((t) => t.isPublished).length,
    totalPageViews: vehicles.reduce((sum, v) => sum + (v.viewCount || 0), 0),
  });

  return (
    <StoreContext.Provider
      value={{
        vehicles,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        updateVehicleStatus,
        toggleFeatured,
        updateViewCount,
        news,
        addNews,
        updateNews,
        deleteNews,
        inquiries,
        addInquiry,
        updateInquiry,
        deleteInquiry,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        publishTestimonial,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        contentPages,
        addContentPage,
        updateContentPage,
        deleteContentPage,
        settings,
        updateSettings,
        analytics,
        recordAnalytics,
        getDashboardStats,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
