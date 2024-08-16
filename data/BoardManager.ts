import pool from "./db";
import { Tables } from "./db.types";

export const getAllBoards = async () => {
  try {
    const { rows } = await pool.query<Tables<"boards">>("SELECT * FROM boards");
    return rows;
  } catch {}
};

export const getBoardById = async (id: number) => {
  try {
    const { rows } = await pool.query<Tables<"boards">>(
      "SELECT * FROM boards WHERE id = $1",
      [id],
    );
    return rows;
  } catch {}
};
