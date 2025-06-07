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
import { FetchServerGetApi, FetchServerPostApi } from "@/actions/server/fetch_server_api";


export default function LessonClientLayout({ children }: { children: React.ReactNode }) {

    const pathName = usePathname();
    const router = useRouter()
    const [courseInfoResponse, setCourseInfoResponse] = useState<CourseInfoResponse | null>(null);
    const [chapter, setChapter] = useState<string>("");

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

            const res = await FetchServerGetApi(`${API.LESSON.GET_COURSE_INFO}/${lessonId}`)
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

    }, [pathName, courseInfoResponse])


    useEffect(() => {
        const fetch = async () => {
            // startLoadingSpiner()
            await FetchServerPostApi(`${API.LESSON_PROGRESS.VIEWED_LESSON_PROGRESS}/${currentLessonId}`)
            // stopLoadingSpiner()
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


    // const viewportHeight = useViewportHeight();

    return (
        <>

            <div className="fixed top-68 100vh left-0 w-full z-30">

                <SidebarProvider
                    style={{
                        "--sidebar-width": "400px"
                    } as React.CSSProperties}

                >

                    <main className="flex-1 overflow-y-auto h-[calc(100dvh-132px)] ">
                        <div className="p-2">
                            <div className="mb-2">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <span className="font-semibold flex items-center gap-3 text-lg text-gray-800">
                                        <div className="bg-indigo-100 p-2 rounded-lg">
                                            <BookCheck className="text-indigo-600 w-5 h-5" />
                                        </div>
                                        {courseInfoResponse?.name}
                                    </span>
                                </div>
                            </div>
                            {children}
                        </div>
                    </main>

                    <LessonAppSidebar
                        courseInfoResponse={courseInfoResponse}
                        clickedLessons={clickedLessons}
                    />

                    <div className="fixed bottom-0 z-50 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl control-lesson-custom">
                        {/* Background gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/80 to-purple-50/50"></div>

                        <div className="relative flex items-center justify-between p-4  mx-auto">

                            {/* Left side - Chapter info */}
                            <div className="flex items-center min-w-0 flex-1 mr-6">
                                <div className="flex items-center font-semibold text-gray-800 lesson-chapter-custom">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg mr-3">
                                        <CirclePlay className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-sm md:text-base truncate">
                                        {chapter}
                                    </span>
                                </div>
                            </div>

                            {/* Right side - Controls */}
                            <div className="flex items-center gap-3">

                                {/* Navigation buttons */}
                                <div className="flex items-center gap-2">
                                    {/* Previous button */}
                                    <Button
                                        className="group relative h-11 px-4 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out flex items-center gap-2"
                                        onClick={handlePreviousLesson}
                                    >
                                        <div className="w-5 h-5 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <span className="button-next-lesson-custom text-sm font-medium text-gray-700 hidden sm:inline">
                                            Bài trước
                                        </span>
                                    </Button>

                                    {/* Next button */}
                                    <Button
                                        className="group relative h-11 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out flex items-center gap-2"
                                        onClick={handleNextLesson}
                                    >
                                        <span className="button-next-lesson-custom text-sm font-medium text-white hidden sm:inline">
                                            Bài tiếp
                                        </span>
                                        <div className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-colors">
                                            <ChevronRight className="w-4 h-4 text-white" />
                                        </div>
                                    </Button>
                                </div>

                                {/* Sidebar trigger */}
                                <SidebarTrigger className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 h-11 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out flex items-center gap-2 min-w-[120px] justify-center sidebar-trigger-custom" />
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div> */}
                    </div>
                </SidebarProvider>

            </div>
        </>


    );
}
