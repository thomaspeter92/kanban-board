import { Pool, types } from "pg";
// import { Tables } from "@/types/supabase";
import { PostgresDialect, Kysely } from "kysely";
import { Database } from "./types.db";

// Override the parser for BIGINT and NUMERIC to return integers (JS Problem with Postgres)
types.setTypeParser(20, (val) => parseInt(val, 10)); // 20 is the OID for BIGINT
types.setTypeParser(1700, (val) => parseFloat(val)); // 1700 is the OID for NUMERIC

const dialect = new PostgresDialect({
  pool: new Pool({
    user: "postgres.agnyplfsaxnjpwfvooyi",
    host: "aws-0-ap-northeast-2.pooler.supabase.com",
    database: "postgres",
    password: "SDFsR_PL.kD5TTt",
    port: 6543,
  }),
});

export default new Kysely<Database>({
  dialect,
});
