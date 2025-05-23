import * as React from "react";
import { cn } from "./utils"; // if you don't use clsx/twMerge, remove this line

export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`w-full bg-gray-900 text-white placeholder-gray-400 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
});

Input.displayName = "Input";
