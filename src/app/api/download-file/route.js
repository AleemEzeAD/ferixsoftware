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

        // File ka path banayein (public/assets/program ke andar)
        const filePath = path.join(process.cwd(), "public/assets/program", fileName);

        // Check karein file mojood hai ya nahi
        try {
            await fs.access(filePath);
        } catch {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        // File read karein
        const fileBuffer = await fs.readFile(filePath);

        // File return karein download headers ke saath
        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Disposition": `attachment; filename="${fileName}"`,
                "Content-Type": "application/zip",
            },
        });
    } catch (error) {
        console.error("Download Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}