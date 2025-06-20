
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authentication } from './actions/server/middleware_helpers';
import { FetchServerGetApi } from './actions/server/fetch_server_api';
import API from './api/api';


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

    const courseMatch = currentPath.match(/^\/course\/([^\/]+)$/)
    if (courseMatch && auth.isAuthentication === true) {
        const courseId = courseMatch[1];

        try {
            const resLessonProgress = await FetchServerGetApi(
                `${API.LESSON_PROGRESS.LAST_VIEWED_LESSON}/${courseId}`
            );

            if (resLessonProgress?.status === 200) {
                const lessonProgress: LessonProgressResponse = resLessonProgress.result;
                if (lessonProgress?.lessonId) {
                    return NextResponse.redirect(new URL(`/lesson/${lessonProgress.lessonId}`, request.url));
                }
            }
        } catch (error) {
            console.error("Fetch lesson progress failed:", error);
        }
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
        '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt|manifest.json).*)',
    ],

}


