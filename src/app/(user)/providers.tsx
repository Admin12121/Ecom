import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar/Navbar";
const Footer = dynamic(() => import("@/components/Footer/footer"), {
  ssr: false,
});

export interface ProvidersProps {
  children: React.ReactNode;
}
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
