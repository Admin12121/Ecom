import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export interface LayoutProps {
    name: string;
    layout_slug: string;
    non_deletable: boolean;
    active: boolean;
  }
  
  
  const LayoutSkeleton1 = ({name,layout_slug, non_deletable, active}: LayoutProps) => {
    const router = useRouter();
    console.log(layout_slug)
    return (
      <>
        <span className="flex flex-col items-start justify-start flex-wrap gap-2" onClick={() => router.push(`/admin/layout/${layout_slug}`)}>
          <Card className="w-[80vw] sm:w-[26vw] mmd:w-[25vw]   h-[250px] rounded-xl bg-neutral-950 cursor-pointer" >
            <CardBody className="w-full h-full flex flex-col items-start justify-start flex-wrap">
              <div className="relative overflow-hidden w-full h-full rounded-xl bg-default-300">
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-10 flex items-center justify-between px-3">
                  <span className="bg-neutral-800 rounded-md p-1 cursor-pointer">
                    <IoIosArrowBack />
                  </span>
                  <span className="bg-neutral-800 rounded-md p-1 cursor-pointer">
                    <IoIosArrowForward />
                  </span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-5 flex items-center justify-start px-3 ">
                  <span className="w-10  h-2 bg-neutral-800 rounded-md flex items-center justify-start px-1 gap-1">
                    <span className="w-4 h-1 bg-white flex rounded-md"></span>
                    <span className="w-1 h-1 bg-white flex rounded-md"></span>
                    <span className="w-1 h-1 bg-white flex rounded-md"></span>
                  </span>
                </span>
              </div>
            </CardBody>
          </Card>
          <span>
            <h1 className="text-lg">{name}</h1>
          </span>
        </span>
      </>
    );
  };
  
  const LayoutSkeleton2 = ({name,layout_slug, non_deletable, active}: LayoutProps) => {
    const router = useRouter();
    return (
      <span className="flex flex-col items-start justify-start flex-wrap gap-2" onClick={() => router.push(`/admin/layout/${layout_slug}`)}>
        <Card className="w-[80vw] sm:w-[26vw] mmd:w-[25vw]  h-[250px] rounded-xl bg-neutral-950 cursor-pointer">
          <CardBody className="w-full h-full flex flex-col items-start justify-start flex-wrap ">
            <span className="w-full h-full relative bg-default-300 rounded-xl overflow-hidden">
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent">
                <span className="absolute left-2 top-2 bg-neutral-800 h-3 w-12 rounded-md"></span>
                <span className="absolute right-2 top-2 bg-neutral-800 h-3 w-20 rounded-md"></span>
                <span className="absolute bottom-0 left-0 h-7 w-full flex items-center justify-center">
                  <span className="w-10 h-3 bg-white rounded-md flex items-center justify-start px-1 gap-1"></span>
                  <span className="w-3 h-3 bg-white rounded-md flex items-center justify-start px-1 gap-1"></span>
                </span>
              </span>
            </span>
          </CardBody>
        </Card>
        <span>
          <h1 className="text-lg">{name}</h1>
        </span>
      </span>
    );
  };
  
  const LayoutSkeleton3 = ({name,layout_slug, non_deletable, active}: LayoutProps) => {
    const router = useRouter();
    return (
      <span className="flex flex-col items-start justify-start flex-wrap gap-2" onClick={() => router.push(`/admin/layout/${layout_slug}`)}>
        <Card className="w-[80vw] sm:w-[26vw] mmd:w-[25vw]  h-[250px] rounded-xl bg-neutral-950 cursor-pointer">
          <CardBody className="w-full h-full flex flex-col items-start justify-start flex-wrap ">
            <span className="w-full h-full relative rounded-xl overflow-hidden">
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent">
                <span className="absolute left-2 top-2 bg-neutral-800 h-3 w-12 rounded-md"></span>
                <span className="absolute right-2 top-2 bg-neutral-800 h-3 w-20 rounded-md"></span>
                <span className="absolute bottom-0 left-0 h-7 w-full flex items-center justify-center">
                  <span className="w-10 h-3 bg-white rounded-md flex items-center justify-start px-1 gap-1"></span>
                  <span className="w-3 h-3 bg-white rounded-md flex items-center justify-start px-1 gap-1"></span>
                </span>
              </span>
            </span>
          </CardBody>
        </Card>
        <span>
          <h1 className="text-lg">{name}</h1>
        </span>
      </span>
    );
  };

  export {LayoutSkeleton1, LayoutSkeleton2, LayoutSkeleton3}