import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface AddToCartProps {
  product: number;
  variant: number;
  className?: string;
}

const AddToCart: React.FC<AddToCartProps> = ({ product, variant, className }) => {
  const { updateProductList } = useCart();
  const handleAddToCart = () => updateProductList({ product, variant });
  return (
    <Button
      variant="active"
      size="sm"
      className={cn("h-[30px] flex justify-center items-center text-sm gap-2", className)}
      onClick={handleAddToCart}
    >
      <ShoppingBag className="w-3 h-3" />
      Add
    </Button>
  );
};

export default AddToCart;
