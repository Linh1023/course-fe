"use server"

import { FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import CourseInfoSection from "@/components/client/course/course_info"
import CourseInfoSkeleton from "@/components/client/course/course_info_skeleton"
import CourseSidebarSection from "@/components/client/course/course_sidebar"
import SidebarSkeleton from "@/components/client/course/sidebar_skeleton"
import MyConnect from "@/components/client/share/MyConnect"
import { redirect } from "next/navigation"

interface CoursePageProps {
    params: {
        id: string
    }
}
const CoursePage = async ({ params }: CoursePageProps) => {
    const res = await FetchServerGetApiNoToken(`${API.COURSE.ROOT}/${params.id}`);
    let courseResponse: CourseClientResponse | null = null

    const commentResponse: CommentClientResponse = await FetchServerGetApiNoToken(
        `${API.COMMENT.PUBLIC_COMMENT_COURSE}?courseId=${params.id}`
    );
    if (commentResponse && commentResponse.status != 200) {
        redirect("/");
    }
    if (res && res.status === 200) {
        courseResponse = res.result
    } else {
        redirect('/');
    }

    if (!courseResponse) {
        return <>
            <div className="flex flex-col-reverse md:flex-row max-w-[90rem] w-full px-4 gap-6 py-10">
                <CourseInfoSkeleton />
                <SidebarSkeleton />
            </div>
        </>
    }

    return (
        <>
            <div className="flex justify-center bg-gray-50">
                <div className="flex flex-col-reverse md:flex-row max-w-[90rem] w-full px-4 gap-6 py-10">
                    {/* Cột trái: Nội dung khóa học */}
                    <CourseInfoSection course={courseResponse} comments={commentResponse?.result} />
                    {/* Cột phải: Sidebar khóa học */}
                    <CourseSidebarSection course={courseResponse} courseId={params.id} />
                </div>
            </div>
            <MyConnect />
        </>
    )
}
export default CoursePage