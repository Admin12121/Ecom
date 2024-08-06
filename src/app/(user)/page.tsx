import React from 'react';
import dynamic from 'next/dynamic'

const Home = dynamic(() => import('@/components/User/Home'), { loading: () => <p>Loading...</p>, ssr: false, })

export default function Page() {
  return (
    <Home />
  );
}
