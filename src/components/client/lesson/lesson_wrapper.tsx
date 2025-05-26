"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebarLesson } from "@/components/client/lesson/lesson_app_sidebar"
import LessonContent from "./lesson_content"
import { Button } from "@/components/ui/button"
import { BookCheck, ChevronLeft, ChevronRight, CirclePlay } from "lucide-react"
const LessonWrapper = () => {
    return (
        <>
            <SidebarProvider
                style={{
                    "--sidebar-width": "370px"
                } as React.CSSProperties}

            >
                <main className="flex-1 overflow-y-auto h-[calc(100vh-132px)] ">
                    <LessonContent />
                </main>
                <AppSidebarLesson />

                <div className=" fixed bottom-0  z-50 flex items-center p-2 bg-gray-200  control-lesson-custom justify-between
                w-full
                ">
                    <span className="flex items-center font-bold gap-2 lesson-chapter-custom mr-[10px]" > <CirclePlay /> Chương 1. Cú pháp trong lập trình mới nhất hiện nay</span>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center">
                            <Button className="h-[40px] mr-[5px]">
                                <ChevronLeft />
                                <span className="button-next-lesson-custom"> Bài trước</span>
                            </Button>
                            <Button className="h-[40px] bg-[#3B82F6] hover:bg-[#6a95db]">
                                <span className="button-next-lesson-custom ">  Bài tiếp</span>
                                <ChevronRight />
                            </Button>
                        </div>

                        <SidebarTrigger
                            className={`bg-[#FE4444] text-white hover:text-white px-4 py-3 rounded-lg shadow-lg
                        hover:bg-[#F87171] transition-colors flex items-center gap-2 w-[120px] h-[40px]
                        before:content-['📖_Danh_sách'] 
                        [&>*]:hidden sidebar-trigger-custom`}
                        />
                    </div>

                </div>
            </SidebarProvider>
        </>
    )
}

export default LessonWrapper