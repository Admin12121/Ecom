import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

function xorEncryptDecrypt(data: string, key: string) {
  return Array.from(data)
    .map((char: string, index: number) =>
      String.fromCharCode(
        char.charCodeAt(0) ^ key.charCodeAt(index % key.length)
      )
    )
    .join("");
}

function encryptData(data: Record<string, any>, key: string): string {
  const token = key.slice(0, 32);
  const jsonData = JSON.stringify(data);
  const encrypted = xorEncryptDecrypt(jsonData, token);
  return btoa(encrypted);
}

export async function GET(request: NextRequest) {
  try {
    const key = "https://www.nrb.org.np/api/forex/v1/app-rate";
    const response = await axios.get(
      "https://www.nrb.org.np/api/forex/v1/app-rate"
    );
    const currencyData = Array.isArray(response.data)
      ? response.data
      : JSON.parse(response.data.replace(/.*\[(.*)\]/s, "[$1]"));

    if (currencyData) {
      const data = encryptData(currencyData, key);
      return NextResponse.json({ data }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching forex rates:", error);
    return NextResponse.json(
      { error: "Failed to fetch forex rates" },
      { status: 500 }
    );
  }
}
