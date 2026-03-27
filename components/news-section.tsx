"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { NewsItem } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, ArrowRight } from "lucide-react";
import { TEMP_LINK_URL } from "@/lib/data";

export function NewsSection() {
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
          console.error("❌ Error loading news:", error);
          setNews([]);
        } else if (data && data.length > 0) {
          const transformedNews: NewsItem[] = data.map((n: any) => ({
            id: n.id,
            title: n.title || "",
            content: n.content || "",
            date: n.date || new Date().toISOString(),
            readMoreUrl: n.read_more_url || "",
          }));
          setNews(transformedNews);
          console.log(`✅ Loaded ${transformedNews.length} news items`);
        } else {
          console.log("ℹ️ No news items found");
          setNews([]);
        }
      } catch (error) {
        console.error("🔥 Error fetching news:", error);
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-muted rounded mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-muted rounded mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Latest Updates
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed about our newest vehicles, special offers, and exciting
            announcements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card
              key={item.id}
              className="group hover:shadow-lg transition-shadow duration-300 border-border/50"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <CalendarDays className="w-4 h-4" />
                  <time dateTime={item.date}>
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-gold transition-colors text-balance">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {item.content}
                </p>
                <a 
                  href={item.readMoreUrl || TEMP_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:gap-2 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
