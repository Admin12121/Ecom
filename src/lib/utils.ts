import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";
import { EventEmitter } from "events";

const NEXTAUTH_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const cookiesArray = document.cookie.split(";");

  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }

  return null;
}

export const updateWishlist = (productId: string): void => {
  const encryptedWishlist = localStorage.getItem("wishlist");
  const wishlist = encryptedWishlist
    ? JSON.parse(
        CryptoJS.AES.decrypt(encryptedWishlist, NEXTAUTH_SECRET).toString(
          CryptoJS.enc.Utf8
        )
      )
    : [];
  const productIndex = wishlist.indexOf(productId);
  if (productIndex > -1) {
    wishlist.splice(productIndex, 1);
  } else {
    wishlist.push(productId);
  }
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(wishlist),
    NEXTAUTH_SECRET
  ).toString();
  localStorage.setItem("wishlist", encryptedData);
};

export const isProductInWishlist = (productId: string): boolean => {
  const encryptedWishlist = localStorage.getItem("wishlist");
  if (!encryptedWishlist) return false;
  const wishlist = JSON.parse(
    CryptoJS.AES.decrypt(encryptedWishlist, NEXTAUTH_SECRET).toString(
      CryptoJS.enc.Utf8
    )
  );
  return wishlist.includes(productId);
};

export const getWishlist = (): string[] => {
  const encryptedWishlist = localStorage.getItem("wishlist");
  if (!encryptedWishlist) return [];
  return JSON.parse(
    CryptoJS.AES.decrypt(encryptedWishlist, NEXTAUTH_SECRET).toString(
      CryptoJS.enc.Utf8
    )
  );
};

interface CartProduct {
  id?: number | null;
  product: number;
  variant: number;
  pcs?: number;
}

const cartEventEmitter = new EventEmitter();
export const cartEvents = {
  on: (event: string, listener: (...args: any[]) => void) => {
    cartEventEmitter.on(event, listener);
  },
  emit: (event: string, ...args: any[]) => {
    cartEventEmitter.emit(event, ...args);
  },
  off: (event: string, listener: (...args: any[]) => void) => {
    cartEventEmitter.off(event, listener);
  },
};

export const getDecryptedProductList = (): CartProduct[] => {
  const encryptedProductList = localStorage.getItem("productList");
  if (!encryptedProductList) return [];
  return JSON.parse(
    CryptoJS.AES.decrypt(encryptedProductList, NEXTAUTH_SECRET).toString(
      CryptoJS.enc.Utf8
    )
  );
};

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

export function unslugify(str: string) {
  return str.replace(/-/g, " ")
}