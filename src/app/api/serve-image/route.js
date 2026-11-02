import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const fileName = searchParams.get("file");

        if (!fileName) {
            return NextResponse.json({ error: "File name required" }, { status: 400 });
        }

        // Yahan path check karein: uploads/screenshots
        const filePath = path.join(process.cwd(), "uploads/screenshots", fileName);

        try {
            await fs.access(filePath);
        } catch {
            console.error("File not found at:", filePath); // Debugging ke liye
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        const fileBuffer = await fs.readFile(filePath);

        const ext = path.extname(fileName).toLowerCase();
        let contentType = "image/jpeg";
        if (ext === ".png") contentType = "image/png";
        else if (ext === ".webp") contentType = "image/webp";
        else if (ext === ".avif") contentType = "image/avif";

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: { "Content-Type": contentType },
        });
    } catch (error) {
        console.error("Serve Image Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}