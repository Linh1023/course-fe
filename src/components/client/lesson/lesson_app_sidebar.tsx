import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { ChevronDown, Video } from "lucide-react"
import LessonCollapsible from "./lesson_collapsible"

interface Props {
    courseInfoResponse: CourseInfoResponse | null
    clickedLessons: string[]
}

export function LessonAppSidebar(props: Props) {
    const { courseInfoResponse, clickedLessons } = props

    return (
        <>
            <Sidebar
                side="right"
                className="
        top-[68px] h-[calc(100vh-130px)] 
        border-l border-gray-200 bg-white
    "
            >
                <SidebarContent className="flex flex-col">
                    <SidebarGroup className="px-4 py-4 border-b border-gray-200">
                        {/* Header */}
                        <h2 className="font-bold text-lg mb-2 text-gray-800">
                            Danh sách bài học
                        </h2>

                        {/* Course Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-1">
                            <div className="bg-blue-50 rounded-lg p-3 text-center">
                                <div className="text-blue-600 text-lg font-bold">
                                    {courseInfoResponse?.chapters?.reduce((total, chapter) =>
                                        total + (chapter.lessons?.length || 0), 0
                                    ) || 0}
                                </div>
                                <div className="text-blue-600 text-xs font-medium">Tổng bài</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3 text-center">
                                <div className="text-green-600 text-lg font-bold">
                                    {courseInfoResponse?.chapters?.reduce((total, chapter) =>
                                        total + (chapter.lessons?.filter(lesson =>
                                            lesson.viewed || clickedLessons.includes(lesson.id)
                                        ).length || 0), 0
                                    ) || 0}
                                </div>
                                <div className="text-green-600 text-xs font-medium">Đã học</div>
                            </div>
                            <div className="bg-amber-50 rounded-lg p-3 text-center">
                                <div className="text-amber-600 text-lg font-bold">
                                    {Math.round(
                                        ((courseInfoResponse?.chapters?.reduce((total, chapter) =>
                                            total + (chapter.lessons?.filter(lesson =>
                                                lesson.viewed || clickedLessons.includes(lesson.id)
                                            ).length || 0), 0
                                        ) || 0) /
                                            Math.max(1, courseInfoResponse?.chapters?.reduce((total, chapter) =>
                                                total + (chapter.lessons?.length || 0), 0
                                            ) || 1)) * 100
                                    )}%
                                </div>
                                <div className="text-amber-600 text-xs font-medium">Tiến độ</div>
                            </div>
                        </div>
                    </SidebarGroup>

                    {/* Lessons Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto">
                        <SidebarGroup className="px-4 py-2">
                            <SidebarMenu >
                                {courseInfoResponse?.chapters?.map((chapter, index) => (
                                    <div key={chapter.id || index}>
                                        <LessonCollapsible
                                            chapterSidebarResponse={chapter}
                                            clickedLessons={clickedLessons}
                                        />
                                    </div>
                                ))}

                                {/* Empty State */}
                                {(!courseInfoResponse?.chapters || courseInfoResponse.chapters.length === 0) && (
                                    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="text-base font-medium text-gray-600 mb-2">Chưa có nội dung</h3>
                                        <p className="text-sm text-gray-500 text-center">
                                            Khóa học này chưa có chương nào
                                        </p>
                                    </div>
                                )}
                            </SidebarMenu>
                        </SidebarGroup>
                    </div>
                </SidebarContent>
            </Sidebar>

        </>
    )
}