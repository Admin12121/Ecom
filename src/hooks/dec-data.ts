"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuthUser } from "./use-auth-user";

interface DecryptResult {
  data: any;
  error?: string;
  loading: boolean;
}

function xorEncryptDecrypt(data: string, key: string) {
  return Array.from(data)
    .map((char: string, index: number) =>
      String.fromCharCode(
        char.charCodeAt(0) ^ key.charCodeAt(index % key.length)
      )
    )
    .join("");
}

export function encryptData(data: Record<string, any>, key: string): string {
  const token = key.slice(0, 32);
  const jsonData = JSON.stringify(data);
  const encrypted = xorEncryptDecrypt(jsonData, token);
  return btoa(encrypted);
}

export function decriptData(encryptedData:  { data: string }, key: string): Record<string, any> {
  const token = key.slice(0, 32);  
  const decodedData = atob(encryptedData.data);
  const decrypted = xorEncryptDecrypt(decodedData, token);
  return JSON.parse(decrypted);
}

export function useDecryptedData(
  encryptedData: { data: string } | null,
  isLoading: boolean
): DecryptResult {
  const [loading, setLoading] = useState(isLoading);
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const { accessToken } = useAuthUser();

  const decrypt = useCallback(async () => {
    if (encryptedData && accessToken) {
      try {
        const key = accessToken.slice(0, 32);
        const decodedData = atob(encryptedData.data);
        const decrypted = xorEncryptDecrypt(decodedData, key);
        setData(JSON.parse(decrypted));
        setError(undefined);
      } catch (e) {
        setError("Failed to decrypt data");
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  }, [encryptedData, accessToken]);

  useEffect(() => {
    decrypt();
  }, [encryptedData, accessToken, loading]);

  return { data, error, loading };
}
