"use server";

import { cookies } from "next/headers";

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
  // Validate credentials against environment variables
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
