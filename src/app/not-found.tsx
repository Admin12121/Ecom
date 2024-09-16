"use client"
import dynamic from "next/dynamic";
import { Button } from "@nextui-org/react";
import Navbar from "@/components/Navbar/Navbar";
const Footer = dynamic(() => import("@/components/Footer/footer"), {
  ssr: false,
});
import { Empty } from "@/components/ui/empty";
import { useRouter } from "next/navigation";

export const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="lg:col-span-3 md:col-span-2 flex flex-col items-center justify-center gap-y-16 h-screen w-screen">
        <Empty />
        <span className="flex flex-col gap-5 items-center ">
            <h1 className="font-semibold text-4xl">Page not Found</h1>
            <Button 
              variant="flat" 
              className="flex gap-3 text-themeTextGray border-0"
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
        </span>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
