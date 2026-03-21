"use server";

import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import type { Vehicle, NewsItem, VehicleReview } from "@/lib/data";

// =====================
// Authentication
// =====================

export interface AuthResult {
  success: boolean;
  message?: string;
}

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export async function authenticateAdmin(
  username: string,
  password: string
): Promise<AuthResult> {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return {
      success: true,
      message: "Authentication successful",
    };
  }

  return {
    success: false,
    message: "Invalid username or password",
  };
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "authenticated";
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

// =====================
// Vehicle Operations (CRUD)
// =====================

export async function createVehicle(
  vehicle: Omit<Vehicle, "id" | "created_at" | "updated_at">
) {
  try {
    // Verify admin session
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      throw new Error("Unauthorized");
    }

    const { data, error } = await supabase
      .from("vehicles")
      .insert([
        {
          name: vehicle.name,
          category: String(vehicle.category || "").toLowerCase(),
          listing_type: String(vehicle.listingType || "").toLowerCase(),
          price: vehicle.price,
          currency: String(vehicle.currency || "USD").toUpperCase(),
          price_period: String(vehicle.rentalPeriod || "day").toLowerCase(),
          status: String(vehicle.status || "available").toLowerCase(),
          description: vehicle.description,
          image: vehicle.image,
          images: vehicle.images || [],
          characteristics: vehicle.specs || {},
          reviews: vehicle.reviews || [],
          specs: vehicle.specs || {},
          is_featured: vehicle.isFeatured || false,
          view_count: vehicle.viewCount || 0,
          inquiries: vehicle.inquiries || 0,
          seasonal_price: vehicle.seasonalPrice || null,
          discount: vehicle.discount || 0,
          discount_until: vehicle.discountUntil || null,
        },
      ])
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function getVehicles() {
  try {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Transform database format to application format
    return {
      success: true,
      data: data.map(transformVehicleFromDB),
    };
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateVehicle(
  id: string,
  updates: Partial<Vehicle>
) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      throw new Error("Unauthorized");
    }

    const { data, error } = await supabase
      .from("vehicles")
      .update({
        name: updates.name,
        category: updates.category ? String(updates.category).toLowerCase() : undefined,
        listing_type: updates.listingType ? String(updates.listingType).toLowerCase() : undefined,
        price: updates.price,
        currency: updates.currency ? String(updates.currency).toUpperCase() : undefined,
        price_period: updates.rentalPeriod ? String(updates.rentalPeriod).toLowerCase() : undefined,
        status: updates.status ? String(updates.status).toLowerCase() : undefined,
        description: updates.description,
        image: updates.image,
        images: updates.images,
        characteristics: updates.specs,
        reviews: updates.reviews,
        specs: updates.specs,
        is_featured: updates.isFeatured,
        view_count: updates.viewCount,
        inquiries: updates.inquiries,
        seasonal_price: updates.seasonalPrice,
        discount: updates.discount,
        discount_until: updates.discountUntil,
      })
      .eq("id", id)
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteVehicle(id: string) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      throw new Error("Unauthorized");
    }

    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return { success: false, error: (error as Error).message };
  }
}

// =====================
// News Operations (CRUD)
// =====================

export async function createNews(
  news: Omit<NewsItem, "id" | "created_at" | "updated_at">
) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      throw new Error("Unauthorized");
    }

    const { data, error } = await supabase
      .from("news")
      .insert([
        {
          title: news.title,
          content: news.content,
          image: news.image || null,
          read_more_url: news.readMoreUrl || null,
          date: news.date || new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error creating news:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function getNews() {
  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;

    return {
      success: true,
      data: data.map(transformNewsFromDB),
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateNews(
  id: string,
  updates: Partial<NewsItem>
) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      throw new Error("Unauthorized");
    }

    const { data, error } = await supabase
      .from("news")
      .update({
        title: updates.title,
        content: updates.content,
        image: updates.image,
        read_more_url: updates.readMoreUrl,
        date: updates.date,
      })
      .eq("id", id)
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error updating news:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteNews(id: string) {
  try {
    const isAuthed = await verifyAdminSession();
    if (!isAuthed) {
      throw new Error("Unauthorized");
    }

    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error deleting news:", error);
    return { success: false, error: (error as Error).message };
  }
}

// =====================
// Helper Functions to Transform DB Data to App Format
// =====================

function transformVehicleFromDB(dbVehicle: any): Vehicle {
  return {
    id: dbVehicle.id,
    name: dbVehicle.name,
    category: dbVehicle.category,
    listingType: dbVehicle.listing_type,
    price: dbVehicle.price,
    currency: dbVehicle.currency,
    rentalPeriod: dbVehicle.price_period,
    status: dbVehicle.status,
    image: dbVehicle.image,
    images: dbVehicle.images,
    reviews: dbVehicle.reviews,
    specs: dbVehicle.specs,
    description: dbVehicle.description,
    isFeatured: dbVehicle.is_featured,
    viewCount: dbVehicle.view_count,
    inquiries: dbVehicle.inquiries,
    seasonalPrice: dbVehicle.seasonal_price,
    discount: dbVehicle.discount,
    discountUntil: dbVehicle.discount_until,
  };
}

function transformNewsFromDB(dbNews: any): NewsItem {
  return {
    id: dbNews.id,
    title: dbNews.title,
    content: dbNews.content,
    date: dbNews.date,
    image: dbNews.image,
    readMoreUrl: dbNews.read_more_url,
  };
}
