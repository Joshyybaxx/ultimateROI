import * as React from "react";

export const Label = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`block text-white text-sm font-medium mb-1 ${className}`}
      {...props}
    />
  );
});

Label.displayName = "Label";
