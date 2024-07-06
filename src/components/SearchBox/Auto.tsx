import React from "react";
export const ListboxWrapper = ({children}:{children:any}) => (
  <div className="w-full max-w-[260px] absolute top-[45px] left-[15px] border-small rounded-small border-default-200 dark:border-default-100 bg-default-100/80">
    {children}
  </div>
);
