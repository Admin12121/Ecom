"use client";
import { useRouter } from "next/navigation";
interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
  asChild?: boolean;
}

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
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
