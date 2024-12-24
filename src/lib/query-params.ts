"use client"
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

type QueryParams = Record<string, string>;

export function useUpdateQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPathname = usePathname();

  return (newParams: QueryParams, customPathname?: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.keys(newParams).forEach((key) => {
      currentParams.set(key, newParams[key]);
    });
    const finalPathname = customPathname || currentPathname;
    router.push(`${finalPathname}?${currentParams.toString()}`);
  };
}
