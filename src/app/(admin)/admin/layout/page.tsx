import React from 'react';
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('@/components/Admin/landing_page/Layout'), { ssr: false })

export default function Page() {
  return (
    <Layout />
  );
}
