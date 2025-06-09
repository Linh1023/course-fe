"use client"
import { ChevronDown, Video } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { usePathname, useRouter } from "next/navigation"
import { useLoadingContext } from "@/context/loading_context"
import { formatTime } from "@/utils/format_time"
interface Props {
    lessonSidebarResponse: LessonSidebarResponse

    clickedLessons: string[]
}

const LessonCollapsibleItem = (props: Props) => {
    const { lessonSidebarResponse, clickedLessons } = props

    const router = useRouter()
    const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext()
    const pathName = usePathname()
    const parts = pathName.split('/');
    const lessonId = parts[2];
    const handleLesson = () => {
        startLoadingSpiner()
        if (lessonId === lessonSidebarResponse.id) {
            stopLoadingSpiner()
        }
        router.push(`/lesson/${lessonSidebarResponse.id}`)
    }
    return (
        <>
            <div className={`
    group relative flex items-center justify-between 
    p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
    border border-transparent hover:border-gray-200 hover:shadow-sm
    ${lessonId === lessonSidebarResponse.id
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700'
                    : 'hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50'
                }
`}
                onClick={() => { handleLesson() }}
            >
                {/* Left side - Checkbox and lesson name */}
                <div className="flex items-center flex-1 min-w-0">
                    <div className="relative mr-4">
                        <Checkbox
                            className={`
                    w-5 h-5 transition-all duration-200 rounded-md
                    data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500
                    ${lessonId === lessonSidebarResponse.id
                                    ? 'border-white bg-white/20 data-[state=checked]:bg-white data-[state=checked]:border-white'
                                    : 'border-gray-300 hover:border-blue-400'
                                }
                `}
                            checked={lessonSidebarResponse.viewed || clickedLessons.includes(lessonSidebarResponse.id)}
                        />
                        {/* Progress indicator */}
                        {(lessonSidebarResponse.viewed || clickedLessons.includes(lessonSidebarResponse.id)) && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className={`
                text-sm font-medium truncate leading-relaxed
                ${lessonId === lessonSidebarResponse.id
                                ? 'text-white'
                                : 'text-gray-800 group-hover:text-gray-900'
                            }
            `}>
                            {lessonSidebarResponse.name}
                        </p>

                        {/* Lesson status indicator */}
                        <div className="flex items-center mt-1 space-x-2">
                            {(lessonSidebarResponse.viewed || clickedLessons.includes(lessonSidebarResponse.id)) && (
                                <span className={`
                        text-xs px-2 py-0.5 rounded-full font-medium
                        ${lessonId === lessonSidebarResponse.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-green-100 text-green-700'
                                    }
                    `}>
                                    Đã xem
                                </span>
                            )}

                            {lessonId === lessonSidebarResponse.id && (
                                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                                    Đang học
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side - Duration */}
                <div className={`
        flex items-center ml-4 text-sm font-medium
        ${lessonId === lessonSidebarResponse.id
                        ? 'text-white/90'
                        : 'text-gray-500 group-hover:text-gray-700'
                    }
    `}>
                    <div className={`
            p-1.5 rounded-md mr-2 transition-colors duration-200
            ${lessonId === lessonSidebarResponse.id
                            ? 'bg-white/20'
                            : 'bg-gray-100 group-hover:bg-blue-100'
                        }
        `}>
                        <Video className={`
                w-4 h-4 transition-colors duration-200
                ${lessonId === lessonSidebarResponse.id
                                ? 'text-white'
                                : 'text-gray-600 group-hover:text-blue-600'
                            }
            `} />
                    </div>
                    <span className="tabular-nums">
                        {formatTime(lessonSidebarResponse.duration)}
                    </span>
                </div>

                {/* Active lesson indicator */}
                {lessonId === lessonSidebarResponse.id && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                )}

                {/* Subtle glow effect for active lesson */}
                {lessonId === lessonSidebarResponse.id && (
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/20 to-red-600/20 blur-sm -z-10"></div>
                )}
            </div>
        </>
    )
}

export default LessonCollapsibleItem