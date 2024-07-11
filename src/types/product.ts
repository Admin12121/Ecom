export interface FormValues {
    productName: string;
    description: string;
    isMultiVariant: boolean;
    category: number;
    subCategory: number;
    basePrice?: number | null | undefined;
    stock?: number | null | undefined;
    discount?: number | null | undefined;
    variants?: Array<{
      size: string;
      price: number;
      stock: number;
      discount?: number;
    }>; 
  }

  export interface FormData {
    product_name: string;
    description: string;    
    productslug:string;
    category: number;
    subcategory: number;
    images: Array<{
      image: string;
    }>;
    variants?: Array<Variant> | Variant;
  }

  export interface Variant {
    size?: string;
    price: number;
    stock: number;
    product_stripe_id?: string;
    discount?: number;
  }