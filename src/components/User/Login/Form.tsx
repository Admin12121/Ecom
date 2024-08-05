"use client"
import { Tabs, Tab, Card, Input, CardBody, Checkbox, Button, Link, Divider } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { getToken } from "@/lib/store/Service/LocalStorageServices";
import {useRegisterUserMutation } from "@/lib/store/Service/User_Auth_Api";
import { toast } from "sonner";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import useAuth  from '@/context/AuthContext';
import {Avatar, AvatarIcon} from "@nextui-org/react";
import { signIn } from 'next-auth/react';

export default function FormTab() {
    const router = useRouter()
    const [selected, setSelected] = useState<string | number>("login");
    const [accepted, setAccepted] = useState<boolean>(false);
    const [called, setCalled] = useState<boolean>(false);
    const {isLoggedIn, handleLogin, userLogin, setuserLogin } = useAuth();
    const [serverError, setServerError] = useState<any>({});
    const [remember, setRemember] = useState<boolean>(false);    
    const [RegisterUser, { isLoading }] = useRegisterUserMutation();

    useEffect(() => {
      const { access_token }: { access_token: any } = getToken();
      if (access_token) {
        router.push('/');
      }
    }, [router]);

    useEffect(()=>{
      if(called){
        if(isLoggedIn){
          router.push(`/`)
          setCalled(false)
        }
      }
    },[called,isLoggedIn, router])

    useEffect(() => {
      if (Object.keys(serverError).length > 0) {
        const errorKey = Object.keys(serverError)[0];
        if (serverError[errorKey] && serverError[errorKey].length > 0) {
          const errorMessage = serverError[errorKey][0];
          toast.error(errorMessage);
        }
      }
    }, [serverError]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);

      if (selected === "login") {
          const actualData = {
              email: userLogin?.email ? userLogin.email : formData.get("username") as string,
              password: formData.get("password") as string,
              remember : remember
          };
          handleLogin(actualData)
          setCalled(true)
      } else if (selected === "sign-up") {
          const actualData = {
              first_name: formData.get("first_name"),
              last_name: formData.get("last_name"),
              email: formData.get("email"),
              phone: formData.get("phone"),
              password: formData.get("password"),
              password2: formData.get("password2"),
              tc: accepted
          };
          const res = await RegisterUser(actualData);
          if (res.error) {
            const errorData = res.error as { data?: { errors?: any } };
            if (errorData.data && errorData.data.errors) {
              setServerError(errorData.data.errors);
            }
          }
          if (res.data) {
              console.log(res.data);
              toast.success(res.data.message);
              setSelected('login')
          }
      }
  };

  defineElement(lottie.loadAnimation);

  return (
    <>
      <Card className="h-full">
        <CardBody className="overflow-hidden">
          { !userLogin ? <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input autoFocus label="Email" name="username" type="email" startContent={<lord-icon trigger="hover" src="https://cdn.lordicon.com/nzixoeyk.json" colors="primary:#ffffff" style={{width:"20px",cursor:"pointer",height:"20px"}}></lord-icon>} isRequired/>
                <Input label="Password" name="password" type="password" isRequired/>
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    isSelected={remember} onValueChange={setRemember}
                    color="secondary"
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
                <Button color="secondary" size="lg" type="submit" variant="shadow">
                  Sign in
                </Button>
                <div className="flex gap-2 justify-center items-center">
                  <Divider className="my-4 w-[35%]" /> or{" "}
                  <Divider className="my-4 w-[35%]" />
                </div>
                <Button
                  color="secondary"
                  variant="bordered"
                  className="text-white"
                  size="lg"
                  onClick={() => signIn('google')}
                  startContent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="20px"
                      height="20px"
                      viewBox="-0.5 0 48 48"
                      version="1.1"
                    >
                      <g
                        id="Icons"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="Color-"
                          transform="translate(-401.000000, -860.000000)"
                        >
                          <g
                            id="Google"
                            transform="translate(401.000000, 860.000000)"
                          >
                            <path
                              d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                              id="Fill-1"
                              fill="#FBBC05"
                            ></path>
                            <path
                              d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                              id="Fill-2"
                              fill="#EB4335"
                            ></path>
                            <path
                              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                              id="Fill-3"
                              fill="#34A853"
                            ></path>
                            <path
                              d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                              id="Fill-4"
                              fill="#4285F4"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  }
                >
                  Google
                </Button>
                <Button
                  color="secondary"
                  variant="bordered"
                  className="text-white"
                  size="lg"
                  startContent={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 2500 2500"
                    >
                      <defs>
                        <radialGradient
                          id="0"
                          cx="332.14"
                          cy="2511.81"
                          r="3263.54"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset=".09" stopColor="#fa8f21" />
                          <stop offset=".78" stopColor="#d82d7e" />
                        </radialGradient>
                        <radialGradient
                          id="1"
                          cx="1516.14"
                          cy="2623.81"
                          r="2572.12"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            offset=".64"
                            stopColor="#8c3aaa"
                            stopOpacity="0"
                          />
                          <stop offset="1" stopColor="#8c3aaa" />
                        </radialGradient>
                      </defs>
                      <path
                        d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57"
                        fill="url(#0)"
                      />
                      <path
                        d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57"
                        fill="url(#1)"
                      />
                    </svg>
                  }
                >
                  Instagram
                </Button>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input type="text" isRequired name="first_name" autoFocus label="First Name" startContent={<lord-icon trigger="hover" src="https://cdn.lordicon.com/kthelypq.json" colors="primary:#ffffff" style={{width:"20px",cursor:"pointer",height:"20px"}}></lord-icon>}/>
                  <Input type="text" isRequired name="last_name" label="Last Name" startContent={<lord-icon trigger="hover" src="https://cdn.lordicon.com/kthelypq.json" colors="primary:#ffffff" style={{width:"20px",cursor:"pointer",height:"20px"}}></lord-icon>}/>
                </div>
                <Input type="email" isRequired name="email" label="Email" startContent={<lord-icon trigger="hover" src="https://cdn.lordicon.com/nzixoeyk.json" colors="primary:#ffffff" style={{width:"20px",cursor:"pointer",height:"20px"}}></lord-icon>}/>
                <Input type="number" isRequired name="phone" label="Phone" startContent={<lord-icon trigger="hover" src="https://cdn.lordicon.com/rsvfayfn.json" colors="primary:#ffffff" style={{width:"20px",cursor:"pointer",height:"20px"}}></lord-icon>}/>
                <Input type="password" isRequired name="password" label="Password" />
                <Input type="password" isRequired name="password2" label="Confirm Password" />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    onChange={() => setAccepted(prev => !prev)}
                    color="default"
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Accept Terms and Conditions
                  </Checkbox>
                </div>
                {!isLoading ? <Button color="secondary" type="submit" variant="shadow" size="lg">
                  Sign Up
                </Button> : <Button color="secondary" type="submit" variant="shadow" isLoading size="lg">
                  Sign Up
                </Button>}
              </form>
            </Tab>
          </Tabs> : 
            <form className="flex flex-col gap-4 py-5" onSubmit={handleSubmit}>

                  <div className="flex items-center justify-center flex-col gap-5">
                    <Avatar
                      icon={<AvatarIcon />}
                      classNames={{
                        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] w-20 h-20 text-large",
                        icon: "text-black/80",
                      }}
                      src={userLogin.profile}
                    />
                    <span className="items-center flex flex-col">
                      <h1>Log in as {userLogin.name}</h1>
                      <p>{userLogin.email} <span onClick={()=>{setuserLogin(null)}} className="text-xs text-sky-600 cursor-pointer"> Not you ?</span></p>
                    </span>
                  </div>

              <Input label="Password" name="password" type="password" isRequired/>
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  defaultSelected
                  color="default"
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Remember me
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
              <Button color="secondary" size="lg" type="submit" variant="shadow">
                Sign in
              </Button>

            </form>
          }

        </CardBody>
      </Card>
    </>
  );
}
