import { NextResponse } from "next/server";
import { connectDB } from "/lib/db";
import { reviews } from "../../../../../db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request, context) {
    try {
        const params = await context.params;
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
        }

        const db = await connectDB();
        await db.update(reviews).set({ status: "approved" }).where(eq(reviews.id, id));

        return NextResponse.json({ success: true, message: "Review approved" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}