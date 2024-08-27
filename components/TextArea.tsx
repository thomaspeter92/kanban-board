import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Icons } from "./Icons";

const textAreaStyles = cva(
  "px-2 resize-none w-full py-3 border rounded border-gray-dark/25  bg-transparent placeholder:black/25 text-black dark:text-white text-bodyL focus:outline-none",
  {
    variants: {
      error: {
        true: "border-red-dark",
      },
    },
  },
);

type Props = {
  errorMessage?: string;
  label?: string;
};

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  Props &
    VariantProps<typeof textAreaStyles> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ errorMessage, error, label, ...props }, ref) => {
  const ErrorIcon = Icons["alertCircle"];
  return (
    <div className="w-full space-y-1">
      {label ? (
        <label className="text-bodyM text-gray-dark">{label}</label>
      ) : null}
      <div className="relative">
        <textarea {...props} ref={ref} className={textAreaStyles({ error })} />
        {error && errorMessage ? (
          <span className="absolute text-xs px-2 right-2 bottom-full translate-y-1/2 text-red-dark flex justify-center items-center gap-1 bg-gray-light dark:bg-black-light">
            <ErrorIcon size={12.5} />
            {errorMessage}
          </span>
        ) : null}
      </div>
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
