import { NextRequest, NextResponse } from "next/server";
import { PaymentSchema } from "@/schemas/index";
import CryptoJS from "crypto-js";

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

function decryptData(encryptedData: string, key: string): Record<string, any> {
  const token = key.slice(0, 32);
  const decodedData = atob(encryptedData);
  const decrypted = xorEncryptDecrypt(decodedData, token);
  return JSON.parse(decrypted);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const encryptedData = body.data;
    const authorizationHeader = request.headers.get("authorization");

    if (!encryptedData || !authorizationHeader) {
      return NextResponse.json(
        { error: "Missing encrypted data or authorization header" },
        { status: 400 }
      );
    }
    const token = authorizationHeader.replace("Bearer ", "");
    const key = token.slice(0, 32);
    const decryptedData = decryptData(encryptedData, key);
    const { paymentDetails } = decryptedData;

    const validated = PaymentSchema.safeParse(paymentDetails);
    if (!validated.success) {
      const errors = validated.error.errors.map((err) => err.message);
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }
    const {
      amount,
      tax_amount,
      total_amount,
      transaction_uuid,
      product_code,
      success_url,
      failure_url,
    } = validated.data;
    const secretKey = "8gBm/:&EnhH.1/q";
    const dataString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(dataString, secretKey);
    const signature = CryptoJS.enc.Base64.stringify(hash);
    const formData = {
      amount,
      tax_amount,
      total_amount,
      transaction_uuid,
      product_code,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url,
      failure_url,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature,
    };
    const data = encryptData(formData, key);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}