import { NextResponse } from "next/server";
import { connectDB } from "/lib/db";
import { admins } from "../../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ success: false, error: "Username and password required" }, { status: 400 });
        }

        const db = await connectDB();

        // 1. Database se admin dhoondein
        const adminData = await db.select().from(admins).where(eq(admins.username, username));

        if (adminData.length === 0) {
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }

        const admin = adminData[0];

        // 2. Password compare karein (Plain text vs Hashed)
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }

        // 3. Login successful - Token banayein (JWT)
        // Note: .env.local mein JWT_SECRET add karein (jaise: JWT_SECRET=mysecretjwtkey123)
        const token = jwt.sign(
            { adminId: admin.id, username: admin.username },
            process.env.JWT_SECRET || "fallback_secret_123",
            { expiresIn: "1d" }
        );

        const response = NextResponse.json({ success: true }, { status: 200 });

        // Token ko cookie mein save karein
        response.cookies.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}