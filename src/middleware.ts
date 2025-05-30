
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { FetchServerPostApiNoToken, refreshToken } from './actions/server/fetch_server_api';
import API from './api/api';
import { getToken, removeToken } from './actions/server/token_store';

export async function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname; // Lấy path hiện tại

    // Kiểm tra xem yêu cầu có phải là yêu cầu call api
    const isHTMLRequest = request.headers.get('accept')?.includes('text/x-component');

    // Nếu yêu cầu là call api thì bỏ qua
    if (isHTMLRequest) {
        return NextResponse.next();
    }


    if (currentPath === "/login") {
        const reqIntrospectAccessToken:AccessTokenRequest = {
            accessToken: await getToken("access_token")
        }
        const resIntrospectAccessToken = await FetchServerPostApiNoToken(API.AUTH.INTROSPECT_ACCESS_TOKEN, reqIntrospectAccessToken)
        if (resIntrospectAccessToken && resIntrospectAccessToken.status == 200) { return NextResponse.redirect(new URL('/', request.url)) }

        const req: RefreshTokenRequest = {
            refreshToken: await getToken("refresh_token")
        }
        const res = await FetchServerPostApiNoToken(API.AUTH.INTROSPECT_REFRESH_TOKEN, req)
        if (res && res.status == 200) { return NextResponse.redirect(new URL('/', request.url)) }
        console.log("Chạy middware login >>>>")
        return NextResponse.next();
    }


    if ((currentPath === "/" && await getToken("refresh_token") === undefined) || (currentPath.startsWith("/course") && await getToken("refresh_token") === undefined)) {
        console.log("Chạy middware home >>>>")
        return NextResponse.next();
    }

    const reqIntrospect: RefreshTokenRequest = {
        refreshToken: await getToken("refresh_token")
    }
    const resIntrospect = await FetchServerPostApiNoToken(API.AUTH.INTROSPECT_REFRESH_TOKEN, reqIntrospect)
    if ((currentPath === "/" && resIntrospect.status != 200) || (currentPath.startsWith("/course") && resIntrospect.status != 200)) {
        console.log("Chạy middware home >>>>")
        return NextResponse.next();
    }



    //  truong hop nguoi dung da dang nhap va khong o trang public thi se xac thuc
    const req: AccessTokenRequest = {
        accessToken: await getToken("access_token")
    }
    const res = await FetchServerPostApiNoToken(API.AUTH.INTROSPECT_ACCESS_TOKEN, req)

    if (await getToken("access_token") === undefined || (res && res.status !== 200)) {
        if (await getToken("refresh_token") === undefined) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        const req: RefreshTokenRequest = {
            refreshToken: await getToken("refresh_token")
        }
        const res = await FetchServerPostApiNoToken(API.AUTH.REFRESH_TOKEN, req)
        if (res && res.status === 200) {
            const data: AuthenticationResponse = res.result
            const response = NextResponse.next();
            await response.cookies.set('access_token', data.accessToken, {
                path: '/',
                httpOnly: true,
                secure: true,
                maxAge: 60 * 30,
            });
            return response;
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }

    }


}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt|manifest.json).*)',
    ],

}


