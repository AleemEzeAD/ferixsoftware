import { NextResponse } from "next/server";
import { connectDB } from "/lib/db";
import { screenshots } from "../../../db/schema";
import { desc } from "drizzle-orm";
import fs from "fs/promises";
import path from "path";

// GET waisa hi rahega...
export async function GET() {
    try {
        const db = await connectDB();
        const allScreenshots = await db.select().from(screenshots).orderBy(desc(screenshots.createdAt));
        return NextResponse.json({ success: true, data: allScreenshots }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST Method (Local Folder Save)
export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
        }

        // File ka naam unique banayein
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;

        // public/uploads folder ka path banayein
        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Agar folder nahi hai toh bana dein
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        // File ko save karein
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);

        // Database mein path save karein
        const db = await connectDB();
        const imageUrl = `/uploads/${fileName}`;

        await db.insert(screenshots).values({ imageUrl });

        return NextResponse.json({ success: true, data: { imageUrl } }, { status: 201 });

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}