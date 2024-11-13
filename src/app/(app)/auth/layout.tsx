import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BackdropGradient from "@/components/global/backdrop-gradient";
import GlassCard from "@/components/global/glass-card";
import { siteConfig } from "@/config/site";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecom",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container h-screen flex justify-center items-center">
      <div className="flex flex-col w-full items-center py-24">
        <h2 className="text-4xl font-bold text-themeTextWhite">
          {siteConfig.name}
        </h2>
        <BackdropGradient
          className="w-4/12 h-2/6 opacity-40"
          container="flex flex-col items-center"
        >
          <GlassCard className="xs:w-full md:w-7/12 lg:w-5/12 xl:w-4/12 p-7 items-center flex justify-center mt-16 ">
            {children}
          </GlassCard>
        </BackdropGradient>
      </div>
    </div>
  );
}
