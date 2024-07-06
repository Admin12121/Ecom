import styles from './style.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../anim';
import {Card,CardHeader, CardBody, Image} from "@nextui-org/react";

export default function Index({data, setSelectedIndicator}:{data:any,setSelectedIndicator:any }) {
  
    const { title, href, index} = data;
  
    return (
      <motion.div className={styles.link} onMouseEnter={() => {setSelectedIndicator(href)}} custom={index} variants={slide} initial="initial" animate="enter" exit="exit">
        <Card className='w-full rounded-md shadow-none bg-transparent'>
          <CardBody className=' flex justify-between flex-row items-center'>
            <span>
              <Image
                  alt="nextui logo"
                  height={80}
                  isBlurred
                  radius="md"
                  src="https://i.pinimg.com/564x/54/28/cd/5428cd617e6b243c35b8b6fb378f5af7.jpg"
                  width={80}
                  className='max-w-[80px] max-h-[80px] w-[80px] object-cover'
                />
            </span>
            <span className='flex justify-between gap-7 flex-col h-full'>
              <p className='text-base text-red-400 underline cursor-pointer'>Remove</p>
              <p className='text-lg'>$ 28.00</p>
            </span>
          </CardBody>
        </Card>
      </motion.div>
    )
  }


  // https://i.pinimg.com/564x/54/28/cd/5428cd617e6b243c35b8b6fb378f5af7.jpg