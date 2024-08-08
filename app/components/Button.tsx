import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const buttonStyles = cva("rounded-full py-2 transition-all px-10", {
  variants: {
    intent: {
      primary: "bg-purple-dark text-white hover:bg-purple-light",
      secondary: "bg-gray-light text-purple-dark hover:bg-gray-medium",
      destructive: "bg-red-dark text-white hover:bg-red-light",
    },
    size: {
      lg: "text-headingM",
      sm: "text-bodyM",
    },
    fullWidth: {
      true: "w-full",
    },
  },
});

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({
  children,
  intent,
  size,
  fullWidth,
}: Props & VariantProps<typeof buttonStyles>) => {
  return <button className={buttonStyles({ intent, size })}>{children}</button>;
};

export default Button;
