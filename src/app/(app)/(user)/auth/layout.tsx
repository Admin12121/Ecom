import type { Metadata } from "next";
import BackdropGradient from "@/components/global/backdrop-gradient";
import GlassCard from "@/components/global/glass-card";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="container h-[calc(100dvh_-_100px)] flex justify-center items-center max-w-[95rem]">
      <div className="flex flex-col w-full items-center py-24">
        <BackdropGradient
          className="w-4/12 h-2/6 opacity-40"
          container="flex flex-col items-center"
        >
          <GlassCard className="w-full max-w-[450px] xs:w-full md:w-7/12 lg:w-5/12 xl:w-4/12 p-0 items-center flex justify-center mt-16 ">
            {children}
          </GlassCard>
        </BackdropGradient>
      </div>
    </main>
  );
}
