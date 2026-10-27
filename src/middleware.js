import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Next.js Edge runtime ke liye jose behtar hai

export async function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin-login', request.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_123");
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/admin-login', request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};