import Board from "@/components/Board";
import { getBoardById } from "@/data/BoardManager";
import React from "react";

const Page = async ({ params }: { params: { id: number } }) => {
  const board = await getBoardById(params.id);

  // console.log(board);
  return <Board />;
};

export default Page;
