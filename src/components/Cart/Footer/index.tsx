import styles from './style.module.scss';
import {Button} from "@nextui-org/react";
import Link from 'next/link'
export default function index({isActive,setIsActive}:{setIsActive:any, isActive:boolean}) {
  return (
    <div className={styles.footer}>
      <span className='w-full flex flex-row justify-between text-2xl '>
        <p>Sub Total :</p>
        <p>$ 0.00</p>
      </span>
      <span className='flex justify-between w-full gap-5'>
        <Button className='w-full' size="lg" variant="ghost">VIEW CART</Button>
        <Button className='w-full' size="lg">CHECK OUT</Button>
      </span>
      <Link href="/collections" onClick={()=>setIsActive(()=>!isActive)} className='text-lg'>OR CONTINUE SHOPPING</Link>
    </div>
  )
}
