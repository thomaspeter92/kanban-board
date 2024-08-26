import React from "react";
import { Icons } from "./Icons";

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  const ErrorIcon = Icons["alertCircle"];
  return (
    <p className="text-red-dark flex gap-1 items-center">
      <ErrorIcon size={20} />
      {message}
    </p>
  );
};

export default ErrorMessage;
