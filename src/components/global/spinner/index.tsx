import Spinner, { SpinnerProps } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type NextSpinnerProps = SpinnerProps & { height?: string };

const NextSpinner = ({size="sm", color="secondary", height}: NextSpinnerProps) => {
  return (
    <span className={cn("flex h-full w-full items-center justify-center", height ? `h-${height}` :"") }>
      <Spinner size={size} color={color} />
    </span>
  );
};

export default NextSpinner;
