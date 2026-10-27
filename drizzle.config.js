import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default defineConfig({
    schema: "./src/db/schema.js",
    out: "./drizzle",
    dialect: "mysql",
    dbCredentials: {
        host: process.env.DB_HOST || "127.0.0.1", // 'localhost' ki jagah '127.0.0.1' behtar hai
        port: 3306, // XAMPP ka default port
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || undefined, // Khali password ke liye undefined
        database: process.env.DB_NAME || "anzal_db",
    },
});