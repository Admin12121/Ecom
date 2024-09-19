import {
  Card,
  CardHeader,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { useGetReviewQuery } from "@/lib/store/Service/User_Auth_Api";
import SpinnerLocal from "@/components/ui/spinner";
import useAuth from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Review = ({ isOpen, onOpenChange, onClose, slug, onSheetOpen }: any) => {
  const router = useRouter();
  const {isLoggedIn} = useAuth();
  const {data, isLoading} = useGetReviewQuery({product_slug:slug},{skip: !slug});
  
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
      backdrop="blur"
      className="rounded-lg fixed md:right-0 w-[98vw] md:w-full h-[98vh] !my-[1vh] !mx-[1vw]  md:!my-0 md:!mx-2 max-md:!max-w-[100vw]"
      classNames={{
        closeButton: "rounded-lg border-1 border-default-300",
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            x: 500,
            y: 0,
            opacity: 0.5,
            transition: {
              duration: 0.3,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="">
              <p className="text-sm font-medium">Reviews (1500)</p>
            </ModalHeader>
            <ModalBody className="px-2 gap-3 overflow-hidden overflow-y-auto  ">
              <span className="flex gap-2 px-2">
                <Card className="w-full p-3 px-3 rounded-lg flex flex-row justify-between items-center">
                  <p className="text-sm">Overall Rating</p>
                  <p className=" text-sm flex gap-1 items-center justify-center">
                    4.5 <FaStar fill="orange" />
                  </p>
                </Card>
              </span>
              <span className="flex gap-5 px-2 w-full flex-col">
                <span className="flex gap-2 w-full">
                  <Select
                    defaultSelectedKeys={["1"]}
                    size="md"
                    radius="sm"
                    variant="bordered"
                    placeholder="Select"
                    className="max-w-xs"
                  >
                    <SelectItem key="1" value="Read all"> Read all </SelectItem>
                    <SelectItem key="2" value="★"> ★ </SelectItem>
                    <SelectItem key="3" value="★★"> ★★ </SelectItem>
                    <SelectItem key="4" value="★★★"> ★★★ </SelectItem>
                    <SelectItem key="5" value="★★★★"> ★★★★ </SelectItem>
                    <SelectItem key="6" value="★★★★★"> ★★★★★ </SelectItem>
                  </Select>
                  <Select
                    defaultSelectedKeys={["1"]}
                    size="md"
                    radius="sm"
                    variant="bordered"
                    placeholder="Select"
                    className="max-w-xs"
                  >
                    <SelectItem key="1" value="relevant"> Most relevant </SelectItem>
                    <SelectItem key="2" value="recent"> Most recent </SelectItem>
                    <SelectItem key="3" value="rating"> By rating </SelectItem>
                  </Select>
                </span>
                {isLoading ?
                 
                 <div className="w-full h-full flex items-center justify-center">
                  <SpinnerLocal/>
                 </div>
                : 
                <Card className="flex p-2">
                  <CardHeader className="flex items-center justify-between">
                    <span> ★★★★★ </span> <span>Aug 12, 2024</span>
                  </CardHeader>
                  <span className="relative p-2">
                    <Image
                      src="https://i.pinimg.com/736x/85/7e/0e/857e0e6a74b3062eaf180c1bce9014dd.jpg"
                      width={100}
                      height={100}
                      layout="responsive"
                      objectFit="cover"
                      alt="review image"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </span>
                  <span className="flex flex-col p-2">
                    <h1 className="font-semibold">Best Product</h1>
                    <p className="text-sm">
                      The tone of the statue is beautiful. It&apos;s exactly the same as
                      shown in the image, increases the decoration of the room, and
                      spreads peace.
                    </p>
                  </span>
                </Card>}
              </span>
            </ModalBody>
            <ModalFooter className="py-2 w-full px-2">
                  <Button
                    className="bg-foreground w-full text-background"
                    size="sm" 
                    onClick={() => {
                      if(isLoggedIn){
                        onClose();
                        onSheetOpen();
                      }else{
                        router.push('/login')
                      }
                    }}
                  >
                    Write a Review
                  </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Review;
