import { mysqlTable, int, varchar, text, timestamp } from "drizzle-orm/mysql-core";

export const reviews = mysqlTable("reviews", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    rating: int("rating").notNull(),
    comment: text("comment").notNull(),
    avatar: text("avatar"),
    status: varchar("status", { length: 20 }).default("pending").notNull(), // NAYA COLUMN
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const admins = mysqlTable("admins", {
    id: int("id").primaryKey().autoincrement(),
    username: varchar("username", { length: 100 }).notNull().unique(), // Length 100 kar di
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const screenshots = mysqlTable("screenshots", {
    id: int("id").primaryKey().autoincrement(),
    imageUrl: text("image_url").notNull(), // Yahan varchar ki jagah text hona chahiye
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const settings = mysqlTable("settings", {
    id: int("id").primaryKey().autoincrement(),
    key: varchar("key", { length: 100 }).notNull().unique(), // Jaise "installVideoUrl"
    value: text("value").notNull(), // Video ka URL
});