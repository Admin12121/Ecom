import styles from './style.module.scss';
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../anim';
import {Button} from "@nextui-org/react";
import {Card,CardHeader, CardBody, Image} from "@nextui-org/react";
import useAuth from "@/context/AuthContext";
import { FormData, Variant } from "@/types/product";
import { AiFillDelete } from "react-icons/ai";
import { useCart } from "@/context/CartState";

interface LinkProps {
  data: any;
  variantId: number;
  setSelectedIndicator: any;
  refetch: (value: boolean) => void;
}

const Index: React.FC<LinkProps> = ({ data, variantId, setSelectedIndicator,refetch  }) => {
  
    const { images, product_name, variants, id} = data;
    const { isLoggedIn ,convertPrice} = useAuth();
    const [variantsdata, setVariantsData] = useState<Variant[] | Variant | null>(null);
    const { counter, setCounter } = useCart();

    useEffect(() => {
      if (variants) {
        setVariantsData(variants);
      }
    }, [variants]);
  
    const getVariantData = (
      variantsdata: Variant[] | Variant | null,
      key: keyof Variant,
      index: number = 0
    ): any => {
      if (Array.isArray(variantsdata)) {
        const variant = variantsdata.find(variant => variant.id === index);
        return variant ? variant[key] : null;
      } else if (variantsdata) {
        return variantsdata[key];
      }
      return null;
    };
    const { convertedPrice, symbol } = convertPrice(getVariantData(variantsdata, 'price', variantId))

    const truncateText = (text: string, maxLength: number): string => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    
  const handleDelete = () => {
    const cartItemsFromStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCartItems = cartItemsFromStorage.filter(
      (item:any) => !(item.id === id && item.variantId === variantId)
    );

    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setCounter(counter - 1);
    refetch(true);
  };
    return (
      <motion.div className={styles.link} onMouseEnter={() => {setSelectedIndicator(id)}} custom={id} variants={slide} initial="initial" animate="enter" exit="exit">
        <Card className='w-full rounded-md shadow-none bg-transparent'>
          <CardBody className=' flex justify-between flex-row items-center'>
            <span className='flex gap-5'>
              <Image
                  alt="nextui logo"
                  height={80}
                  isBlurred
                  radius="md"
                  src={images[0].image}
                  width={80}
                  className='max-w-[80px] max-h-[80px] w-[80px] object-cover'
                />
                <span className='flex items-start flex-col gap-2 justify-between'>
                  <p className='text-lg text-zinc-400'>{truncateText(product_name, 25)}</p>
                  <p className='text-lg'>{symbol} {convertedPrice}</p>
                </span>
            </span>
            <span className='flex justify-between gap-7 flex-col h-full'>
              <Button isIconOnly color="danger" aria-label="Like" onClick={handleDelete}>
                <AiFillDelete color='#ffffffd6' size={25}/>
              </Button>    
            </span>
          </CardBody>
        </Card>
      </motion.div>
    )
  }
  export default Index;

  // https://i.pinimg.com/564x/54/28/cd/5428cd617e6b243c35b8b6fb378f5af7.jpg