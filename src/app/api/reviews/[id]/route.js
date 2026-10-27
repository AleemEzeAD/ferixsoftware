import { NextResponse } from "next/server";
import { connectDB } from "/lib/db";
import { reviews } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request, context) {
    try {
        const params = await context.params;
        const rawId = params?.id;
        const id = parseInt(rawId);

        if (!rawId || isNaN(id)) {
            return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
        }

        const db = await connectDB();

        // Yahan db.delete(reviews) use karein
        await db.delete(reviews).where(eq(reviews.id, id));

        return NextResponse.json({ success: true, message: "Review deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}