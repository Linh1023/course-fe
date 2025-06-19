"use server"

import { FetchServerGetApi, FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import CourseInfoSection from "@/components/client/course/course_info"
import CourseInfoSkeleton from "@/components/client/course/course_info_skeleton"
import CourseSidebarSection from "@/components/client/course/course_sidebar"
import SidebarSkeleton from "@/components/client/course/sidebar_skeleton"
import MyConnect from "@/components/client/share/MyConnect"
import { redirect } from "next/navigation"
import { Suspense } from "react"

interface CoursePageProps {
    params: {
        id: string
    }
}
const CoursePage = async ({ params }: CoursePageProps) => {
    const res = await FetchServerGetApiNoToken(`${API.COURSE.ROOT}/${params.id}`);
    let courseResponse: CourseClientResponse | null = null

    if (res && res.status === 200) {
        courseResponse = res.result
    } else {
        redirect("/")
    }

    return (
        <>
            <div className="flex justify-center bg-gray-50">
                <div className="flex flex-col-reverse  md:flex-row max-w-[90rem] w-full px-4 gap-6 py-10">
                    {/* Cột trái: Nội dung khóa học */}
                    <Suspense fallback={<CourseInfoSkeleton />}>
                        <CourseInfoSection course={courseResponse} />
                    </Suspense>
                    {/* Cột phải: Sidebar khóa học */}
                    <Suspense fallback={<SidebarSkeleton />}>
                        <CourseSidebarSection course={courseResponse} courseId={params.id} />
                    </Suspense>
                </div>
            </div>
            <MyConnect />
        </>
    )
}
export default CoursePage