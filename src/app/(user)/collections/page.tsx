import React from 'react';
import dynamic from 'next/dynamic'

const Category = dynamic(() => import('@/components/User/Collections/Collection'), { ssr: false })

export default function Page() {
  return (
    <Category />
  );
}
