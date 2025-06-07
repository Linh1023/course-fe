"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    SidebarGroup,
} from "@/components/ui/sidebar"

import { ChevronDown, Video } from "lucide-react"
import LessonCollapsibleItem from "./lesson_collapsible_item"
import { useState } from "react"
interface Props {
    chapterSidebarResponse: ChapterSidebarResponse
    clickedLessons: string[]
}

const LessonCollapsible = (props: Props) => {
    const { chapterSidebarResponse, clickedLessons } = props
    // const [clickedLessons, setClickedLessons] = useState<string[]>([]);

    // const handleLessonClick = (lessonId: string) => {
    //     setClickedLessons(prev =>
    //         prev.includes(lessonId) ? prev : [...prev, lessonId]
    //     );
    // };

    return (
        <>
            <Collapsible defaultOpen className="group/collapsible mb-4">
                <SidebarGroup className="p-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                    <CollapsibleTrigger className="
            flex items-center w-full text-left px-4 py-3 
            bg-gradient-to-r from-slate-50 to-blue-50 
            hover:from-slate-100 hover:to-blue-100
            border-b border-gray-200 
            transition-all duration-200 ease-in-out
            group/trigger
        ">
                        {/* Chapter icon */}
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover/trigger:bg-blue-200 transition-colors">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-sm leading-tight truncate group-hover/trigger:text-gray-900 transition-colors">
                                {chapterSidebarResponse.name}
                            </h3>

                            {/* Chapter stats */}
                            <div className="flex items-center mt-1 text-xs text-gray-500 space-x-3">
                                <span className="flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    {chapterSidebarResponse?.lessons?.length || 0} bài học
                                </span>

                                {/* Progress indicator */}
                                {chapterSidebarResponse?.lessons && (
                                    <span className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                        {chapterSidebarResponse.lessons.filter(lesson =>
                                            lesson.viewed || clickedLessons.includes(lesson.id)
                                        ).length} / {chapterSidebarResponse.lessons.length}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Expand/Collapse indicator */}
                        <div className="ml-3 p-1 rounded-md group-hover/trigger:bg-white/60 transition-colors">
                            <ChevronDown className="
                    w-4 h-4 text-gray-500 
                    transition-all duration-300 ease-in-out
                    group-data-[state=open]/collapsible:rotate-180
                    group-hover/trigger:text-gray-700
                " />
                        </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <div className="p-3 bg-gray-50/50 space-y-2">
                            {chapterSidebarResponse?.lessons?.map((lesson, index) => (
                                <div
                                    key={lesson.id || index}
                                    className="
                            transform transition-all duration-200 ease-in-out
                            hover:translate-x-1 hover:scale-[1.02]
                        "
                                    style={{
                                        animationDelay: `${index * 50}ms`
                                    }}
                                >
                                    <LessonCollapsibleItem
                                        lessonSidebarResponse={lesson}
                                        clickedLessons={clickedLessons}
                                    />
                                </div>
                            ))}

                            {/* Empty state */}
                            {(!chapterSidebarResponse?.lessons || chapterSidebarResponse.lessons.length === 0) && (
                                <div className="text-center py-8 text-gray-500">
                                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-sm">Chưa có bài học nào</p>
                                </div>
                            )}
                        </div>
                    </CollapsibleContent>
                </SidebarGroup>
            </Collapsible>
        </>
    )
}

export default LessonCollapsible