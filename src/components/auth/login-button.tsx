"use client";
import { useRouter } from 'nextjs-toploader/app';
interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
  asChild?: boolean;
}

export default function LoginButton({
  children,
  mode = "redirect",
}: LoginButtonProps) {
  const router = useRouter();
  const onClick = () => {router.push("/auth/login")};

  if(mode === "modal"){
    return(
        <>
        </>
    )
  }
  return <span onClick={onClick} className="cursor-pointer">{children}</span>;
}
