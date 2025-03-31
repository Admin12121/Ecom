// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Trash2,
  Plus,
  Save,
  ImageIcon,
  AlertCircle,
  Settings,
  Layers,
  ImageIcon as ImageIcon2,
  MessageSquare,
  Filter,
  Edit,
} from "lucide-react";
import Image from "next/image";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HexColorPicker } from "react-colorful"
import LogoAnimation from "@/components/global/logo_animation";


const componentSchema = z.object({
  visible: z.boolean(),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
});

const sliderSchema = z
  .array(
    z.object({
      image: z.string().url("Please enter a valid image URL"),
      href: z.string(),
    })
  )
  .min(1, "At least one slider image is required")
  .max(6, "Maximum 6 slider images allowed");

const eventSchema = z
  .array(
    z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      color: z.string().min(1, "Color is required"),
    })
  )
  .min(1, "At least one event is required")
  .max(2, "Maximum 2 events allowed");

const messageSchema = z.object({
  message: z.string(),
  date: z.string(),
});

const filterItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
});

const subCategorySchema = filterItemSchema.extend({
  parentId: z.string().min(1, "Parent category is required"),
});

const colorFilterSchema = filterItemSchema.extend({
  color: z.string().min(1, "Color code is required"),
});

const filtersSchema = z.object({
  categories: z.array(filterItemSchema),
  subcategories: z.array(subCategorySchema),
  metals: z.array(filterItemSchema),
  colors: z.array(colorFilterSchema),
});

const settingsSchema = z.object({
  components: z.object({
    products: componentSchema,
    trendingProducts: componentSchema,
    recentProducts: componentSchema,
    recommendedProducts: componentSchema,
    store: componentSchema,
  }),
  slider: sliderSchema,
  events: eventSchema,
  messages: messageSchema,
  filters: filtersSchema,
});

