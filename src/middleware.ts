
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authentication } from './actions/server/middleware_helpers';
import { FetchServerGetApi } from './actions/server/fetch_server_api';
import API from './api/api';

export async function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname; // Lấy path hiện tại
    // Kiểm tra xem yêu cầu có phải là yêu cầu call api
    const isHTMLRequest = request.headers.get('accept')?.includes('text/x-component');

    console.log("🔥 Middleware is working >>>", request.nextUrl.pathname);

    // Nếu yêu cầu là call api thì bỏ qua
    if (isHTMLRequest) {
        return NextResponse.next();
    }

    const auth = await authentication(request);

    console.log("vo api ne >>> ", currentPath)
    if (currentPath.startsWith("/api/video/stream")) {

        const referer = request.headers.get("referer");

        // Nếu không có referer (nghĩa là người dùng nhập URL trực tiếp vào trình duyệt)
        // hoặc referer không đến từ trang web của bạn
        if (!referer) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        // Nếu có referer hợp lệ, tiếp tục cho phép
        return NextResponse.next();
       
    }







    if (currentPath === "/login" && auth.isAuthentication === true) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    const courseMatch = currentPath.match(/^\/course\/([^\/]+)$/)
    if (courseMatch && auth.isAuthentication) {

        const courseId = courseMatch[1]
        const resLessonProgress = await FetchServerGetApi(`${API.LESSON_PROGRESS.LAST_VIEWED_LESSON}/${courseId}`, undefined, false);
        if (resLessonProgress && resLessonProgress.status === 200) {
            const lessonProgress: LessonProgressResponse = resLessonProgress.result;
            if (lessonProgress != null && lessonProgress.lessonId != null) {
                return NextResponse.redirect(new URL(`/lesson/${lessonProgress.lessonId}`, request.url))
            }
        }
    }

    if (currentPath.startsWith("/admin") && auth.role != "ADMIN") {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (currentPath === "/" || currentPath.startsWith("/course") || currentPath === "/login" || currentPath.startsWith("/search") || currentPath === "/contact") {

        if (auth.response != null) {
            return auth.response;
        }
        return NextResponse.next();
    }

    if (auth.response != null) {
        return auth.response;
    }
    return NextResponse.next();
}



export const config = {
    matcher: [
        '/api/video/stream/:file*',
        '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt|manifest.json).*)',
    ],

}


