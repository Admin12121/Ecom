import React from "react";
import { Cookie } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const Cookies = () => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      {...{
        className:
          "fixed text-sm text-neutral-700 dark:text-neutral-300 w-auto h-12 bottom-20 md:bottom-2 left-2 backdrop-blur-sm bg-neutral-300/50 dark:bg-neutral-900/50 rounded-2xl flex items-center justify-center p-1",
      }}
    >
      <span className="rounded-xl dark:bg-neutral-900 p-1 bg-white w-full h-full flex items-center gap-10 pl-2 justify-between">
        <span className="flex gap-2 items-center">
          <span className="p-1 rounded-full bg-neutral-300/50 dark:bg-neutral-800">
            <Cookie size={20} className="dark:stroke-white" />
          </span>{" "}
          By clicking &quot;Accept&quot;, you agree to the storing of cookies on
          your device.
        </span>
        <span className="h-full w-auto flex items-center gap-2">
          <Button
            className="rounded-lg dark:border-none"
            variant={"outline"}
            size={"sm"}
          >
            Reject
          </Button>
          <Button className="rounded-lg shadow-lg" size={"sm"}>
            Accept
          </Button>
        </span>
      </span>
    </motion.div>
  );
};

export default Cookies;
