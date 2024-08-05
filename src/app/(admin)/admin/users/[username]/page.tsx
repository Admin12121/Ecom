import React from 'react';
import dynamic from 'next/dynamic'

const User = dynamic(() => import('@/components/Admin/users/[username]/Layout'), { ssr: false })

const Page = () => {
   return <User />;
};

export default Page;
