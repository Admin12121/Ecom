import type { Metadata } from "next";


import Header from "./_components/header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full min-h-[100dvh] h-full flex flex-col max-w-[95rem]">
      <div className="w-full main-contant flex flex-col items-center lg:px-6 px-2 py-4 gap-3">
        <Header />
        {children}
      </div>
    </main>
  );
}
