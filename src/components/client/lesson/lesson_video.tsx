"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { BookCheck, Play } from "lucide-react"
interface Props {
    lessonResponse: LessonClientDetailResponse
}

const LessonVideo = (props: Props) => {
    const { lessonResponse } = props
    return (
        <>

            <DropdownMenuSeparator className="mt-[10px] mb-[10px] bg-gray-200 h-[1px]" />
            <div className="w-full h-[500px] border-[1px] border-gray-300 mt-[20px] mb-[10px]" >
                {lessonResponse.videoUrl}
            </div>

            <div className="mb-[20px]">
                <div className="relative">
                    {/* Title background decoration */}
                    <div className="absolute -left-2 -top-2 -right-2 -bottom-2 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl opacity-50"></div>

                    {/* Main title */}
                    <div className="relative bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-start gap-3">
                            {/* Title icon */}
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mt-1">
                                <Play className="w-5 h-5 text-white" fill="currentColor" />
                            </div>

                            {/* Title content */}
                            <div className="flex-1 min-w-0">
                                <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2">
                                    {lessonResponse.name}
                                </h2>

                                {/* Lesson metadata */}
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        Video bài học
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default LessonVideo