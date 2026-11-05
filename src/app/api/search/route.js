import { NextResponse } from "next/server";
import { connectDB } from "/lib/db";
import { reviews } from "../../../db/schema";
import { like, or, eq, and } from "drizzle-orm";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q");

        if (!query) {
            return NextResponse.json({ success: true, data: [] }, { status: 200 });
        }

        const db = await connectDB();

        // Drizzle ORM ke zariye search query
        const results = await db.select({
            id: reviews.id,
            name: reviews.name,
            comment: reviews.comment,
        })
            .from(reviews)
            .where(
                and(
                    eq(reviews.status, "approved"), // Sirf approved reviews search hon
                    or(
                        like(reviews.name, `%${query}%`),
                        like(reviews.comment, `%${query}%`)
                    )
                )
            )
            .limit(5);

        return NextResponse.json({ success: true, data: results }, { status: 200 });

    } catch (error) {
        console.error("Search Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}