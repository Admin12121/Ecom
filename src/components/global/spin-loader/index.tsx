"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "@/components/ui/spinner";
import { CircleAlert, CircleX } from "lucide-react";

const AlertIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-circle-alert", className)}
    >
      <circle cx="12" cy="12" r="10" stroke="transparent" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
};

const ErrorIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-circle-x", className)}
    >
      <circle cx="12" cy="12" r="10" stroke="transparent" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
};

const CheckIcon = ({ className }: { className?: string }) => {
  return <Spinner size="sm" color="secondary" />;
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6 ", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

type StepState = {
  text: string;
  state: boolean;
  verified?: string;
};

const LoaderCore = ({
  steps,
  currentState,
}: {
  steps: StepState[];
  currentState: number;
}) => {
  const getIcon = (step: StepState) => {
    if (step.verified === "alert") {
      return <AlertIcon className="dark:stroke-black fill-orange-500" />;
    } else if (step.verified === "error") {
      return <ErrorIcon className="dark:stroke-black fill-red-500" />;
    } else {
      return <CheckFilled className="text-lime-500" />;
    }
  };

  return (
    <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-40 min-w-[240px]">
      {steps.map((step, index) => {
        const distance = Math.abs(index - currentState);
        const opacity = Math.max(1 - distance * 0.2, 0);

        return (
          <motion.div
            key={index}
            {...{ className: "text-left flex gap-2 mb-4" }}
            initial={{ opacity: 0, y: -(currentState + index) * 15 }}
            animate={{ opacity: opacity, y: -(currentState * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {step.state ? (
                getIcon(step)
              ) : (
                <CheckIcon className="text-black dark:text-white" />
              )}
            </div>
            <span
              className={cn(
                "text-black dark:text-white",
                step.state && "text-lime-500"
              )}
            >
              {step.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({ steps }: { steps: StepState[] }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...{
          className:
            "w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl",
        }}
      >
        <div className="h-96 relative">
          <LoaderCore steps={steps} currentState={steps.length} />
        </div>

        <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-white dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
      </motion.div>
    </AnimatePresence>
  );
};
