import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import Modal from "@/components/Modal";
import { getAllBoards } from "@/data/BoardManager";
import Head from "next/head";
import { redirect } from "next/navigation";

const jakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Portfolio project by thomaspeter92",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const boards = await getAllBoards();

  return (
    <html lang="en" className="dark">
      <body
        className={`${jakartaSans.className} bg-gray-light dark:bg-black-medium flex h-screen`}
      >
        <Sidebar boards={boards ? boards : []} />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Nav boards={boards ? boards : []} />
          <main className="flex-1 p-5 overflow-hidden">{children}</main>
        </div>
        <Modal />
      </body>
    </html>
  );
}
