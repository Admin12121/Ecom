"use client";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Card, CardBody, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Section, Container } from "@/components/costum/craft";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/costum/carousel";
import { useGetlayoutQuery } from "@/lib/store/Service/User_Auth_Api";
import LocalSpinner from "@/components/Skleton/Skleton";
import {
  LayoutSkeleton1,
  LayoutSkeleton2,
  LayoutSkeleton3,
  LayoutProps,
} from "./LayoutSkleton";

const COMPONENT_MAP: { [key: string]: React.FC<LayoutProps> } = {
  SwiperHero: LayoutSkeleton1,
  SingleCard: LayoutSkeleton2,
  TransparentCard: LayoutSkeleton3,
};

function Layout() {
  const { data, isLoading, error } = useGetlayoutQuery({});

  return (
    <div className="p-5">
      <span>
        <Breadcrumbs>
          <BreadcrumbItem>Layouts</BreadcrumbItem>
        </Breadcrumbs>
      </span>
      <Section className="md:py-0 py-0">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <LocalSpinner />
          </div>
        ) : (
          <Container className="p-0 sm:p-0 pt-5 md:pt-10">
            <Carousel className="w-full">
              <CarouselContent className="px-5 -ml-1 mt-5 flex gap-3">
                {data &&
                  data.map((layout: LayoutProps, index: number) => {
                    const LayoutComponent =
                      COMPONENT_MAP[
                        layout.name as keyof typeof COMPONENT_MAP
                      ] || CustomLayout;
                    return <LayoutComponent key={index} {...layout} />;
                  })}
                {/* <CreateLayout /> */}
              </CarouselContent>
              <CarouselPrevious className="absolute top-0 h-[30px] w-[30px] flex items-center justify-center p-2 rounded-lg right-[60px] left-auto" />
              <CarouselNext className="absolute top-0 h-[30px] w-[30px] flex items-center justify-center p-2 rounded-lg right-[20px]" />
            </Carousel>
          </Container>
        )}
      </Section>
    </div>
  );
}

export default Layout;

const CustomLayout = () => {
  return (
    <>
      <span className="flex flex-col items-start justify-start flex-wrap gap-2">
        <Card className="w-[350px] h-[250px] mr-5 rounded-xl bg-neutral-950 cursor-pointer flex items-center justify-center"></Card>
      </span>
    </>
  );
};
