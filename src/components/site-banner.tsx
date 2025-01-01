"use client";
import { useSyncExternalStore } from "react";
import { ChevronRight } from "lucide-react";

function useOnlineStatus() {
  const subscribe = (callback: any) => {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);
    return () => {
      window.removeEventListener("online", callback);
      window.removeEventListener("offline", callback);
    };
  };

  const getSnapshot = () => navigator.onLine;

  return useSyncExternalStore(subscribe, getSnapshot);
}

export default function SiteBanner() {
  const isOnline = useOnlineStatus();

  return (
    <>
      <div className="page_ambientContainer__xFtyW utils_inert__sliHw">
        <div className="page_ambientLight___Dvmo utils_inert__sliHw">
          <div className="page_lightA__3_ZLn"></div>
          <div className="page_lightB__k6xoL"></div>
          <div className="page_lightC__9Yvpx"></div>
        </div>
      </div>
      {!isOnline && (
        <div
          className="group relative top-0 bg-purple-600 py-2 text-white transition-all duration-300 md:py-0 w-full"
          style={{
            background: "linear-gradient(to right, #9353d3, #9333ea, #4f46e5)",
          }}
        >
          <div className="container flex flex-col items-center justify-center gap-4 md:h-9 md:flex-row">
            <div className="inline-flex text-xs leading-normal md:text-sm">
              {" "}
              <span className="ml-1 font-[580] dark:font-[550]">
                {" "}
                {isOnline
                  ? "Welcome back again 🟢 Online"
                  : "You are currently 🔴 Offline !"}
              </span>{" "}
              <ChevronRight className="ml-1 mt-[3px] hidden size-4 transition-all duration-300 ease-out group-hover:translate-x-1 lg:inline-block" />
            </div>
          </div>
          <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />
        </div>
      )}
    </>
  );
}
