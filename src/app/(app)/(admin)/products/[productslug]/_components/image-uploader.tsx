import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useProductImageMutation,
  useDeleteproductImageMutation,
} from "@/lib/store/Service/api";
import { toast } from "sonner";
import { cn, delay } from "@/lib/utils";
import { Settings } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

const Uploader = ({
  token,
  product,
  className,
  images,
}: {
  token?: string;
  product?: string;
  className?: string;
  images?: any;
}) => {
  const [productImage] = useProductImageMutation();
  const [deleteProductImage] = useDeleteproductImageMutation();
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateImage = async () => {
    if (!newImage) {
      toast.error("Please upload a new image before updating.");
      return;
    }

    const formData = new FormData();
    formData.append("image", newImage);

    try {
      const toastId = toast.loading("Updating Image...", {
        position: "top-center",
      });
      await delay(500);
      const res = await productImage({ formData, token, id: images.id });
      if (res.data) {
        toast.success("Image updated successfully!", {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.error("Failed to update image", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error updating image", {
        position: "top-center",
      });
      console.log(error)
    }
  };

  const handleDeleteImage = async () => {
    try {
      const toastId = toast.loading("Deleting Image...", {
        position: "top-center",
      });
      await delay(500);
      const res = await deleteProductImage({ token, id: images.id });
      if (res.data) {
        toast.success("Image deleted successfully!", {
          id: toastId,
          position: "top-center",
        });
      } else {
        toast.error("Failed to delete image", {
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error deleting image", {
        position: "top-center",
      });
      console.log(error)
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>
          <Settings className={className} />
          <Image
            className={cn("object-contain h-20 w-20 max-lg:h-full max-lg:w-full", product)}
            src={images.src}
            alt={`Uploaded`}
            width={800}
            height={800}
          />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4">
        <div className="space-y-2">
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle>Update Image</DialogTitle>
          </DialogHeader>
          <div className="w-full flex gap-2 items-center justify-between h-48">
            <Image
              src={images.src}
              alt={`Uploaded`}
              width={400}
              height={400}
              className="w-1/2 h-44 object-contain"
            />
            {newImagePreview ? (
              <Image
                src={newImagePreview}
                alt="New Image"
                width={200}
                height={200}
                className="w-1/2 h-44 object-contain"
              />
            ) : (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <Button
                  className="h-44 w-1/2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload New Image
                </Button>
              </>
            )}
          </div>
          <DialogFooter className="flex gap-2 w-full">
            <Button className="w-full" onClick={handleUpdateImage}>
              Save
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDeleteImage}
            >
              Delete
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Uploader;
