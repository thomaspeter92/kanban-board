"use client";
import { cva, VariantProps } from "class-variance-authority";
import { Icons } from "./Icons";

const buttonStyles = cva(
  "rounded-full py-2 transition-all px-10 flex items-center gap-2 capitalize justify-center whitespace-nowrap",
  {
    variants: {
      intent: {
        primary: "bg-purple-dark text-white hover:bg-purple-light",
        secondary:
          "bg-purple-dark/10 dark:bg-white text-purple-dark hover:bg-gray-medium",
        destructive: "bg-red-dark text-white hover:bg-red-light",
      },
      size: {
        lg: "text-headingM py-3",
        sm: "text-bodyM py-2",
      },
      fullWidth: {
        true: "w-full",
      },
      minimize: {
        true: "px-4",
      },
    },
  },
);

type Props = {
  children: React.ReactNode;
  icon?: keyof typeof Icons;
  onClick?: (args: any) => void;
  type?: "button" | "submit";
};
// Minimise will reduce the button to an icon only on mobile devices
const Button = ({
  children,
  intent,
  size,
  icon,
  type,
  fullWidth,
  onClick,
  minimize,
}: Props & VariantProps<typeof buttonStyles>) => {
  const Icon = Icons[icon ? icon : "heart"];
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles({ intent, size, fullWidth, minimize })}
    >
      {icon ? <Icon size={15} strokeWidth={3} /> : null}
      <span className={minimize && icon ? "hidden sm:inline" : ""}>
        {children}
      </span>
    </button>
  );
};

export default Button;
