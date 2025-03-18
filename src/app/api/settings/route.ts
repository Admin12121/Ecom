import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const filePath = path.resolve(
  process.cwd(),
  "src/app/(app)/(user)/siteconfig.json"
);

const componentSchema = z.object({
  visible: z.boolean(),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
})

const sliderItemSchema = z.object({
  image: z.string().url("Please enter a valid image URL"),
  href: z.string(),
})

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  color: z.string(),
})

const messageSchema = z.object({
  message: z.string(),
  date: z.string(),
})

const subcategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
})

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  subcategory: z.array(subcategorySchema),
})

const metalSchema = z.object({
  name: z.string().min(1, "Name is required"),
})

const colorSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  color: z.string().optional(),
})

const materialsSchema = z.object({
  metals: z.array(metalSchema),
  color: z.array(colorSchema),
})

const filtersSchema = z.object({
  category: z.array(categorySchema),
  materials: materialsSchema,
})


const settingsSchema = z.object({
  components: z.object({
    products: componentSchema,
    trendingProducts: componentSchema,
    recentProducts: componentSchema,
    recommendedProducts: componentSchema,
    store: componentSchema,
  }),
  slider: z.array(sliderItemSchema).min(1, "At least one slider image is required"),
  events: z.array(eventSchema).min(1, "At least one event is required"),
  messages: messageSchema,
  filters: filtersSchema,
})


function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath)
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true })
  }
}

function readSettings() {
  try {
    if (!fs.existsSync(filePath)) {
      return null
    }
    const data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading settings:", error)
    return null
  }
}

function writeSettings(data: any) {
  try {
    ensureDirectoryExists(filePath)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error writing settings:", error)
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    const settings = readSettings()

    if (!settings) {
      return NextResponse.json({ error: "Settings file not found or invalid" }, { status: 404 })
    }
    try {
      settingsSchema.parse(settings)
    } catch (validationError) {
      console.error("Settings validation error:", validationError)
    }

    return NextResponse.json(settings, { status: 200 })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}
export async function POST(request: NextRequest) {
  try {
    const newSettings = await request.json()

    try {
      settingsSchema.parse(newSettings)
    } catch (validationError: any) {
      console.error("Settings validation error:", validationError)
      return NextResponse.json(
        {
          error: "Invalid settings data",
          details: validationError.errors || validationError.message,
        },
        { status: 400 },
      )
    }

    if (newSettings.filters?.materials?.color) {
      newSettings.filters.materials.color = newSettings.filters.materials.color.map((color: any, index: number) => {
        return {
          ...(color.id ? { id: color.id } : { id: index + 1 }),
          name: color.name,
          ...(color.color ? { color: color.color } : {}),
        }
      })
    }

    const success = writeSettings(newSettings)

    if (!success) {
      return NextResponse.json({ error: "Failed to write settings to file" }, { status: 500 })
    }

    return NextResponse.json({ message: "Settings updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
