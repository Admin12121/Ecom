import { useRouter, useSearchParams, usePathname } from "next/navigation";

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
