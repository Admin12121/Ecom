import React from 'react';
import dynamic from 'next/dynamic'

const Help = dynamic(() => import('@/components/User/Help/Help'), { ssr: false })

export default function Page() {
  return (
    <Help />
  );
}
