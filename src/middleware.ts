import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { FetchServerPostApiNoToken } from './actions/server/fetch_server_api';
import API from './api/api';
import { getToken } from './actions/server/token_store';

export async function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname; // Lấy path hiện tại

    // Kiểm tra xem yêu cầu có phải là yêu cầu call api
    const isHTMLRequest = request.headers.get('accept')?.includes('text/x-component');

    // Nếu yêu cầu là call api thì bỏ qua
    if (isHTMLRequest) {
        return NextResponse.next();
    }


    if (currentPath === "/login") {
        const req: RefreshTokenRequest = {
            refreshToken: await getToken("refresh_token")
        }
        const res = await FetchServerPostApiNoToken(API.AUTH.INTROSPECT_REFRESH_TOKEN, req)
        if (res && res.status == 200) { return NextResponse.redirect(new URL('/', request.url)) }
        return NextResponse.next();
    }

    const isPublicRoute = currentPath === "/" || currentPath.startsWith("/course");
    if (isPublicRoute) {
        return NextResponse.next();
    }

    if (getToken("refresh_token") === undefined) { return NextResponse.redirect(new URL('/login', request.url)) }

    const req: RefreshTokenRequest = {
        refreshToken: await getToken("refresh_token")
    }
    const res = await FetchServerPostApiNoToken(API.AUTH.INTROSPECT_REFRESH_TOKEN, req)
    if (res && res.status === 401) { return NextResponse.redirect(new URL('/login', request.url)) }

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt|manifest.json).*)',
    ],

}