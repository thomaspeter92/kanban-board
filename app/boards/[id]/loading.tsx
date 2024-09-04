import LoadingCard from "@/components/LoadingCard";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="p-5 flex gap-5 w-full">
      <div className="space-y-5">
        <LoadingCard className="w-[280px] h-5" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
      </div>
      <div className="space-y-5 hidden sm:block">
        <LoadingCard className="w-[280px] h-5" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
      </div>
      <div className="space-y-5 hidden lg:block">
        <LoadingCard className="w-[280px] h-5" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
        <LoadingCard className="w-[280px] h-20" />
      </div>
    </div>
  );
};

export default Loading;
