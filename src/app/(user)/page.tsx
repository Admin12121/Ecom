import dynamic from "next/dynamic";
import SpinnerLocal from "@/components/ui/spinner";

const Home = dynamic(() => import("@/components/User/Home"), {
  loading: () => (
    <div className="w-screen h-screen flex items-center justify-center">
      <SpinnerLocal />
    </div>
  ),
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}
