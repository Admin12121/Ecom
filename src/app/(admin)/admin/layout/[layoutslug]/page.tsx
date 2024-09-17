import React from 'react';
import dynamic from 'next/dynamic'

const Playbround = dynamic(() => import('@/components/Admin/landing_page/Playbround'), { ssr: false })

export default async function Page({params}:{params:{layoutslug:string}}) {
  return (
    <Playbround params={params}/>
  );
}
