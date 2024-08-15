import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Icons } from "./Icons";

const inputStyles = cva(
    "px-2 min-w-[300px] w-full py-3 border rounded border-gray-dark/25  bg-transparent placeholder:black/25 text-black dark:text-white text-bodyL focus:outline-none",
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

const Input = React.forwardRef<
    HTMLInputElement,
    Props &
        VariantProps<typeof inputStyles> &
        React.InputHTMLAttributes<HTMLInputElement>
>(({ errorMessage, error, label, ...props }, ref) => {
    const ErrorIcon = Icons["alertCircle"];
    return (
        <div className="w-full space-y-1">
            {label ? (
                <label className="text-bodyM text-gray-dark">{label}</label>
            ) : null}
            <div className="relative">
                <input
                    {...props}
                    ref={ref}
                    type="text"
                    className={inputStyles({ error })}
                />
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

Input.displayName = "Input";

export default Input;
