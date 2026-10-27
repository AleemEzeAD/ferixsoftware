import { NextResponse } from "next/server";
import { connectDB } from "/lib/db";

export async function GET(request) {
    try {
        const db = await connectDB();

        // URL se search query nikalna (jaise: /api/search?q=ahmed)
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q");

        // Agar query khali hai toh kuch return na karein
        if (!query) {
            return NextResponse.json({ success: true, data: [] }, { status: 200 });
        }

        // Database mein search query chalana (LIKE query)
        const [rows] = await db.query(
            "SELECT id, name, comment FROM reviews WHERE name LIKE ? OR comment LIKE ? LIMIT 5",
            [`%${query}%`, `%${query}%`]
        );

        return NextResponse.json({ success: true, data: rows }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}