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
  id: number;
  product_name: string;
  description: string;
  productslug: string;
  category: number;
  categoryname?: string;
  subcategoryname?: string;
  subcategory: number;
  rating: number;
  total_ratings: number;
  images: Image[];
  variants?: Array<Variant> | Variant;
}

export interface Product {
  id: number;
  categoryname: string;
  subcategoryname: string;
  comments?: any[];
  product_name: string;
  rating: number;
  description: string;
  productslug: string;
  category: number;
  subcategory: number;
  variants: VariantObject | VariantObject[];
  images: Image[];
}

export interface Image {
  image: string;
}

export interface VariantObject {
  id: number;
  product_stripe_id: string | null;
  size: string | null;
  price: number;
  discount: number;
  stock: number;
  product: number;
}

export interface Variant {
  id: number;
  size?: string;
  price: number;
  stock: number;
  product_stripe_id?: string;
  discount?: number;
}

export interface updateFormValues {
  id: string;
  productName: string;
  description: string;
  isMultiVariant: boolean;
  category: number;
  subCategory: number;
  basePrice?: number | null | undefined;
  stock?: number | null | undefined;
  discount?: number | null | undefined;
  variants?: Array<{
    id: string;
    size: string;
    price: number;
    stock: number;
    discount?: number;
  }>;
}

export interface ReviewsImage {
  id: number;
  image: string;
  review: number;
}

export interface Reviews {
  id: number;
  user: number;
  rating: number;
  title: string;
  content: string;
  recommended: boolean;
  delivery: boolean;
  review_images: ReviewsImage[];
  created_at: string;
}