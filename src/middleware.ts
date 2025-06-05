
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authentication } from './actions/server/middleware_helpers';


export async function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname; // Lấy path hiện tại
    // Kiểm tra xem yêu cầu có phải là yêu cầu call api
    const isHTMLRequest = request.headers.get('accept')?.includes('text/x-component');

    // Nếu yêu cầu là call api thì bỏ qua
    if (isHTMLRequest) {
        return NextResponse.next();
    }

    const auth = await authentication();
    if (currentPath === "/login" && auth.isAuthentication === true) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (currentPath.startsWith("/admin") && auth.role != "ADMIN") {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (currentPath === "/" || currentPath.startsWith("/course") || currentPath === "/login") {
       
        if (auth.response != null) {
            return auth.response;
        }
        return NextResponse.next();
    }

    if (auth.response != null) {
        return auth.response;
    }
    return NextResponse.redirect(new URL('/', request.url))
}



export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt|manifest.json).*)',
    ],

}


