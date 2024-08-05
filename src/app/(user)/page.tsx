import React from 'react';
import dynamic from 'next/dynamic'

const Home = dynamic(() => import('@/components/User/Home'), { ssr: false })

export default function Page() {
  return (
    <Home />
  );
}
