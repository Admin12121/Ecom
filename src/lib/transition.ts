import CryptoJS from "crypto-js";
const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET as string;

export const encryptData = (data: object, router: any) => {
  const encurl = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();
  const encodedUrl = encodeURIComponent(encurl);
  router.push(`/checkout/${encodedUrl}`);
};

interface Product {
  product: number;
  variant: number;
  pcs: number;
}

export const decryptData = (
  encryptedUrl: string,
  router: any
): Product[] | null => {
  const decodedUrl = decodeURIComponent(encryptedUrl);
  const decrypted = CryptoJS.AES.decrypt(decodedUrl, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  try {
    const parsedDecrypted = JSON.parse(decrypted);
    return parsedDecrypted;
  } catch (error) {
    console.error("Failed to parse decrypted data:", error);
    router.push(`/collections/`);
    return null;
  }
};
