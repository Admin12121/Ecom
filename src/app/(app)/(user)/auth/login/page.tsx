import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/components/auth/login"));

const LoginPage = async () => {
  return <Login />;
};

export default LoginPage;