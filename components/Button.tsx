"use client";
import { cva, VariantProps } from "class-variance-authority";
import { Icons } from "./Icons";

const buttonStyles = cva(
  "rounded-full py-2 transition-all px-10 flex items-center gap-2 capitalize",
  {
    variants: {
      intent: {
        primary: "bg-purple-dark text-white hover:bg-purple-light",
        secondary:
          "bg-purple-dark/10 dark:bg-white text-purple-dark hover:bg-gray-medium",
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
  }
);

type Props = {
  children: React.ReactNode;
  icon?: keyof typeof Icons;
  onClick?: () => void;
  type?: "button" | "submit";
};

const Button = ({
  children,
  intent,
  size,
  icon,
  type,
  onClick,
}: Props & VariantProps<typeof buttonStyles>) => {
  const Icon = Icons[icon ? icon : "heart"];
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles({ intent, size })}
    >
      {icon ? <Icon size={15} strokeWidth={3} /> : null}
      {children}
    </button>
  );
};

export default Button;
