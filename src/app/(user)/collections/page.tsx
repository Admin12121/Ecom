import React from 'react';
import dynamic from 'next/dynamic'

const AllProducts = dynamic(() => import('@/components/User/Collections/Collection'), { ssr: false })

export default function Page() {
  return (
    <AllProducts />
  );
}
