import React from 'react';
import dynamic from 'next/dynamic'

const Search_prams = dynamic(() => import('@/components/User/Collections/[search_prams]/Search_prams'), { ssr: false })

export default function Page() {
  return (
    <Search_prams />
  );
}
