import React from 'react';
import dynamic from 'next/dynamic'

const Settings = dynamic(() => import('@/components/User/[Auth]/Settings/Settings'), { ssr: false })

export default function Page() {
  return (
    <Settings />
  );
}
