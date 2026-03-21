"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Eye, EyeOff } from "lucide-react";
import { authenticateAdmin } from "./actions";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await authenticateAdmin(username, password);

      if (result.success) {
        // Clear form and notify parent
        setUsername("");
        setPassword("");
        onLoginSuccess();
      } else {
        setError(result.message || "Authentication failed");
        setPassword("");
      }
    } catch (err) {
      setError("An error occurred during authentication");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#1a1f2e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <Card className="relative w-full max-w-md border-gold/20 bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-2xl shadow-2xl">
        <CardHeader className="space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gold/30 to-gold/10 p-2 border border-gold/30">
              <Image
                src="/logo.png"
                alt="AutoSharm Logo"
                fill
                className="object-contain p-1"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-gold flex items-center justify-center gap-2">
              <Lock className="w-6 h-6" />
              Admin Portal
            </CardTitle>
            <p className="text-sm text-slate-400">
              Secure access to AutoSharm management
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Username
              </label>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-gold focus:ring-gold/30 transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-gold focus:ring-gold/30 transition-all pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full h-11 bg-gradient-to-r from-gold to-gold/80 hover:from-gold hover:to-gold/90 text-slate-900 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Access Admin Panel
                </div>
              )}
            </Button>

            {/* Security Notice */}
            <p className="text-xs text-slate-500 text-center mt-4">
              🔒 This connection is encrypted and secure
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
