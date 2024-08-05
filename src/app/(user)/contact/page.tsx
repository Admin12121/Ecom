import React from 'react';
import dynamic from 'next/dynamic'

const Category = dynamic(() => import('@/components/User/Contact/Contact'), { ssr: false })

export default function Page() {
  return (
    <Category />
  );
}
