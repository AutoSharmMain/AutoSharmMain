"use client";

import Link from "next/link";
import { Shield, Eye, Lock, Database, Users, Trash2, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "introduction", label: "Introduction", icon: Shield },
    { id: "information", label: "Information We Collect", icon: Database },
    { id: "usage", label: "How We Use Your Data", icon: Eye },
    { id: "cookies", label: "Cookies & Tracking", icon: Lock },
    { id: "third-party", label: "Third-Party Services", icon: Users },
    { id: "rights", label: "Your Rights", icon: Trash2 },
    { id: "contact", label: "Contact Us", icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#1a1f2e]">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#0a0a0a] to-[#0f1419] border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-gold" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Privacy <span className="text-gold">Policy</span>
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Last Updated: <span className="text-gold font-semibold">March 18, 2026</span>
          </p>
          <p className="text-slate-300 mt-4 max-w-3xl">
            At AutoSharm, we are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-gold/20 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gold/20">
                  <h3 className="text-sm font-bold text-gold uppercase tracking-wider">
                    Table of Contents
                  </h3>
                </div>
                <nav className="p-4 space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-gold hover:bg-gold/10 transition-all duration-200 flex items-center gap-2 group"
                      >
                        <Icon className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Contact Card */}
              <div className="mt-6 p-4 bg-gold/10 border border-gold/20 rounded-lg">
                <p className="text-sm text-slate-300 mb-3">
                  Questions about our privacy practices?
                </p>
                <Button
                  asChild
                  className="w-full bg-gold text-slate-900 hover:bg-gold/90 font-semibold"
                >
                  <a href="https://wa.me/201055777826" target="_blank" rel="noopener noreferrer">
                    Contact Us via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-12">
            {/* Introduction Section */}
            <section id="introduction" className="scroll-mt-20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/20 rounded-lg mt-1">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Welcome to AutoSharm
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-4">
                    We value your privacy and are dedicated to protecting your personal data. This Privacy Policy outlines our practices regarding the collection, usage, and safeguarding of information you provide when using our website and services.
                  </p>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Whether you're booking a luxury vehicle rental or planning a tour in beautiful Sharm El Sheikh, we want you to feel confident that your information is handled with care and transparency.
                  </p>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section id="information" className="scroll-mt-20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/20 rounded-lg mt-1">
                  <Database className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Information We Collect
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    To provide you with the best rental and tour experiences, we collect the following types of information:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Personal Information
                      </h3>
                      <ul className="text-slate-300 space-y-2 list-inside">
                        <li className="flex gap-2">
                          <span className="text-gold">•</span>
                          <span><strong>Full Name:</strong> Used for identification and booking confirmation</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-gold">•</span>
                          <span><strong>Phone Number:</strong> Required for WhatsApp communication and booking updates</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-gold">•</span>
                          <span><strong>Email Address:</strong> For sending confirmation details and newsletters (optional)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Booking Information
                      </h3>
                      <ul className="text-slate-300 space-y-2 list-inside">
                        <li className="flex gap-2">
                          <span className="text-gold">•</span>
                          <span><strong>Dates:</strong> Rental or tour dates and duration</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-gold">•</span>
                          <span><strong>Vehicle Preferences:</strong> Type of car or service selected</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-gold">•</span>
                          <span><strong>Special Requests:</strong> Any additional requirements you provide</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Technical Information
                      </h3>
                      <ul className="text-slate-300 space-y-2 list-inside">
                        <li className="flex gap-2">
                          <span className="text-gold">•</span>
                          <span><strong>Browser & Device Data:</strong> Information about your device and browser for optimal site performance</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-gold">•</span>
                          <span><strong>IP Address:</strong> Your internet protocol address for security and fraud prevention</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How We Use Data */}
            <section id="usage" className="scroll-mt-20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/20 rounded-lg mt-1">
                  <Eye className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    How We Use Your Data
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    We use the information you provide for the following purposes:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 border-l-4 border-gold rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        ✓ Processing Bookings
                      </h3>
                      <p className="text-slate-300">
                        Your personal and booking information is used to confirm your reservations, process payments, and prepare your rental or tour.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border-l-4 border-gold rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        ✓ Communication
                      </h3>
                      <p className="text-slate-300">
                        We use your phone number to contact you via WhatsApp for booking confirmations, updates, and customer support related to your reservations.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border-l-4 border-gold rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        ✓ Service Improvement
                      </h3>
                      <p className="text-slate-300">
                        We analyze aggregated, non-identifiable data to improve our services, understand user preferences, and enhance your experience on our website.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border-l-4 border-gold rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        ✓ Marketing & Promotions
                      </h3>
                      <p className="text-slate-300">
                        With your consent, we may send promotional offers, updates about new services, and special deals relevant to your interests.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border-l-4 border-gold rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        ✓ Legal Compliance
                      </h3>
                      <p className="text-slate-300">
                        We may use your information to comply with legal obligations and protect our business interests.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies & Tracking */}
            <section id="cookies" className="scroll-mt-20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/20 rounded-lg mt-1">
                  <Lock className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Cookies & Tracking Technologies
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    Our website uses cookies to ensure optimal functionality and user experience. Here's what you need to know:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Essential Cookies
                      </h3>
                      <p className="text-slate-300">
                        These cookies are necessary for the basic functioning of our website, including session management and form submission tracking. They cannot be disabled as they are essential for the site to work properly.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Analytics Cookies
                      </h3>
                      <p className="text-slate-300">
                        We may use analytics cookies (such as Google Analytics) to understand how you use our website, which pages are most popular, and how we can improve our services. These cookies don't identify you personally.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Advertising Cookies
                      </h3>
                      <p className="text-slate-300">
                        We may use tools like Google Ads to show you relevant advertisements across other websites. These cookies help us understand which ads are effective and provide you with content that matches your interests.
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-lg leading-relaxed mt-6">
                    You can control cookie preferences in your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section id="third-party" className="scroll-mt-20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/20 rounded-lg mt-1">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Third-Party Services
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    To provide you with the best experience, we partner with the following third-party services:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        🗨️ WhatsApp Business
                      </h3>
                      <p className="text-slate-300 mb-2">
                        We use WhatsApp to communicate with you regarding your bookings and provide customer support. When you share your phone number with us, it may be saved in our WhatsApp Business account for future reference.
                      </p>
                      <p className="text-slate-400 text-sm">
                        Learn more: <a href="https://www.whatsapp.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">WhatsApp Privacy Policy</a>
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        🌐 Vercel (Hosting Provider)
                      </h3>
                      <p className="text-slate-300 mb-2">
                        Our website is hosted on Vercel's cloud infrastructure. Vercel may collect technical data (such as IP addresses and browser information) to maintain website security and performance.
                      </p>
                      <p className="text-slate-400 text-sm">
                        Learn more: <a href="https://vercel.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Vercel Privacy Policy</a>
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        📊 Google Analytics
                      </h3>
                      <p className="text-slate-300 mb-2">
                        We may use Google Analytics to analyze website traffic and user behavior. This helps us understand how visitors interact with our site and improve user experience.
                      </p>
                      <p className="text-slate-400 text-sm">
                        Learn more: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Google Privacy Policy</a>
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-lg leading-relaxed mt-6">
                    These third parties are contractually obligated to use your information only as necessary to provide their services and in accordance with applicable privacy laws.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section id="rights" className="scroll-mt-20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/20 rounded-lg mt-1">
                  <Trash2 className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Your Rights & Data Control
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    You have important rights regarding your personal data:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 border-l-4 border-gold rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Right to Access
                      </h3>
                      <p className="text-slate-300">
                        You can request a copy of all personal information we hold about you at any time.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border-l-4 border-gold rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Right to Correction
                      </h3>
                      <p className="text-slate-300">
                        If any of your personal information is inaccurate or outdated, you can request that we update or correct it.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border-l-4 border-gold rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Right to Deletion
                      </h3>
                      <p className="text-slate-300">
                        You can request that we delete your personal data, except where we are legally required to retain it for booking and legal purposes.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border-l-4 border-gold rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Right to Opt-Out
                      </h3>
                      <p className="text-slate-300">
                        You can opt out of marketing communications and analytics tracking at any time by contacting us directly.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 border-l-4 border-gold rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-2">
                        Right to Data Portability
                      </h3>
                      <p className="text-slate-300">
                        You can request your data in a standard format so you can transfer it to another service provider.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gold/10 border border-gold/20 rounded-lg">
                    <p className="text-slate-300">
                      To exercise any of these rights, please contact us using the information in the "Contact Us" section below. We aim to respond to all data requests within 30 days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Us */}
            <section id="contact" className="scroll-mt-20">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/20 rounded-lg mt-1">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Contact Us
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please don't hesitate to reach out:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-3 flex items-center gap-2">
                        <span>💬</span> WhatsApp
                      </h3>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-gold/30 text-gold hover:bg-gold/10"
                      >
                        <a href="https://wa.me/201055777826" target="_blank" rel="noopener noreferrer">
                          Chat on WhatsApp
                        </a>
                      </Button>
                    </div>

                    <div className="p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-gold mb-3 flex items-center gap-2">
                        <span>📧</span> Email
                      </h3>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-gold/30 text-gold hover:bg-gold/10"
                      >
                        <a href="mailto:sharmrental@gmail.com">
                          Send Email
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-slate-900/50 border border-gold/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-gold mb-2">
                      Standard Response Time
                    </h3>
                    <p className="text-slate-300">
                      We aim to respond to all privacy inquiries within 24-48 hours during business days. For urgent matters, please mention "URGENT" in your message.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Notice */}
            <section className="mt-16 p-6 bg-gold/5 border border-gold/20 rounded-lg">
              <h3 className="text-xl font-semibold text-gold mb-3">
                ⚖️ Policy Updates
              </h3>
              <p className="text-slate-300 leading-relaxed">
                We reserve the right to update this Privacy Policy at any time to reflect changes in our practices or applicable laws. Any significant changes will be announced on our website. Your continued use of our services following the posting of changes constitutes your acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Navigation Back */}
            <div className="flex gap-4 mt-12 pt-8 border-t border-gold/10">
              <Button
                asChild
                className="bg-gold text-slate-900 hover:bg-gold/90 font-semibold"
              >
                <Link href="/">← Back to Home</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10"
              >
                <Link href="/catalog">Browse Vehicles →</Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
