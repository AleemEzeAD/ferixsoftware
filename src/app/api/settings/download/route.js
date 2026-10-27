import { NextResponse } from "next/server";
import { connectDB } from "/lib/db";
import { settings } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import fs from "fs/promises";
import path from "path";

// GET: File ka naam fetch karein
export async function GET() {
    try {
        const db = await connectDB();
        const result = await db.select().from(settings).where(eq(settings.key, "downloadFile"));

        return NextResponse.json({
            success: true,
            fileName: result.length > 0 ? result[0].value : null
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST: Nayi file upload aur database mein save karein
export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // File ka unique naam banayein
        const fileName = `Ferix-Setup-${Date.now()}.zip`;

        // public/assets/program folder ka path
        const uploadDir = path.join(process.cwd(), "public/assets/program");

        // Folder na ho toh bana dein
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        // File ko folder mein save karein
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);

        // Database mein save/update karein
        const db = await connectDB();
        const existing = await db.select().from(settings).where(eq(settings.key, "downloadFile"));

        if (existing.length > 0) {
            await db.update(settings).set({ value: fileName }).where(eq(settings.key, "downloadFile"));
        } else {
            await db.insert(settings).values({ key: "downloadFile", value: fileName });
        }

        return NextResponse.json({ success: true, fileName }, { status: 201 });

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}