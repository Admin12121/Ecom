"use client";

import { Layout } from "@/components/Admin/layout/layout";


export function Providers({ children }:{children: React.ReactNode}) {

  return (
        <Layout>{children}</Layout>
  );
}
