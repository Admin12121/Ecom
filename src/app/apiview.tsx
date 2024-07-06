"use client"
import { useNextRouterViewTransitions } from "use-view-transitions/next";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
export default function ApiViewTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Create an enhanced router object that includes the events property
  const enhancedRouter = {
    ...router,
    events: {
      on: (event: string, handler: Function) => {
        window.addEventListener(event, handler as EventListener);
      },
      off: (event: string, handler: Function) => {
        window.removeEventListener(event, handler as EventListener);
      },
    },
  };

  useNextRouterViewTransitions(enhancedRouter);
  return (
    <html lang="en" className="dark" data-pathname={pathname}>
      {children}
    </html>
  );
}