type SettingsFormValues = z.infer<typeof settingsSchema>;
type FilterItem = z.infer<typeof filterItemSchema>;
type SubCategoryItem = z.infer<typeof subCategorySchema>;
type ColorFilterItem = z.infer<typeof colorFilterSchema>;

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState("components");
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFilter, setEditingFilter] = useState<{
    type: "category" | "subcategory" | "metal" | "color";
    item: FilterItem | SubCategoryItem | ColorFilterItem | null;
    isNew: boolean;
  } | null>(null);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || {
      components: {
        products: { visible: true, title: "", subtitle: "" },
        trendingProducts: { visible: true, title: "", subtitle: "" },
        recentProducts: { visible: false, title: "", subtitle: "" },
        recommendedProducts: { visible: true, title: "", subtitle: "" },
        store: { visible: true, title: "", subtitle: "" },
      },
      slider: [{ image: "", href: "" }],
      events: [{ title: "", description: "", color: "#f87171" }],
      messages: { message: "", date: "" },
      filters: {
        categories: [],
        subcategories: [],
        metals: [],
        colors: [],
      },
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/settings")
      .then((response) => {
        const apiData = response.data;

        const transformedFilters = {
          categories: [],
          subcategories: [],
          metals: [],
          colors: [],
        };

        if (apiData?.filters) {
          if (Array.isArray(apiData.filters.category)) {
            apiData.filters.category.forEach((cat, catIndex) => {
              const categoryId = (catIndex + 1).toString();
              transformedFilters.categories.push({
                id: categoryId,
                name: cat.name || `Category ${categoryId}`,
              });

              if (Array.isArray(cat.subcategory)) {
                cat.subcategory.forEach((subcat, subcatIndex) => {
                  transformedFilters.subcategories.push({
                    id: `${categoryId}-${subcatIndex + 1}`,
                    parentId: categoryId,
                    name: subcat.name || `Subcategory ${subcatIndex + 1}`,
                  });
                });
              }
            });
          }

          if (
            apiData.filters.materials?.metals &&
            Array.isArray(apiData.filters.materials.metals)
          ) {
            apiData.filters.materials.metals.forEach((metal, index) => {
              transformedFilters.metals.push({
                id: (index + 1).toString(),
                name: metal.name || `Metal ${index + 1}`,
              });
            });
          }

          if (
            apiData.filters.materials?.color &&
            Array.isArray(apiData.filters.materials.color)
          ) {
            apiData.filters.materials.color.forEach((color, index) => {
              transformedFilters.colors.push({
                id: (index + 1).toString(),
                name: color.name || `Color ${index + 1}`,
                color: color.color || color.name || "#000000",
              });
            });
          }
        }

        const messages = apiData.messages || { message: "", date: "" };

        const transformedData = {
          ...apiData,
          messages,
          filters: transformedFilters,
        };

        setSettings(transformedData);
        form.reset(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
        setError(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form]);

  const onSubmit = (data: SettingsFormValues) => {
    setLoading(true)

    const transformedData = {
      ...data,
      filters: {
        category: [],
        materials: {
          metals: [],
          color: [],
        },
      },
    }

    if (Array.isArray(data.filters.categories)) {
      data.filters.categories.forEach((category) => {
        const subcategories = Array.isArray(data.filters.subcategories)
          ? data.filters.subcategories.filter((sub) => sub.parentId === category.id).map((sub) => ({ name: sub.name }))
          : []

        transformedData.filters.category.push({
          name: category.name,
          subcategory: subcategories,
        })
      })
    }

    if (Array.isArray(data.filters.metals)) {
      transformedData.filters.materials.metals = data.filters.metals.map((metal) => ({
        name: metal.name,
      }))
    }

    if (Array.isArray(data.filters.colors)) {
      transformedData.filters.materials.color = data.filters.colors.map((color) => ({
        name: color.name,
        color: color.color,
      }))
    }

    axios
      .post("/api/settings", transformedData)
      .then((response) => {
        setSettings(data)
        setLoading(false)
        toast.success("Settings updated")
      })
      .catch((error) => {
        console.error("Error saving settings:", error)
        setError(error)
        setLoading(false)
        toast.error("Error saving settings")
      })
  }

  const addSliderItem = () => {
    if (form.getValues().slider.length >= 6) {
      toast.warning("Maximum limit reached");
      return;
    }

    const currentSlider = form.getValues().slider;
    form.setValue("slider", [...currentSlider, { image: "", href: "" }], {
      shouldValidate: true,
    });
  };

  const removeSliderItem = (index: number) => {
    const currentSlider = form.getValues().slider;
    if (currentSlider.length <= 1) {
      toast.error("Cannot remove");
      return;
    }

    const newSlider = [...currentSlider];
    newSlider.splice(index, 1);
    form.setValue("slider", newSlider, { shouldValidate: true });
  };

  const addEventItem = () => {
    if (form.getValues().events.length >= 2) {
      toast.warning("Maximum limit reached");
      return;
    }

    const currentEvents = form.getValues().events;
    form.setValue(
      "events",
      [...currentEvents, { title: "", description: "", color: "#4f46e5" }],
      {
        shouldValidate: true,
      }
    );
  };

  const removeEventItem = (index: number) => {
    const currentEvents = form.getValues().events;
    if (currentEvents.length <= 1) {
      toast.error("Cannot remove");
      return;
    }

    const newEvents = [...currentEvents];
    newEvents.splice(index, 1);
    form.setValue("events", newEvents, { shouldValidate: true });
  };

  const addFilterItem = (
    type: "category" | "subcategory" | "metal" | "color"
  ) => {
    const newItem: any = {
      id: Date.now().toString(),
      name: "",
    };

    if (type === "subcategory") {
      newItem.parentId = form.getValues().filters.categories[0]?.id || "";
    }

    if (type === "color") {
      newItem.color = "#000000";
    }

    setEditingFilter({
      type,
      item: newItem,
      isNew: true,
    });
  };

  const editFilterItem = (
    type: "category" | "subcategory" | "metal" | "color",
    item: any
  ) => {
    setEditingFilter({
      type,
      item: { ...item },
      isNew: false,
    });
  };

  const saveFilterItem = () => {
    if (!editingFilter) return;

    const { type, item, isNew } = editingFilter;
    const currentFilters = { ...form.getValues().filters };

    if (isNew) {
      currentFilters[
        type === "subcategory"
          ? "subcategories"
          : type === "color"
          ? "colors"
          : type === "metal"
          ? "metals"
          : "categories"
      ] = [
        ...currentFilters[
          type === "subcategory"
            ? "subcategories"
            : type === "color"
            ? "colors"
            : type === "metal"
            ? "metals"
            : "categories"
        ],
        item,
      ];
    } else {
      const items =
        currentFilters[
          type === "subcategory"
            ? "subcategories"
            : type === "color"
            ? "colors"
            : type === "metal"
            ? "metals"
            : "categories"
        ];
      const index = items.findIndex((i: any) => i.id === item.id);
      if (index !== -1) {
        items[index] = item;
      }
    }

    form.setValue("filters", currentFilters, { shouldValidate: true });
    setEditingFilter(null);

    toast.success(isNew ? "Item added" : "Item updated");
  };

  const removeFilterItem = (
    type: "category" | "subcategory" | "metal" | "color",
    id: string
  ) => {
    const currentFilters = { ...form.getValues().filters };
    const items =
      currentFilters[
        type === "subcategory"
          ? "subcategories"
          : type === "color"
          ? "colors"
          : type === "metal"
          ? "metals"
          : "categories"
      ];

      if (type === "category") {
      const hasSubcategories = currentFilters.subcategories.some(
        (sub: SubCategoryItem) => sub.parentId === id
      );
      if (hasSubcategories) {
        toast.error("Cannot remove");
        return;
      }
    }

    const newItems = items.filter((item: any) => item.id !== id);
    currentFilters[
      type === "subcategory"
        ? "subcategories"
        : type === "color"
        ? "colors"
        : type === "metal"
        ? "metals"
        : "categories"
    ] = newItems;

    form.setValue("filters", currentFilters, { shouldValidate: true });

    toast.success("Item removed");
  };

  const getCategoryName = (id: string) => {
    const categories = form.getValues().filters?.categories || [];
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : "Unknown";
  };

  return (
    <div className="flex min-h-[94dvh] max-h-[94dvh] overflow-hidden w-full p-2 gap-2">
      <div className="hidden w-64 flex-col border-r bg-background p-2 md:flex rounded-xl">
        <div className="flex items-center gap-2 font-semibold text-lg mb-2 px-1 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Settings Dashboard
        </div>
        <nav className="flex flex-col gap-2">
          <Button
            variant={activeTab === "components" ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("components")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Components
          </Button>
          <Button
            variant={activeTab === "slider" ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("slider")}
          >
            <ImageIcon2 className="mr-2 h-4 w-4" />
            Slider
          </Button>
          <Button
            variant={activeTab === "events" ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("events")}
          >
            <Layers className="mr-2 h-4 w-4" />
            Events
          </Button>
          <Button
            variant={activeTab === "filters" ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("filters")}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button
            variant={activeTab === "messages" ? "default" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("messages")}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </nav>
      </div>

      <div className="flex-1 p-2 min-h-[92.5dvh] max-h-[92.5dvh] overflow-y-auto !rounded-xl">
        {loading && !settings ? (
          <div className="flex h-[80vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <LogoAnimation className="h-[85px]">
                Nepal Heritage Handicraft
              </LogoAnimation>
            </div>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load settings. Please refresh the page or try again
              later.
            </AlertDescription>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </Alert>
        ) : settings ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {activeTab === "components" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">
                        Components
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        Manage the visibility and content of your homepage
                        components.
                      </p>
                    </div>
                    <Button type="submit" size="lg" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                  <Separator />

                  <div className="grid gap-6">
                    {Object.entries(form.getValues().components || {}).map(
                      ([key, component]) => (
                        <Card
                          key={key}
                          className="overflow-hidden border-2 hover:border-primary/50 transition-all"
                        >
                          <CardHeader className="bg-muted/50 rounded-xl p-2 flex justify-center">
                            <div className="flex items-center justify-between">
                              <CardTitle className="capitalize flex items-center">
                                <div className="bg-primary/10 p-2 rounded-md mr-3">
                                  <Settings className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  {key.replace(/([A-Z])/g, " $1")}
                                  <CardDescription className="text-xs">
                                    Configure how this component appears on your
                                    website
                                  </CardDescription>
                                </div>
                              </CardTitle>
                              <FormField
                                control={form.control}
                                name={`components.${key}.visible` as any}
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {field.value ? "Visible" : "Hidden"}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </CardHeader>
                          <CardContent className="grid gap-4 py-4">
                            <FormField
                              control={form.control}
                              name={`components.${key}.title` as any}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <Input {...field} className="!bg-muted" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`components.${key}.subtitle` as any}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Subtitle</FormLabel>
                                  <FormControl>
                                    <Input {...field} className="!bg-muted" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CardContent>
                          <CardFooter className="bg-muted/30 px-2 border-t flex justify-between py-3">
                            <div className="text-xs text-muted-foreground">
                              Last updated: Today
                            </div>
                            <Badge
                              variant={
                                component.visible ? "default" : "outline"
                              }
                            >
                              {component.visible ? "Active" : "Inactive"}
                            </Badge>
                          </CardFooter>
                        </Card>
                      )
                    )}
                  </div>
                </div>
              )}
              {activeTab === "slider" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">
                        Slider Images
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        Manage your homepage slider images. You can have between
                        1 and 6 images.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addSliderItem}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Image
                      </Button>
                      <Button type="submit" size="lg" disabled={loading}>
                        {loading ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <Separator />

                  <Alert className="bg-primary/5 border-primary/20">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      You must have at least one slider image and can have up to
                      six. Each image should be high quality and represent your
                      brand.
                    </AlertDescription>
                  </Alert>

                  <div className="grid gap-6">
                    {form.getValues().slider?.map((_, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden border-2 hover:border-primary/50 transition-all"
                      >
                        <CardHeader className="bg-muted/50 p-2 rounded-xl">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <div className="bg-primary/10 p-2 rounded-md mr-3">
                                <ImageIcon2 className="h-5 w-5 text-primary" />
                              </div>
                              Slider Image {index + 1}
                            </CardTitle>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSliderItem(index)}
                              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="grid gap-6 py-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name={`slider.${index}.image`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Image URL</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="https://example.com/image.jpg"
                                      className="!bg-muted"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`slider.${index}.href`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Link URL (Optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="https://example.com/page"
                                      className="!bg-muted"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name={`slider.${index}.image`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preview</FormLabel>
                                <FormControl>
                                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border bg-muted">
                                    {field.value ? (
                                      <Image
                                        src={field.value || "/placeholder.svg"}
                                        alt={`Slider image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="flex h-full items-center justify-center">
                                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </CardContent>
                        <CardFooter className="bg-muted/30 border-t flex justify-between p-3">
                          <div className="text-xs text-muted-foreground">
                            Last updated: Today
                          </div>
                          <Badge variant="outline">
                            {form.getValues().slider?.[index]?.href
                              ? "With Link"
                              : "No Link"}
                          </Badge>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "events" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">
                        Events
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        Manage your promotional events. You can have between 1
                        and 2 events.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addEventItem}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Event
                      </Button>
                      <Button type="submit" size="lg" disabled={loading}>
                        {loading ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <Separator />

                  <div className="grid gap-6">
                    {form.getValues().events?.map((_, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden border-2 hover:border-primary/50 transition-all"
                      >
                        <CardHeader className="bg-muted/50 p-2 rounded-xl">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <div className="bg-primary/10 p-2 rounded-md mr-3">
                                <Layers className="h-5 w-5 text-primary" />
                              </div>
                              Event {index + 1}
                            </CardTitle>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeEventItem(index)}
                              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="grid gap-6 py-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name={`events.${index}.title`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Event title"
                                      className="!bg-muted"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`events.${index}.color`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Color</FormLabel>
                                  <FormControl>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="h-10 w-10 rounded-md border"
                                        style={{ backgroundColor: field.value }}
                                      />
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <Button variant="outline" size="sm">
                                            Choose Color
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                          className="w-auto p-0"
                                          align="start"
                                        >
                                          <HexColorPicker
                                            color={field.value}
                                            onChange={field.onChange}
                                            className="p-2"
                                          />
                                        </PopoverContent>
                                      </Popover>
                                      <Input
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="w-24 bg-background"
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name={`events.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    placeholder="Event description"
                                    className="min-h-[100px] !bg-muted"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                        <CardFooter className="bg-muted/30 border-t flex justify-between p-3">
                          <div className="text-xs text-muted-foreground">
                            Last updated: Today
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "filters" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">
                        Filters
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        Manage product filtering options for your store.
                      </p>
                    </div>
                    <Button type="submit" size="lg" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                  <Separator />

                  <Tabs defaultValue="categories" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-6">
                      <TabsTrigger value="categories">
                        Categories & Subcategories
                      </TabsTrigger>
                      <TabsTrigger value="attributes">
                        Metals & Colors
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="categories" className="space-y-6">
                      <Card className="overflow-hidden border-2">
                        <CardHeader className="bg-muted/50 p-2 rounded-xl">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <div className="bg-primary/10 p-2 rounded-md mr-3">
                                <Filter className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                Categories
                                <CardDescription className="text-xs">
                                  Manage the main product categories for your
                                  store
                                </CardDescription>
                              </div>
                            </CardTitle>
                            <Button
                              onClick={() => addFilterItem("category")}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Category
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">
                                  Actions
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {settings?.filters?.categories &&
                                form
                                  .getValues()
                                  .filters.categories.map((category) => (
                                    <TableRow key={category.id}>
                                      <TableCell className="font-medium">
                                        {category.name}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                              editFilterItem(
                                                "category",
                                                category
                                              )
                                            }
                                          >
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">
                                              Edit
                                            </span>
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive"
                                            onClick={() =>
                                              removeFilterItem(
                                                "category",
                                                category.id
                                              )
                                            }
                                          >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">
                                              Delete
                                            </span>
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-2">
                        <CardHeader className="bg-muted/50 p-2 rounded-xl">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <div className="bg-primary/10 p-2 rounded-md mr-3">
                                <Filter className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                Subcategories
                                <CardDescription className="text-xs">
                                  Manage subcategories that belong to main
                                  categories
                                </CardDescription>
                              </div>
                            </CardTitle>
                            <Button
                              onClick={() => addFilterItem("subcategory")}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Subcategory
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Parent Category</TableHead>
                                <TableHead className="text-right">
                                  Actions
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {settings?.filters?.subcategories &&
                                form
                                  .getValues()
                                  .filters.subcategories.map((subcategory) => (
                                    <TableRow key={subcategory.id}>
                                      <TableCell className="font-medium">
                                        {subcategory.name}
                                      </TableCell>
                                      <TableCell>
                                        {getCategoryName(subcategory.parentId)}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                              editFilterItem(
                                                "subcategory",
                                                subcategory
                                              )
                                            }
                                          >
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">
                                              Edit
                                            </span>
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive"
                                            onClick={() =>
                                              removeFilterItem(
                                                "subcategory",
                                                subcategory.id
                                              )
                                            }
                                          >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">
                                              Delete
                                            </span>
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="attributes" className="space-y-6">
                      <Card className="overflow-hidden border-2">
                        <CardHeader className="bg-muted/50 p-2 rounded-xl">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <div className="bg-primary/10 p-2 rounded-md mr-3">
                                <Filter className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                Metals
                                <CardDescription>
                                  Manage metal types for filtering products
                                </CardDescription>
                              </div>
                            </CardTitle>
                            <Button
                              onClick={() => addFilterItem("metal")}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Metal
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">
                                  Actions
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {settings?.filters?.metals &&
                                form.getValues().filters.metals.map((metal) => (
                                  <TableRow key={metal.id}>
                                    <TableCell className="font-medium">
                                      {metal.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            editFilterItem("metal", metal)
                                          }
                                        >
                                          <Edit className="h-4 w-4" />
                                          <span className="sr-only">Edit</span>
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="text-destructive"
                                          onClick={() =>
                                            removeFilterItem("metal", metal.id)
                                          }
                                        >
                                          <Trash2 className="h-4 w-4" />
                                          <span className="sr-only">
                                            Delete
                                          </span>
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                      <Card className="overflow-hidden border-2">
                        <CardHeader className="bg-muted/50 p-2 rounded-xl">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <div className="bg-primary/10 p-2 rounded-md mr-3">
                                <Filter className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                Colors
                                <CardDescription className="text-xs">
                                  Manage color options for filtering products
                                </CardDescription>
                              </div>
                            </CardTitle>
                            <Button
                              onClick={() => addFilterItem("color")}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Color
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Color</TableHead>
                                <TableHead className="text-right">
                                  Actions
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {settings?.filters?.colors &&
                                form.getValues().filters.colors.map((color) => (
                                  <TableRow key={color.id}>
                                    <TableCell className="font-medium">
                                      {color.name}
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <div
                                          className="h-6 w-6 rounded-md border"
                                          style={{
                                            backgroundColor: color.color,
                                          }}
                                        />
                                        <span>{color.color}</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            editFilterItem("color", color)
                                          }
                                        >
                                          <Edit className="h-4 w-4" />
                                          <span className="sr-only">Edit</span>
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="text-destructive"
                                          onClick={() =>
                                            removeFilterItem("color", color.id)
                                          }
                                        >
                                          <Trash2 className="h-4 w-4" />
                                          <span className="sr-only">
                                            Delete
                                          </span>
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              {activeTab === "messages" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight">
                        Messages
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        Set a global message to display on your website.
                      </p>
                    </div>
                    <Button type="submit" size="lg" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                  <Separator />

                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all">
                    <CardHeader className="bg-muted/50  p-2 rounded-xl">
                      <CardTitle className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-md mr-3">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          Global Message
                          <CardDescription className="text-xs">
                            This message will be displayed prominently on your
                            website. Leave empty to hide.
                          </CardDescription>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 py-4">
                      <FormField
                        control={form.control}
                        name="messages.message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Enter your message here"
                                className="min-h-[100px] !bg-muted"
                              />
                            </FormControl>
                            <FormDescription>
                              This message will be displayed at the top of your
                              website.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="messages.date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="date"
                                className="!bg-muted"
                              />
                            </FormControl>
                            <FormDescription>
                              The message will be hidden after this date. Leave
                              empty for no expiry.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter className="bg-muted/30 border-t flex justify-between p-2">
                      <div className="text-xs text-muted-foreground">
                        Last updated: Today
                      </div>
                      <Badge
                        variant={
                          form.getValues().messages?.message
                            ? "default"
                            : "outline"
                        }
                      >
                        {form.getValues().messages?.message
                          ? "Active"
                          : "Inactive"}
                      </Badge>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </form>
          </Form>
        ) : null}
      </div>

      {editingFilter && (
        <Dialog
          open={!!editingFilter}
          onOpenChange={() => setEditingFilter(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingFilter.isNew ? "Add New" : "Edit"}{" "}
                {editingFilter.type === "category"
                  ? "Category"
                  : editingFilter.type === "subcategory"
                  ? "Subcategory"
                  : editingFilter.type === "metal"
                  ? "Metal"
                  : "Color"}
              </DialogTitle>
              <DialogDescription>
                Fill in the details below to{" "}
                {editingFilter.isNew ? "create a new" : "update the"} filter
                option.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingFilter.item?.name || ""}
                  onChange={(e) => {
                    const name = e.target.value
                    const updatedItem = { ...editingFilter.item, name }
                    if (editingFilter.type === "color") {
                      updatedItem.color = name.toLowerCase()
                    }

                    setEditingFilter({
                      ...editingFilter,
                      item: updatedItem,
                    })
                  }}
                  className="bg-background"
                />
              </div>

              {editingFilter.type === "subcategory" && (
                <div className="grid gap-2">
                  <Label htmlFor="parentId">Parent Category</Label>
                  <Select
                    value={
                      (editingFilter.item as SubCategoryItem)?.parentId || ""
                    }
                    onValueChange={(value) =>
                      setEditingFilter({
                        ...editingFilter,
                        item: { ...editingFilter.item, parentId: value },
                      })
                    }
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select a parent category" />
                    </SelectTrigger>
                    <SelectContent>
                      {form.getValues().filters.categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {editingFilter.type === "color" && (
                <div className="grid gap-2">
                  <Label htmlFor="color">Color Preview</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-10 w-10 rounded-md border"
                      style={{
                        backgroundColor: (editingFilter.item as ColorFilterItem)?.color || "#000000",
                      }}
                    />
                    <span className="text-sm text-muted-foreground">
                      Color value is automatically set to match the name
                    </span>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingFilter(null)}>
                Cancel
              </Button>
              <Button onClick={saveFilterItem}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
