import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../src/db/schema";

let pool;
let db;

export async function connectDB() {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST || "127.0.0.1",
            port: 3306,
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "anzal_db",
            waitForConnections: true,
            connectionLimit: 10,
        });
        db = drizzle(pool, { schema, mode: "default" });
    }
    return db;
}