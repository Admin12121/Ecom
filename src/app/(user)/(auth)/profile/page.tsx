import React from 'react';
import dynamic from 'next/dynamic'

const Profile = dynamic(() => import('@/components/User/[Auth]/Profile/Profile'), { ssr: false })

export default function Page() {
  return (
    <Profile />
  );
}
