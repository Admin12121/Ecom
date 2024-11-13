import dynamic from 'next/dynamic';
const Login = dynamic(() => import('@/components/auth/login'))

const Page = () => {
  return (
    <Login/>
  )
}

export default Page;