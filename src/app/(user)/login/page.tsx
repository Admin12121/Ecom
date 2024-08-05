import React from 'react';
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@/components/User/Login/Login'), { ssr: false })

export default function Page() {
  return (
    <Login />
  );
}
