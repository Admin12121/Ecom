import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecom",
  description: "",
};

import Header from "./_components/header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="w-full min-h-[100vh] h-full flex flex-col">
        <div className="w-full main-contant flex flex-col items-center lg:px-6 px-2 py-4 gap-3">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
}
