import React from 'react';
import dynamic from 'next/dynamic'

const Playbround = dynamic(() => import('@/components/Admin/landing_page/Playbround'), { ssr: false })

export default function Page() {
  return (
    <Playbround />
  );
}
