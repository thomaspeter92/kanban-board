import React from "react";
import Button from "./Button";

type Props = {};

const Nav = (props: Props) => {
  return (
    <nav className="h-[96px] w-full border-b border-gray-medium dark:border-gray-dark/25 px-10 bg-white dark:bg-gray-darkest text-black-dark dark:text-white flex items-center justify-between">
      <h1 className="text-headingXl">Platform Launch</h1>
      <Button icon="plus" intent="primary">
        Add New Task
      </Button>
    </nav>
  );
};

export default Nav;
