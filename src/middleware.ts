import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const userEmail = request.cookies.get('userEmail')
    const userName = request.cookies.get('userName')

    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (userEmail && userName) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}

