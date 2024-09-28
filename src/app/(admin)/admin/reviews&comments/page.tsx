import React from 'react'
import dynamic from 'next/dynamic'

const Reviews = dynamic(() => import('@/app/(admin)/admin/reviews&comments/_components/review'), { ssr: false })


const Page = () => {
  return (
    <Reviews/>
  )
}

export default Page