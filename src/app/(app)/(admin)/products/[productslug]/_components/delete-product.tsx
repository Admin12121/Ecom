import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteProductsMutation } from "@/lib/store/Service/api";
import { toast } from "sonner";
import { delay } from "@/lib/utils";

const DeleteProduct = ({
  token,
  id,
  active,
  refetch
}: {
  token: string;
  id: string;
  active: boolean;
  refetch: any;
}) => {
  const [deleteProduct] = useDeleteProductsMutation();

  const handleProductDelete = async () => {
    try {
      const toastid = toast.loading("Deleting Product...", {
        position: "top-center",
      });
      await delay(500);
      const res = await deleteProduct({ token, id });
      if (res.data) {
        toast.success("Product Deleted Successfully", {
          id: toastid,
          position: "top-center",
        });
        refetch();
      } else {
        toast.error("Product Deletion Failed", {
          id: toastid,
          position: "top-center",
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant={active? "active" :"destructive"}
          className="md:w-autob flrx gap-2"
        >
          {active ? "Reactive" : "Deactive"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            Product data and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleProductDelete()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
