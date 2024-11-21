import React from "react";
import { Code } from "@/components/ui/code";
import { OctagonAlert } from "lucide-react";

interface StockWarningMessageProps {
  message: string;
}

const StockWarningMessage: React.FC<StockWarningMessageProps> = ({
  message,
}) => (
  <span className="w-full flex justify-center items-center px-2">
    <Code className="w-full text-base flex items-center justify-center flex-row bg-white dark:bg-neutral-950 rounded-md h-[50px]">
      <p className="flex items-center justify-center flex-row gap-2 text-orange-500">
        <OctagonAlert size={18} /> {message}
      </p>
    </Code>
  </span>
);

export default StockWarningMessage;
