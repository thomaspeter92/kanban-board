import { Pool } from "pg";
// import { Tables } from "@/types/supabase";

const pool = new Pool({
  user: "postgres.agnyplfsaxnjpwfvooyi",
  host: "aws-0-ap-northeast-2.pooler.supabase.com",
  database: "postgres",
  password: "SDFsR_PL.kD5TTt",
  port: 6543,
});

export default pool;
