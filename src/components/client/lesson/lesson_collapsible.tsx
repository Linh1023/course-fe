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
  clickedLessons:string[]
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
            <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup className="pt-0 pb-0" >
                    <CollapsibleTrigger className="flex text-left bg-[#F1F5F9]  border-b-[1px] border-gray-200 p-1">
                        <span className="mr-[10px] font-bold"> {chapterSidebarResponse.name} </span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col p-2 gap-4  pb-0">
                        {chapterSidebarResponse?.lessons.map((lesson, index) => (

                            <div key={index}>
                                <LessonCollapsibleItem
                                    lessonSidebarResponse={lesson}
                                    clickedLessons={clickedLessons}
                                />
                            </div>
                        ))}
                    </CollapsibleContent>
                </SidebarGroup>
            </Collapsible>
        </>
    )
}

export default LessonCollapsible