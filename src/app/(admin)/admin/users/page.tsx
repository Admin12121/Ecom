import React from 'react';
import dynamic from 'next/dynamic'

const Accounts = dynamic(() => import('@/components/Admin/accounts'), { ssr: false })

const Account = () => {
   return <Accounts />;
};

export default Account;
