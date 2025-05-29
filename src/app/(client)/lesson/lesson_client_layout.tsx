"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { BookCheck, ChevronLeft, ChevronRight, CirclePlay } from "lucide-react"
import { LessonAppSidebar } from "@/components/client/lesson/lesson_app_sidebar";
import { use, useEffect, useState } from "react";
import { FetchClientGetApi, FetchClientPostApi } from "@/actions/client/fetch_client_api";
import { usePathname, useRouter } from "next/navigation";
import API from "@/api/api";
import { useLoadingContext } from "@/context/loading_context";

export default function LessonClientLayout({ children }: { children: React.ReactNode }) {

    const pathName = usePathname();
    const router = useRouter()
    const [courseInfoResponse, setCourseInfoResponse] = useState<CourseInfoResponse | null>(null);
    const [chapter, setChapter] = useState<string>(courseInfoResponse?.chapters[0].name || "");

    const [clickedLessons, setClickedLessons] = useState<string[]>([]);
    const parts = pathName.split('/');
    const currentLessonId = parts[2];
    const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext()


    useEffect(() => {
        setClickedLessons(prev =>
            prev.includes(currentLessonId) ? prev : [...prev, currentLessonId]
        );
    }, [pathName])







    useEffect(() => {
        
        const fetchGetCourseInfo = async () => {
            startLoadingSpiner()
            const parts = pathName.split('/'); // ["", "lesson", "abc123"]
            const lessonId = parts[2]; // "abc123"

            const res = await FetchClientGetApi(`${API.LESSON.GET_COURSE_INFO}/${lessonId}`)
            if (res && res.status === 200) {
                const courseInfoResponse: CourseInfoResponse = res.result;
                setCourseInfoResponse(courseInfoResponse);
            }
            stopLoadingSpiner()
        }
        fetchGetCourseInfo()
    }, [])

    useEffect(() => {

        if (!courseInfoResponse) return;

        for (const chapter of courseInfoResponse.chapters) {
            const foundLesson = chapter.lessons.find(lesson => lesson.id === currentLessonId);
            if (foundLesson) {
                setChapter(chapter.name);
                break;
            }
        }

    }, [pathName])


    useEffect(() => {
        const fetch = async () => {
            startLoadingSpiner()
            await FetchClientPostApi(`${API.LESSON_PROGRESS.VIEWED_LESSON_PROGRESS}/${currentLessonId}`)
            stopLoadingSpiner()
        }
        fetch()
    }, [pathName])

    const handlePreviousLesson = () => {
        if (!courseInfoResponse) return;

       
        let found = false;

        for (let i = 0; i < courseInfoResponse.chapters.length; i++) {
            const chapter = courseInfoResponse.chapters[i];
            const lessonIndex = chapter.lessons.findIndex(lesson => lesson.id === currentLessonId);

            if (lessonIndex !== -1) {
                 startLoadingSpiner()
                if (lessonIndex > 0) {
                    // Lùi về bài trước trong cùng chương
                    const prevLessonId = chapter.lessons[lessonIndex - 1].id;
                    router.push(`/lesson/${prevLessonId}`);
                } else if (i > 0) {
                    // Lùi về chương trước, bài cuối cùng
                    const prevChapter = courseInfoResponse.chapters[i - 1];
                    const prevLessonId = prevChapter.lessons[prevChapter.lessons.length - 1].id;
                    router.push(`/lesson/${prevLessonId}`);

                }
                found = true;
                break;
            }
        }

        if (!found) {
            console.warn("Lesson not found in any chapter.");
        }
    };

    const handleNextLesson = () => {
        if (!courseInfoResponse) return;


       
        let found = false;

        for (let i = 0; i < courseInfoResponse.chapters.length; i++) {
            const chapter = courseInfoResponse.chapters[i];
            const lessonIndex = chapter.lessons.findIndex(lesson => lesson.id === currentLessonId);

            if (lessonIndex !== -1) {
                 startLoadingSpiner()
                if (lessonIndex < chapter.lessons.length - 1) {
                    // Tới bài tiếp theo trong cùng chương
                    const nextLessonId = chapter.lessons[lessonIndex + 1].id;
                    router.push(`/lesson/${nextLessonId}`);

                } else if (i < courseInfoResponse.chapters.length - 1) {
                    // Tới chương kế tiếp, bài đầu tiên
                    const nextChapter = courseInfoResponse.chapters[i + 1];
                    const nextLessonId = nextChapter.lessons[0].id;
                    router.push(`/lesson/${nextLessonId}`);

                }
                found = true;
                break;
            }
        }

        if (!found) {
            console.warn("Lesson not found in any chapter.");
        }
    };




    return (
        <>

            <div className="fixed top-68 left-0 h-full w-full z-30">

                <SidebarProvider
                    style={{
                        "--sidebar-width": "370px"
                    } as React.CSSProperties}

                >

                    <main className="flex-1 overflow-y-auto h-[calc(100vh-132px)] ">
                        <div className="p-2">
                            <span className="font-bold flex items-center gap-2 text-[20px]" > <BookCheck /> {courseInfoResponse?.name}</span>
                            {children}
                        </div>
                    </main>

                    <LessonAppSidebar
                        courseInfoResponse={courseInfoResponse}
                        clickedLessons={clickedLessons}
                    />

                    <div className=" fixed bottom-0  z-50 flex items-center p-2 bg-[#f1f5f9]  control-lesson-custom justify-between
                w-full
                ">
                        <span className="flex items-center font-bold gap-2 lesson-chapter-custom mr-[10px]" > <CirclePlay /> {chapter}</span>

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center">
                                <Button className="h-[40px] mr-[5px]"
                                    onClick={() => { handlePreviousLesson() }}
                                >
                                    <ChevronLeft />
                                    <span className="button-next-lesson-custom"

                                    > Bài trước</span>
                                </Button>
                                <Button className="h-[40px] bg-[#3B82F6] hover:bg-[#6a95db]"
                                    onClick={() => { handleNextLesson() }}
                                >
                                    <span className="button-next-lesson-custom "

                                    >  Bài tiếp</span>
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

            </div>
        </>


    );
}
