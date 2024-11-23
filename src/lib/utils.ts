import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from 'crypto-js';
import { toast } from "sonner";
import { EventEmitter } from 'events';
import {
  useCartUpdateMutation,
  useCartDeleteMutation,
} from "@/lib/store/Service/User_Auth_Api";


const NEXTAUTH_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const cookiesArray = document.cookie.split(';');
  
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  
  return null;
}


export const updateWishlist = (productId: string): void => {
  const encryptedWishlist = localStorage.getItem('wishlist');
  const wishlist = encryptedWishlist ? JSON.parse(CryptoJS.AES.decrypt(encryptedWishlist, NEXTAUTH_SECRET).toString(CryptoJS.enc.Utf8)) : [];
  const productIndex = wishlist.indexOf(productId);
  if (productIndex > -1) {
    wishlist.splice(productIndex, 1);
  } else {
    wishlist.push(productId); 
  }
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(wishlist), NEXTAUTH_SECRET).toString();
  localStorage.setItem('wishlist', encryptedData);
};

export const isProductInWishlist = (productId: string): boolean => {
  const encryptedWishlist = localStorage.getItem('wishlist');
  if (!encryptedWishlist) return false;
  const wishlist = JSON.parse(CryptoJS.AES.decrypt(encryptedWishlist, NEXTAUTH_SECRET).toString(CryptoJS.enc.Utf8));
  return wishlist.includes(productId);
};

export const getWishlist = (): string[] => {
  const encryptedWishlist = localStorage.getItem('wishlist');
  if (!encryptedWishlist) return [];
  return JSON.parse(CryptoJS.AES.decrypt(encryptedWishlist, NEXTAUTH_SECRET).toString(CryptoJS.enc.Utf8));
};

interface CartProduct {
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

export const updateProductList = (newProduct: CartProduct, increment: boolean = true): void => {
  const encryptedProductList = localStorage.getItem('productList');
  const productList: CartProduct[] = encryptedProductList 
      ? JSON.parse(CryptoJS.AES.decrypt(encryptedProductList, NEXTAUTH_SECRET).toString(CryptoJS.enc.Utf8)) 
      : [];

  const existingProductIndex = productList.findIndex(
      (product) => product.product === newProduct.product && product.variant === newProduct.variant
  );

  if (existingProductIndex > -1) {
      const existingProduct = productList[existingProductIndex];
      const currentPcs = existingProduct.pcs ?? 0;
      if (increment) {
        existingProduct.pcs = currentPcs + 1; 
        cartEvents.emit('cartUpdated');
        toast.success("Added to Cart",{position:"top-center"});
      } else {
        existingProduct.pcs = currentPcs - 1; 
        if (existingProduct.pcs <= 0) {
          productList.splice(existingProductIndex, 1);
          toast.success("Removed from Cart",{position:"top-center"});
          }
      }
  } else if (increment) {
      productList.push({ ...newProduct, pcs: 1 });
      toast.success("Added to Cart",{position:"top-center"});
      cartEvents.emit('cartUpdated');
  }
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(productList), NEXTAUTH_SECRET).toString();
  localStorage.setItem('productList', encryptedData);
};

export const getDecryptedProductList = (): CartProduct[] => {
  const encryptedProductList = localStorage.getItem('productList');
  if (!encryptedProductList) return [];
  return JSON.parse(CryptoJS.AES.decrypt(encryptedProductList, NEXTAUTH_SECRET).toString(CryptoJS.enc.Utf8));
};
