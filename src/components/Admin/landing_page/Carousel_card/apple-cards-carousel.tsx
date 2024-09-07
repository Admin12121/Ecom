"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { RxCrossCircled as IconX } from "react-icons/rx";
import { BsArrowLeft as IconArrowNarrowLeft } from "react-icons/bs";
import { BsArrowRight as IconArrowNarrowRight } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "./useOutsideClick";
import { Input } from "@nextui-org/react";
import * as yup from "yup";
import { useUpdateLayoutCardMutation, usePostLayoutCardMutation } from "@/lib/store/Service/User_Auth_Api"
import { useDropzone } from 'react-dropzone';
import { toast } from "sonner";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  id: number;
  image_id: string;
  image: string;
  links: {id: number, link: string}[];
  titles: {id: number, title: string}[];
  link_no: number; 
  title_no: number;  
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "max-w-7xl mx-auto" // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};


const linkSchema = yup.object().shape({
  link: yup.string().url("Invalid URL").required("Link is required"),
});

const titleSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});


export const Card = ({
  card,
  index,
  slug,
  refetch,
  layout = false,
}: {
  card: Card;
  slug: string;
  index: number;
  refetch: any;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  const handleUpdate = async (data: any, type: 'link' | 'title', id: number) => {
    await updateLayoutCard({
      formData:data,
      layoutslug: slug,
      [`${type}_id`]: id,
    });
    refetch();
  };

  const [updateLayoutCard] = useUpdateLayoutCardMutation();

  const onDrop = async (acceptedFiles:any) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', file);

    const response = await updateLayoutCard({ formData, layoutslug: slug, image_id: card.id });
    if (response.data){
      refetch();
      toast.success("Image updated successfully");
    }else{
      toast.error("Failed to update image");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });



  return (
    <>
     <AnimatePresence>
        {open && (
          <motion.div layoutId={layout ? `card-${card.image_id}` : undefined} className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${slug}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit  z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${slug}-${card.image_id}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {slug}
              </motion.p>
              <div className="py-10 flex flex-col gap-2">
              <motion.span layoutId={layout ? `image-${card.image_id}` : undefined} className="w-full mb-5 relative h-[500px] p-1 flex rounded-md overflow-hidden">
                <div {...getRootProps()} className="w-full h-full flex items-center justify-center rounded-md">
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <Image
                      className={cn(
                        "transition duration-300 w-full h-[500px] object-contain"
                      )}
                      src={card.image}
                      decoding="async"
                      fill 
                      quality={100}
                      priority
                      alt={"Background of a beautiful view"}
                    />
                  )}
                </div>
              </motion.span>
                <div className="flex flex-col gap-2">
                  {card.link_no != card.links.length && (
                    <Input
                      size="sm"
                      type="url"
                      label="Link"
                    />
                  )}
                  {card.links.map((linkObj: { id: number, link: string }, idx: number) => (
                    <LinkForm
                      key={idx}
                      linkObj={linkObj}
                      slug={slug}
                      handleUpdate={handleUpdate}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {card.title_no != card.titles.length && (
                    <Input
                      size="sm"
                      type="text"
                      label="Title"
                    />
                  )}
                  {card.titles.map((titleObj: { id: number, title: string }, idx: number) => (
                    <TitleForm
                      key={idx}
                      titleObj={titleObj}
                      slug={slug}
                      handleUpdate={handleUpdate}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.image_id}` : undefined}
        onClick={handleOpen}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-[400px] w-full md:h-[450px] overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${slug}-${card.image_id}` : undefined}
            className="text-white text-sm md:text-base font-medium font-sans text-left"
          >
            {slug}
          </motion.p>
        </div>
        <motion.span layoutId={layout ? `image-${card.image_id}` : undefined}>
          <BlurImage
            layoutId={card.image_id}
            src={card.image}
            alt={slug}
            fill
            className="object-contain absolute z-10 inset-0"
          />
        </motion.span>
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  layoutId,
  alt,
  ...rest
}: ImageProps & { layoutId?: string }) => {
  const [isLoading, setLoading] = useState(true);
  return (
      <Image
        className={cn(
          "transition duration-300 object-contain" ,
          isLoading ? "blur-sm" : "blur-0",
          className
        )}
        onLoad={() => setLoading(false)}
        src={src}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        blurDataURL={typeof src === "string" ? src : undefined}
        alt={alt ? alt : "Background of a beautiful view"}
        {...rest}
        />
  );
};

const LinkForm = ({ linkObj, slug, handleUpdate }:{linkObj:any, slug:any, handleUpdate:any}) => {
  const [link, setLink] = useState(linkObj.link);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e:any) => {
    setLink(e.target.value);
    setIsDirty(true);
  };

  const handleSave = () => {
    handleUpdate({ link }, 'link', linkObj.id);
    setIsDirty(false);
  };

  return (
    <div>
      <Input
        size="sm"
        type="url"
        label="Link"
        value={link}
        onChange={handleChange}
      />
      {isDirty && (
        <button
          className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      )}
    </div>
  );
};


const TitleForm = ({ titleObj, slug, handleUpdate }:{titleObj:any, slug:any, handleUpdate:any}) => {
  const [title, setTitle] = useState(titleObj.title);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e:any) => {
    setTitle(e.target.value);
    setIsDirty(true);
  };

  const handleSave = () => {
    handleUpdate({ title }, 'title', titleObj.id);
    setIsDirty(false);
  };


  return (
    <div>
    <Input
      size="sm"
      type="url"
      label="Title"
      value={title}
      onChange={handleChange}
    />
    {isDirty && (
      <button
        className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
        onClick={handleSave}
      >
        Save
      </button>
    )}
  </div>
  );
};