import React from "react";

type Props = {};

const Input = ({
  ...props
}: Props & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      type="text"
      className="px-2 py-3 border rounded border-gray-dark bg-transparent placeholder:black/25 active:text-black text-bodyL focus:outline-none "
    />
  );
};

export default Input;
