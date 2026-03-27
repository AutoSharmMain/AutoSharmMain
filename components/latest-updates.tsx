"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { NewsItem } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, ArrowRight } from "lucide-react";
import { TEMP_LINK_URL } from "@/lib/data";

export function LatestUpdates() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("date", { ascending: false })
          .limit(3);

        if (error) {
          console.error("❌ Error loading latest updates:", error);
          setNews([]);
          return;
        }

        const transformedNews: NewsItem[] = (data || []).map((n: any) => ({
          id: n.id,
          title: n.title || "",
          content: n.content || "",
          date: n.date || new Date().toISOString(),
          readMoreUrl: n.read_more_url || "",
        }));

        if (transformedNews.length === 0) {
          setNews([]);
          return;
        }

        setNews(transformedNews);
      } catch (error) {
        console.error("🔥 Error fetching latest updates:", error);
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const sectionClasses = "relative w-full py-16 md:py-24 bg-center bg-cover bg-no-repeat";
  const sectionStyle = {
    backgroundImage: "url('/porsche-light.png')",
    backdropFilter: "blur(8px)",
  };

  if (isLoading) {
    return (
      <section
        className={`${sectionClasses} dark:bg-[url('/porsche-dark.png')]`}
        style={sectionStyle}
      >
        <div className="absolute inset-0 bg-white/20 dark:bg-black/50 backdrop-blur-sm" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="h-4 w-48 bg-slate-200 rounded mb-4 animate-pulse" />
          <div className="h-3 w-96 bg-slate-200 rounded animate-pulse" />
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section
        className={`${sectionClasses} dark:bg-[url('/porsche-dark.png')]`}
        style={sectionStyle}
      >
        <div className="absolute inset-0 bg-white/20 dark:bg-black/50 backdrop-blur-sm" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Latest Updates
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            No updates available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${sectionClasses} dark:bg-[url('/porsche-dark.png')]`}
      style={sectionStyle}
    >
      <div className="absolute inset-0 bg-white/20 dark:bg-black/50 backdrop-blur-sm" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Latest Updates
          </h2>
          <p className="text-slate-600 dark:text-slate-200 max-w-2xl mx-auto">
            Stay informed about our newest vehicles, updates and premium offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card
              key={item.id}
              className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-md border border-white/40 bg-white/40 text-slate-800 dark:bg-slate-900/60 dark:border-amber-400/40 dark:text-white pulse-gold-outline"
            >
              <CardContent className="p-0 bg-transparent">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-amber-300 mb-3">
                  <CalendarDays className="w-4 h-4" />
                  <time dateTime={item.date} className="font-semibold">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="font-semibold text-xl md:text-2xl mb-3 text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 line-clamp-3 mb-6">
                  {item.content}
                </p>
                <a
                  href={item.readMoreUrl || TEMP_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-100/30 px-4 py-2 text-xs font-bold text-[#F59E0B] transition-transform duration-200 hover:translate-x-1 hover:text-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 pulse-gold-btn"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
