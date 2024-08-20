import Board from "@/components/Board";
import { getBoardById } from "@/data/BoardManager";
import { BoardById } from "@/data/types.BoardManager";
import ErrorReponse from "@/util/ErrorReponse";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: number } }) => {
  const board: BoardById = await getBoardById(params.id);

  return <Board board={board} />;
};

export default Page;
