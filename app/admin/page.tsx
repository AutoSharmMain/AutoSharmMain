"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoreProvider, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { BrandSelector } from "@/components/brand-selector";
import {
  Car,
  Plus,
  Pencil,
  Trash2,
  Newspaper,
  LayoutDashboard,
  LogOut,
  Users,
  MessageSquare,
  Star,
  HelpCircle,
  BookOpen,
  Settings,
  TrendingUp,
  Eye,
  Mail,
  Phone,
  MapPin,
  Clock,
  Lock,
} from "lucide-react";
import { LoginPage } from "./login";
import { verifyAdminSession, logoutAdmin } from "./actions";
import type {
  Vehicle,
  NewsItem,
  VehicleCategory,
  VehicleStatus,
  ListingType,
  VehicleReview,
  CurrencyType,
  RentalPeriod,
  CustomerInquiry,
  Testimonial,
  FAQ,
  ContentPage,
} from "@/lib/data";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has valid session on mount
    const checkAuth = async () => {
      try {
        const authenticated = await verifyAdminSession();
        setIsAuthenticated(authenticated);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#1a1f2e] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Lock className="w-12 h-12 text-gold mx-auto animate-pulse" />
          <p className="text-gold">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <StoreProvider>
      <AdminContent onLogout={handleLogout} />
    </StoreProvider>
  );
}

