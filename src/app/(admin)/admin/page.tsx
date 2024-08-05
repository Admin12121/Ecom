import React from 'react';
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('@/components/Admin/home/content'), { ssr: false })

export default function Page() {
  return (
    <Content />
  );
}
