import React from 'react'
import Cardwrapper from "./cardwrapper";
interface LoginErrorProps {
  errorParam: string;
}
const LoginError = ({errorParam}: LoginErrorProps) => {
  return (
    <Cardwrapper
      title="Login Error"
      headerLabel={errorParam}
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <p className='text-center'>Something went Wrong While Login</p>
    </Cardwrapper>
  );
};

export default LoginError;