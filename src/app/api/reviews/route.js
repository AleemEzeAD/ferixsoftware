import { NextResponse } from "next/server";
import { connectDB } from "/lib/db";
import { reviews } from "../../../db/schema"; 
import { desc } from "drizzle-orm";

export async function GET() {
    try {
        const db = await connectDB();
        const allReviews = await db.select().from(reviews).orderBy(desc(reviews.createdAt));

        return NextResponse.json({ success: true, data: allReviews }, { status: 200 });
    } catch (error) {
        console.error("GET Reviews Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST: Naya review save karna
export async function POST(request) {
    try {
        const db = await connectDB();
        const body = await request.json();
        const { name, rating, comment, avatar } = body;

        if (!name || !rating || !comment) {
            return NextResponse.json(
                { success: false, error: "Please fill all required fields" },
                { status: 400 }
            );
        }

        const newReview = await db.insert(reviews).values({
            name,
            rating: Number(rating),
            comment,
            avatar: avatar || null,
        });

        return NextResponse.json({ success: true, data: newReview }, { status: 201 });
    } catch (error) {
        console.error("POST Review Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}