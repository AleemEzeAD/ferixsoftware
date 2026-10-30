import { NextResponse } from "next/server";
import { connectDB } from "/lib/db";
import { reviews } from "../../../db/schema";
import { desc, eq } from "drizzle-orm";
import fs from "fs/promises";
import path from "path";

// GET Method waisa hi rahega...
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const isAdmin = searchParams.get("admin") === "true";

        const db = await connectDB();
        let allReviews;

        if (isAdmin) {
            allReviews = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
        } else {
            allReviews = await db.select().from(reviews).where(eq(reviews.status, "approved")).orderBy(desc(reviews.createdAt));
        }

        return NextResponse.json({ success: true, data: allReviews }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST Method Update (Image File Save)
export async function POST(request) {
    try {
        const formData = await request.formData();
        const name = formData.get("name");
        const rating = formData.get("rating");
        const comment = formData.get("comment");
        const file = formData.get("file"); // Image file

        if (!name || !rating || !comment) {
            return NextResponse.json({ success: false, error: "Please fill all fields" }, { status: 400 });
        }

        let avatarUrl = null;

        // Agar user ne image select ki hai toh save karein
        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `review-${Date.now()}-${file.name.replace(/\s/g, '-')}`;
            const uploadDir = path.join(process.cwd(), "public/uploads/reviews");

            try {
                await fs.access(uploadDir);
            } catch {
                await fs.mkdir(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, fileName);
            await fs.writeFile(filePath, buffer);
            avatarUrl = `/uploads/reviews/${fileName}`;
        }

        const db = await connectDB();
        const newReview = await db.insert(reviews).values({
            name,
            rating: Number(rating),
            comment,
            avatar: avatarUrl,
            status: "pending",
        });

        return NextResponse.json({ success: true, data: newReview }, { status: 201 });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}