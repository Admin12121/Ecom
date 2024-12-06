import React, { useState, useEffect } from "react";
import { updateWishlist, isProductInWishlist, cn } from "@/lib/utils";
import { Button } from "@/components/costum/button";
import { Heart } from "lucide-react";

interface WishlistProps {
  productId: number;
  className?: string;
  custom?: boolean;
}

const WishList = ({ productId, className, custom = true }: WishlistProps) => {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  useEffect(() => {
    setIsInWishlist(isProductInWishlist(productId.toString()));
  }, [productId]);

  const handleButtonClick = () => {
    updateWishlist(productId.toString());
    setIsInWishlist(!isInWishlist);
  };
  return (
    <Button
      className={cn(
        "p-2",
        custom && "bg-transparent hover:bg-transparent m-0",
        className
      )}
      variant="secondary"
      onClick={handleButtonClick}
    >
      <Heart
        size={18}
        className={cn(
          "dark:stroke-white stroke-neutral-800",
          isInWishlist && "fill-black dark:fill-white"
        )}
      />
      <span className="sr-only">
        Add to wishlist
      </span>
    </Button>
  );
};

export default WishList;
