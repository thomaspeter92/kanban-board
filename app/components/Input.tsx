import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Icons } from "./Icons";

const inputStyles = cva('px-2 min-w-[300px] w-full py-3 border rounded border-gray-dark/25 bg-transparent placeholder:black/25 text-black dark:text-white text-bodyL focus:outline-none',
 { variants: {
    error: {
      true: "border-red-dark"
    }
  }
}
)

type Props = {
  errorMessage?: string
};

const Input = ({
  errorMessage,
  error,
  ...props
}: Props & VariantProps<typeof inputStyles> & React.InputHTMLAttributes<HTMLInputElement>) => {

  const ErrorIcon = Icons['alertCircle']

  return (
    <div className="relative w-fit">
    <input
      {...props}
      type="text"
      className={inputStyles({error})}
      />
      {error && errorMessage ? <span className="absolute text-xs right-2 top-1/2 -translate-y-1/2 text-red-dark flex items-center gap-1">
      <ErrorIcon size={10} />
      {errorMessage}</span> : null}
      </div>
  );
};

export default Input;
