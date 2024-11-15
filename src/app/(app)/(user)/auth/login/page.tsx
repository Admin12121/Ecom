import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@/components/auth/login'))

export default async function() {
  return (
    <Login/>
  )
}
