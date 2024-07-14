import React, { useState, useEffect } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from './anim';
import Link from './Link';
import Curve from './Curve';
import Footer from './Footer';
import useAuth from "@/context/AuthContext";
import {useProductsViewQuery} from "@/lib/store/Service/User_Auth_Api";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "/work",
  },
]

export default function Cart({setIsActive, isActive}:{isActive:boolean, setIsActive:any}) {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [products, SetProducts] = useState<FormData[]>([])

  useEffect(() => {
    const cartItemsFromStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cartItemsFromStorage);
  }, []);

  const { data, isLoading, refetch } = useProductsViewQuery(
    { ids: cartItems.join(',') }, 
    { skip: cartItems.length === 0 }
  );

  useEffect(()=>{
    SetProducts(data?.results)
  },[data])

  return (
    <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className={styles.menu}>
        <div className="absolute inset-0 w-full h-full rounded-b-[18px] rounded-bl-[18px] bg-black flex items-center justify-center [mask-image:radial-gradient(800px_450px_at_top,transparent_50%,white)]"></div>
        <div className={styles.body}>
            <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
                    <div className={styles.header}>
                        <p className='text-lg'>Shopping Cart</p>
                    </div>
                    {navItems.map( (data, index) => {
                        return <Link key={index} data={{...data, index}}  setSelectedIndicator={setSelectedIndicator}></Link>
                      })
                    }
            </div>
            <Footer setIsActive={setIsActive}  isActive={isActive}/>
        </div>
        <Curve />
    </motion.div>
  )
}