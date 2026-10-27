import { NextResponse } from "next/server";
import { connectDB } from "/lib/db";
import { settings } from "../../../../db/schema";
import { eq } from "drizzle-orm";

// GET: Video URL fetch karein
export async function GET() {
    try {
        const db = await connectDB();
        const result = await db.select().from(settings).where(eq(settings.key, "installVideoUrl"));

        return NextResponse.json({
            success: true,
            url: result.length > 0 ? result[0].value : ""
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST: Video URL save/update karein
export async function POST(request) {
    try {
        const db = await connectDB();
        const body = await request.json();
        const { videoUrl } = body;

        if (!videoUrl) {
            return NextResponse.json({ success: false, error: "Video URL required" }, { status: 400 });
        }

        // Check karein ke pehle se video hai ya nahi
        const existing = await db.select().from(settings).where(eq(settings.key, "installVideoUrl"));

        if (existing.length > 0) {
            // Update karein
            await db.update(settings).set({ value: videoUrl }).where(eq(settings.key, "installVideoUrl"));
        } else {
            // Naya insert karein
            await db.insert(settings).values({ key: "installVideoUrl", value: videoUrl });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}