import { Icons } from "@/components/Icons";
import { getAllBoards } from "@/data/BoardManager";
import { GetAllBoards } from "@/data/types.BoardManager";
import Link from "next/link";

export default async function Home() {
  const boards: GetAllBoards = await getAllBoards();
  const ArrowRight = Icons["arrowRight"];
  return (
    <div className="container max-w-3xl m-auto">
      <h2 className="text-headingM dark:text-gray-medium text-gray-dark">
        RECENT BOARDS ({boards.length})
      </h2>
      <div className="space-y-2 my-5 block">
        {boards?.map((board, i) => (
          <Link
            key={board.id}
            href={"/boards/" + board.id}
            className="p-5 text-left w-full text-gray-darkest flex items-center bg-gray-medium dark:bg-gray-darkest dark:text-gray-medium rounded"
          >
            <p className="text-bodyL font-bold flex-1">{board.title}</p>
            <ArrowRight />
          </Link>
        ))}
      </div>
    </div>
  );
}