function AdminContent({ onLogout }: { onLogout: () => void }) {
  const {
    vehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    news,
    addNews,
    updateNews,
    deleteNews,
    inquiries,
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
    settings,
    updateSettings,
    getDashboardStats,
  } = useStore();

  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false);
  const [newsDialogOpen, setNewsDialogOpen] = useState(false);

  const stats = getDashboardStats();

  const statusStyles: Record<VehicleStatus, string> = {
    available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    rented: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    sold: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  const statusLabels: Record<VehicleStatus, string> = {
    available: "Available",
    rented: "Rented",
    sold: "Sold",
  };

  const handleAddVehicle = (data: Omit<Vehicle, "id"> | Partial<Vehicle>) => {
    addVehicle(data as Omit<Vehicle, "id">);
    setVehicleDialogOpen(false);
  };

  const handleUpdateVehicle = (data: Partial<Vehicle>) => {
    if (editingVehicle) {
      updateVehicle(editingVehicle.id, data);
      setEditingVehicle(null);
    }
  };

  const handleAddNews = (data: Omit<NewsItem, "id"> | Partial<NewsItem>) => {
    addNews(data as Omit<NewsItem, "id">);
    setNewsDialogOpen(false);
  };

  const handleUpdateNews = (data: Partial<NewsItem>) => {
    if (editingNews) {
      updateNews(editingNews.id, data);
      setEditingNews(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-primary text-primary-foreground border-b border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-card">
                <Image
                  src="/logo.png"
                  alt="AutoSharm Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h1 className="font-bold">Admin Dashboard</h1>
                <p className="text-xs text-primary-foreground/70">Secure Access</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/">
                  <span className="text-xs">Exit</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Car className="w-4 h-4" /> Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalVehicles}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">{stats.available}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.totalInquiries}</div>
              <p className="text-xs text-muted-foreground mt-1">{stats.newInquiries} new</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Star className="w-4 h-4" /> Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gold">{stats.totalPublishedTestimonials}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye className="w-4 h-4" /> Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{stats.totalPageViews}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="vehicles" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-6 lg:gap-2">
            <TabsTrigger value="vehicles" className="gap-2">
              <Car className="w-4 h-4" /> Vehicles
            </TabsTrigger>
            <TabsTrigger value="news" className="gap-2">
              <Newspaper className="w-4 h-4" /> News
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="gap-2">
              <MessageSquare className="w-4 h-4" /> Inquiries
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2">
              <Star className="w-4 h-4" /> Reviews
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-2">
              <HelpCircle className="w-4 h-4" /> FAQ
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" /> Settings
            </TabsTrigger>
          </TabsList>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage Vehicles</CardTitle>
                <Dialog open={vehicleDialogOpen} onOpenChange={setVehicleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
                      <Plus className="w-4 h-4 mr-2" /> Add Vehicle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Vehicle</DialogTitle>
                    </DialogHeader>
                    <VehicleForm
                      onSubmit={handleAddVehicle}
                      onCancel={() => setVehicleDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>

                {/* Edit Vehicle Modal - Renders when editingVehicle is set */}
                <Dialog open={!!editingVehicle} onOpenChange={(open) => !open && setEditingVehicle(null)}>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Vehicle</DialogTitle>
                    </DialogHeader>
                    {editingVehicle && (
                      <VehicleForm
                        vehicle={editingVehicle}
                        onSubmit={handleUpdateVehicle}
                        onCancel={() => setEditingVehicle(null)}
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell className="font-medium">{vehicle.name}</TableCell>
                          <TableCell className="capitalize">{vehicle.category}</TableCell>
                          <TableCell>
                            ${vehicle.price.toLocaleString()}
                            {vehicle.listingType === "rent" && "/day"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={statusStyles[vehicle.status]}
                            >
                              {statusLabels[vehicle.status]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={vehicle.isFeatured ? "default" : "outline"}>
                              {vehicle.isFeatured ? "Featured" : "-"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingVehicle(vehicle)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => deleteVehicle(vehicle.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Manage News</CardTitle>
                <Dialog open={newsDialogOpen} onOpenChange={setNewsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
                      <Plus className="w-4 h-4 mr-2" /> Add News
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add News Update</DialogTitle>
                    </DialogHeader>
                    <NewsForm
                      onSubmit={handleAddNews}
                      onCancel={() => setNewsDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>

                {/* Edit News Modal - Renders when editingNews is set */}
                <Dialog open={!!editingNews} onOpenChange={(open) => !open && setEditingNews(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit News</DialogTitle>
                    </DialogHeader>
                    {editingNews && (
                      <NewsForm
                        newsItem={editingNews}
                        onSubmit={handleUpdateNews}
                        onCancel={() => setEditingNews(null)}
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news.map((item) => (
                    <Card key={item.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.content}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(item.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingNews(item)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => deleteNews(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {news.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No news yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries">
            <InquiriesTab inquiries={inquiries} deleteInquiry={deleteInquiry} />
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <TestimonialsTab
              testimonials={testimonials}
              addTestimonial={addTestimonial}
              deleteTestimonial={deleteTestimonial}
              publishTestimonial={publishTestimonial}
            />
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <FAQTab faqs={faqs} addFAQ={addFAQ} updateFAQ={updateFAQ} deleteFAQ={deleteFAQ} />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SettingsTab settings={settings} updateSettings={updateSettings} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Vehicle Form Component
function VehicleForm({
  vehicle,
  onSubmit,
  onCancel,
}: {
  vehicle?: Vehicle;
  onSubmit: (data: Omit<Vehicle, "id"> | Partial<Vehicle>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: vehicle?.name || "",
    category: vehicle?.category || ("car" as VehicleCategory),
    listingType: vehicle?.listingType || ("rent" as ListingType),
    price: vehicle?.price?.toString() || "",
    currency: vehicle?.currency || ("USD" as CurrencyType),
    rentalPeriod: vehicle?.rentalPeriod || ("day" as RentalPeriod),
    status: vehicle?.status || ("available" as VehicleStatus),
    description: vehicle?.description || "",
    brand: vehicle?.specs?.brand || "",
    type: vehicle?.specs?.type || "Sedan",
    bodyType: vehicle?.specs?.type || "Sedan",
    seats: vehicle?.specs?.seats || "",
    gearbox: vehicle?.specs?.transmission || "Automatic",
    fuel: vehicle?.specs?.fuel || "Petrol",
    mileage: vehicle?.specs?.mileage || "",
    engine: vehicle?.specs?.engine || "",
    year: vehicle?.specs?.year?.toString() || new Date().getFullYear().toString(),
    isPinned: vehicle?.isPinned || false,
  });

  const [reviews, setReviews] = useState<VehicleReview[]>(vehicle?.reviews || []);
  const [newReview, setNewReview] = useState({ author: "", rating: 5, comment: "" });
  const [showAddReview, setShowAddReview] = useState(false);
  const [images, setImages] = useState<string[]>(
    vehicle?.images && vehicle.images.length > 0 
      ? vehicle.images 
      : vehicle?.image ? [vehicle.image] : []
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Update form data when vehicle prop changes (when editing)
  useEffect(() => {
    if (vehicle) {
      setFormData({
        name: vehicle.name || "",
        category: vehicle.category || ("car" as VehicleCategory),
        listingType: vehicle.listingType || ("rent" as ListingType),
        price: vehicle.price?.toString() || "",
        currency: vehicle.currency || ("USD" as CurrencyType),
        rentalPeriod: vehicle.rentalPeriod || ("day" as RentalPeriod),
        status: vehicle.status || ("available" as VehicleStatus),
        description: vehicle.description || "",
        brand: vehicle?.specs?.brand || "",
        type: vehicle?.specs?.type || "Sedan",
        bodyType: vehicle?.specs?.type || "Sedan",
        seats: vehicle?.specs?.seats || "",
        gearbox: vehicle?.specs?.transmission || "Automatic",
        fuel: vehicle?.specs?.fuel || "Petrol",
        mileage: vehicle?.specs?.mileage || "",
        engine: vehicle?.specs?.engine || "",
        year: vehicle?.specs?.year?.toString() || new Date().getFullYear().toString(),
        isPinned: vehicle.isPinned || false,
      });
      const imagesToSet = vehicle?.images && vehicle.images.length > 0 
        ? vehicle.images 
        : vehicle?.image ? [vehicle.image] : [];
      setImages(imagesToSet);
      setReviews(vehicle?.reviews || []);
    }
  }, [vehicle]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const { supabase } = await import("@/lib/supabase");
      
      // Validate file
      if (!file.type.startsWith("image/")) {
        console.error("❌ File must be an image");
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        console.error("❌ File too large (max 5MB)");
        alert("Image must be less than 5MB");
        return;
      }

      // Generate unique filename - preserve extension
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 9);
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${timestamp}-${randomId}.${extension}`;
      
      // Upload to vehicle-images bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("vehicle-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("❌ Storage upload error:", uploadError);
        alert(`Upload failed: ${uploadError.message}`);
        return;
      }

      if (!uploadData) {
        console.error("❌ No upload data returned");
        alert("Upload failed: No response from server");
        return;
      }

      // Get public URL - the bucket must be public for this to work
      const { data: publicUrlData } = supabase.storage
        .from("vehicle-images")
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData?.publicUrl;

      if (!publicUrl || typeof publicUrl !== "string") {
        console.error("❌ Failed to generate public URL");
        alert("Failed to generate image URL");
        return;
      }

      // Verify the URL is valid
      if (!publicUrl.startsWith("http")) {
        console.error("❌ Invalid public URL format:", publicUrl);
        alert("Invalid URL format from storage");
        return;
      }

      // Add the image URL to state
      setImages((prevImages) => [...prevImages, publicUrl]);
      console.log("✅ Image uploaded successfully:", publicUrl);

      // Reset the input
      if (e.target) {
        e.target.value = "";
      }
    } catch (error) {
      console.error("🔥 Error uploading image:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImageUp = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const newImages = [...prev];
      if (newImages.length > index) {
        [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      }
      return newImages;
    });
  };

  const moveImageDown = (index: number) => {
    setImages((prev) => {
      if (index >= prev.length - 1) return prev;
      const newImages = [...prev];
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
      return newImages;
    });
  };

  const parsePrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    // Remove all whitespace
    let cleaned = priceStr.trim();
    // Remove currency symbols if present
    cleaned = cleaned.replace(/[^0-9.,]/g, "");
    // Handle both European (1.234,56) and US (1,234.56) formats
    const dotCount = (cleaned.match(/\./g) || []).length;
    const commaCount = (cleaned.match(/,/g) || []).length;
    
    if (dotCount > 0 && commaCount > 0) {
      const lastDot = cleaned.lastIndexOf(".");
      const lastComma = cleaned.lastIndexOf(",");
      if (lastDot > lastComma) {
        // US format: remove commas, keep dot
        cleaned = cleaned.replace(/,/g, "");
      } else {
        // European format: remove dots, replace comma with dot
        cleaned = cleaned.replace(/\./g, "").replace(",", ".");
      }
    } else if (commaCount > 0) {
      // Only commas - check if decimal separator
      const parts = cleaned.split(",");
      if (parts[1]?.length === 2) {
        // European: 1234,56 -> 1234.56
        cleaned = cleaned.replace(",", ".");
      } else {
        // US: remove commas (thousands separator)
        cleaned = cleaned.replace(/,/g, "");
      }
    }
    cleaned = cleaned.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      category: formData.category,
      listingType: formData.listingType,
      price: parsePrice(formData.price),
      currency: formData.currency,
      rentalPeriod: formData.listingType === "rent" ? formData.rentalPeriod : undefined,
      status: formData.status,
      description: formData.description,
      image: images[0] || vehicle?.image || "",
      images: images,
      reviews: formData.listingType === "rent" ? reviews : [],
      isPinned: formData.isPinned,
      specs: {
        engine: formData.engine,
        transmission: formData.gearbox,
        fuel: formData.fuel,
        year: parseInt(formData.year) || new Date().getFullYear(),
        mileage: formData.mileage,
        seats: formData.seats,
        brand: formData.brand,
        type: formData.bodyType,
        features: vehicle?.specs?.features || [],
      },
    });

    // Reset form if adding new vehicle (not editing)
    if (!vehicle) {
      setFormData({
        name: "",
        category: "car" as VehicleCategory,
        listingType: "rent" as ListingType,
        price: "",
        currency: "USD" as CurrencyType,
        rentalPeriod: "day" as RentalPeriod,
        status: "available" as VehicleStatus,
        description: "",
        brand: "",
        type: "Sedan",
        bodyType: "Sedan",
        seats: "",
        gearbox: "Automatic",
        fuel: "Petrol",
        mileage: "",
        engine: "",
        year: new Date().getFullYear().toString(),
        isPinned: false,
      });
      setImages([]);
      setReviews([]);
      setShowAddReview(false);
    }
  };

  const addReview = () => {
    if (newReview.author.trim() && newReview.comment.trim()) {
      const review: VehicleReview = {
        id: Date.now().toString(),
        author: newReview.author,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
      };
      setReviews([...reviews, review]);
      setNewReview({ author: "", rating: 5, comment: "" });
      setShowAddReview(false);
    }
  };

  const deleteReview = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Vehicle Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Mercedes-Benz E-Class"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Category</label>
          <Select
            value={formData.category}
            onValueChange={(v) => setFormData({ ...formData, category: v as VehicleCategory })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="car">Car</SelectItem>
              <SelectItem value="motorcycle">Motorcycle</SelectItem>
              <SelectItem value="scooter">Scooter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Listing Type</label>
          <Select
            value={formData.listingType}
            onValueChange={(v) => setFormData({ ...formData, listingType: v as ListingType })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Price</label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="0"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Currency</label>
          <Select
            value={formData.currency}
            onValueChange={(v) => setFormData({ ...formData, currency: v as CurrencyType })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">💵 USD ($)</SelectItem>
              <SelectItem value="EGP">🇪🇬 EGP (£)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {formData.listingType === "rent" && (
        <div>
          <label className="text-sm font-medium">Rental Period</label>
          <Select
            value={formData.rentalPeriod}
            onValueChange={(v) => setFormData({ ...formData, rentalPeriod: v as RentalPeriod })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Per Day</SelectItem>
              <SelectItem value="month">Per Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Status</label>
          <Select
            value={formData.status}
            onValueChange={(v) => setFormData({ ...formData, status: v as VehicleStatus })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="isPinned"
              checked={formData.isPinned}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isPinned: checked === true })
              }
            />
            <label htmlFor="isPinned" className="text-sm font-medium cursor-pointer">
              📌 Pin on Home Page
            </label>
          </div>
        </div>
      </div>

      {/* Vehicle Characteristics Section */}
      <div className="border border-gold/20 rounded-lg p-4 bg-slate-900/50 space-y-4">
        <h3 className="text-sm font-semibold text-gold">🏎️ Vehicle Characteristics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <BrandSelector
              value={formData.brand}
              onChange={(brand) => setFormData({ ...formData, brand })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Body Type</label>
            <Select
              value={formData.bodyType}
              onValueChange={(v) => setFormData({ ...formData, bodyType: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sedan">Sedan</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Convertible">Convertible</SelectItem>
                <SelectItem value="Coupe">Coupe</SelectItem>
                <SelectItem value="Hatchback">Hatchback</SelectItem>
                <SelectItem value="Luxury">Luxury</SelectItem>
                <SelectItem value="none">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Seats</label>
            <Input
              value={formData.seats}
              onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
              placeholder="e.g., 5 seats"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Gearbox</label>
            <Select
              value={formData.gearbox}
              onValueChange={(v) => setFormData({ ...formData, gearbox: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="CVT">CVT</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Fuel Type</label>
            <Select
              value={formData.fuel}
              onValueChange={(v) => setFormData({ ...formData, fuel: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Petrol">Petrol</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Engine</label>
            <Input
              value={formData.engine}
              onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
              placeholder="e.g., 2.0L Turbo"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Year</label>
            <Input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder={new Date().getFullYear().toString()}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Mileage</label>
            <Input
              value={formData.mileage}
              onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
              placeholder="e.g., 15,000 km"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the vehicle..."
          rows={3}
        />
      </div>

      {/* Reviews Management Section - Only for Rent Vehicles */}
      {formData.listingType === "rent" && (
        <div className="border border-gold/20 rounded-lg p-4 bg-slate-900/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gold">⭐ Vehicle Reviews ({reviews.length})</h3>
            {!showAddReview && (
              <Button
                type="button"
                size="sm"
                className="bg-gold text-slate-900 hover:bg-gold/90"
                onClick={() => setShowAddReview(true)}
              >
                + Add Review
              </Button>
            )}
          </div>

          {/* Add Review Form */}
          {showAddReview && (
            <div className="border border-gold/30 rounded-lg p-3 space-y-3 bg-black/30">
              <div>
                <label className="text-xs font-medium">Author Name</label>
                <Input
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  placeholder="Customer name"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium">Rating</label>
                <Select
                  value={newReview.rating.toString()}
                  onValueChange={(v) => setNewReview({ ...newReview, rating: parseInt(v) })}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ (5 stars)</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ (4 stars)</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ (3 stars)</SelectItem>
                    <SelectItem value="2">⭐⭐ (2 stars)</SelectItem>
                    <SelectItem value="1">⭐ (1 star)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium">Comment</label>
                <Textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Review comment..."
                  rows={2}
                  className="text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  className="bg-gold text-slate-900 hover:bg-gold/90"
                  onClick={addReview}
                >
                  Save Review
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowAddReview(false);
                    setNewReview({ author: "", rating: 5, comment: "" });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length > 0 && (
            <div className="space-y-2">
              {reviews.map((review) => (
                <div key={review.id} className="border-l-2 border-gold/50 pl-3 py-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{review.author}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gold">{"⭐".repeat(review.rating)}</span>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{review.comment}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => deleteReview(review.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {reviews.length === 0 && !showAddReview && (
            <p className="text-xs text-muted-foreground text-center py-2">No reviews yet</p>
          )}
        </div>
      )}

      {/* Multi-Photo Upload Section */}
      <div className="border border-gold/20 rounded-lg p-4 bg-slate-900/50">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium">📸 Vehicle Photos Gallery</label>
          <Badge variant="secondary" className="bg-gold text-slate-900">
            {images.length} {images.length === 1 ? "photo" : "photos"}
          </Badge>
        </div>

        {/* Photos Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border-2 border-gold/20 hover:border-gold/50 transition-all"
                />
                {index === 0 && (
                  <Badge className="absolute top-1 left-1 bg-gold text-slate-900 text-xs">
                    Main
                  </Badge>
                )}
                
                {/* Action Buttons */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-gold/20"
                      onClick={() => moveImageUp(index)}
                      title="Move up"
                    >
                      ↑
                    </Button>
                  )}
                  {index < images.length - 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-gold/20"
                      onClick={() => moveImageDown(index)}
                      title="Move down"
                    >
                      ↓
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImage(index)}
                    title="Delete photo"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Photo Button */}
        <div className="border-2 border-dashed border-gold/30 rounded-lg p-4 hover:border-gold/50 transition-colors">
          <label className="cursor-pointer flex flex-col items-center gap-2">
            <div className="text-2xl">📷</div>
            <span className="text-sm font-medium text-gold">
              {isUploadingImage ? "Uploading..." : "Click to add more photos"}
            </span>
            <span className="text-xs text-slate-400">or drag and drop</span>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploadingImage}
              className="hidden"
            />
          </label>
        </div>

        <p className="text-xs text-slate-400 mt-3">
          💡 Tips: Add as many photos as you want! First photo is main. Hover to reorder or delete.
        </p>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="bg-gold text-gold-foreground hover:bg-gold/90">
          {vehicle ? "Update Vehicle" : "Add Vehicle"}
        </Button>
      </DialogFooter>
    </form>
  );
}

// News Form Component
function NewsForm({
  newsItem,
  onSubmit,
  onCancel,
}: {
  newsItem?: NewsItem;
  onSubmit: (data: Omit<NewsItem, "id"> | Partial<NewsItem>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: newsItem?.title || "",
    content: newsItem?.content || "",
    date: newsItem?.date || new Date().toISOString().split("T")[0],
    readMoreUrl: newsItem?.readMoreUrl || "",
  });

  // Update form data when newsItem prop changes (when editing)
  useEffect(() => {
    if (newsItem) {
      setFormData({
        title: newsItem.title || "",
        content: newsItem.content || "",
        date: newsItem.date || new Date().toISOString().split("T")[0],
        readMoreUrl: newsItem.readMoreUrl || "",
      });
    }
  }, [newsItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      content: formData.content,
      date: formData.date,
      readMoreUrl: formData.readMoreUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="News headline..."
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium">Date</label>
        <Input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium">Content</label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Write your news content..."
          rows={4}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium">Read More URL</label>
        <Input
          type="url"
          value={formData.readMoreUrl}
          onChange={(e) => setFormData({ ...formData, readMoreUrl: e.target.value })}
          placeholder="https://example.com/news-details"
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="bg-gold text-gold-foreground hover:bg-gold/90">
          {newsItem ? "Update News" : "Add News"}
        </Button>
      </DialogFooter>
    </form>
  );
}

// Inquiries Tab
function InquiriesTab({
  inquiries,
  deleteInquiry,
}: {
  inquiries: CustomerInquiry[];
  deleteInquiry: (id: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{inquiry.customerName}</p>
                      <p className="text-xs text-muted-foreground">{inquiry.customerPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{inquiry.vehicleName}</TableCell>
                  <TableCell className="max-w-xs truncate">{inquiry.message}</TableCell>
                  <TableCell>
                    <Badge
                      variant={inquiry.status === "new" ? "default" : "outline"}
                    >
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(inquiry.inquiryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => deleteInquiry(inquiry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {inquiries.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No inquiries yet</p>
        )}
      </CardContent>
    </Card>
  );
}

// Testimonials Tab
function TestimonialsTab({
  testimonials,
  addTestimonial,
  deleteTestimonial,
  publishTestimonial,
}: {
  testimonials: Testimonial[];
  addTestimonial: (data: Omit<Testimonial, "id">) => void;
  deleteTestimonial: (id: string) => void;
  publishTestimonial: (id: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    rating: 5,
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTestimonial({
      customerName: formData.customerName,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString().split("T")[0],
      isPublished: false,
    });
    setFormData({ customerName: "", rating: 5, comment: "" });
    setShowForm(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Customer Reviews</CardTitle>
        <Button
          className="bg-gold text-gold-foreground hover:bg-gold/90"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Review
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <form onSubmit={handleSubmit} className="p-4 border border-border rounded-lg space-y-4">
            <Input
              placeholder="Customer name"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
            <Select value={formData.rating.toString()} onValueChange={(v) => setFormData({ ...formData, rating: parseInt(v) })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 4, 3, 2, 1].map((r) => (
                  <SelectItem key={r} value={r.toString()}>
                    {r} Stars
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Review comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={3}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" className="bg-gold text-gold-foreground hover:bg-gold/90">
                Save Review
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold">{testimonial.customerName}</p>
                  <p className="text-sm text-gold">★★★★★ {testimonial.rating}/5</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => publishTestimonial(testimonial.id)}
                  >
                    {testimonial.isPublished ? "Hide" : "Publish"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => deleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{testimonial.comment}</p>
              <Badge variant={testimonial.isPublished ? "default" : "outline"} className="mt-2">
                {testimonial.isPublished ? "Published" : "Draft"}
              </Badge>
            </CardContent>
          </Card>
        ))}
        {testimonials.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No reviews yet</p>
        )}
      </CardContent>
    </Card>
  );
}

// FAQ Tab
function FAQTab({
  faqs,
  addFAQ,
  updateFAQ,
  deleteFAQ,
}: {
  faqs: FAQ[];
  addFAQ: (data: Omit<FAQ, "id">) => void;
  updateFAQ: (id: string, data: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general" as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFAQ({
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
    });
    setFormData({ question: "", answer: "", category: "general" });
    setShowForm(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>FAQs</CardTitle>
        <Button
          className="bg-gold text-gold-foreground hover:bg-gold/90"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="w-4 h-4 mr-2" /> Add FAQ
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <form onSubmit={handleSubmit} className="p-4 border border-border rounded-lg space-y-4">
            <Input
              placeholder="Question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
            />
            <Textarea
              placeholder="Answer"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              rows={3}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" className="bg-gold text-gold-foreground hover:bg-gold/90">
                Save FAQ
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
        {faqs.map((faq) => (
          <Card key={faq.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="font-bold mb-2">{faq.question}</p>
                  <p className="text-muted-foreground text-sm mb-2">{faq.answer}</p>
                  <Badge variant="outline" className="capitalize">
                    {faq.category}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => deleteFAQ(faq.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {faqs.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No FAQs yet</p>
        )}
      </CardContent>
    </Card>
  );
}

// Settings Tab
function SettingsTab({
  settings,
  updateSettings,
}: {
  settings: any;
  updateSettings: (settings: Partial<any>) => void;
}) {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Business Name</label>
              <Input
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Default Policy</label>
            <Textarea
              value={formData.defaultPolicy || ""}
              onChange={(e) => setFormData({ ...formData, defaultPolicy: e.target.value })}
              rows={3}
            />
          </div>
          <Button type="submit" className="bg-gold text-gold-foreground hover:bg-gold/90">
            Save Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
