"use server";

import { cookies } from "next/headers";

export interface AuthResult {
  success: boolean;
  message?: string;
}

// Get credentials from Netlify environment variables
const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

export async function authenticateAdmin(
  username: string,
  password: string
): Promise<AuthResult> {
  // Validate credentials directly against environment variables
  // No database lookup - pure environment variable comparison
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Set secure session cookie
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
