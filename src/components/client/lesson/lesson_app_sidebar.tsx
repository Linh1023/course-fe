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
    clickedLessons:string[]
}

export function LessonAppSidebar(props: Props) {
    const { courseInfoResponse, clickedLessons } = props

    return (
        <>
            <Sidebar side="right" className="top-[68px] h-[calc(100vh-130px)] border-b-[1px] border-b-gray-200
            border-t-[1px] border-t-gray-200 
            "

            >
                <SidebarContent  >
                    <SidebarGroup   >
                        <span className="font-bold text-[18px] mb-[15px]">Danh sách bài học</span>

                        <SidebarMenu >
                            {courseInfoResponse?.chapters.map((chapter, index) => (
                                
                                    <div key={index}>
                                        <LessonCollapsible
                                        chapterSidebarResponse={chapter}
                                          clickedLessons={clickedLessons}
                                        
                                        />
                                    </div>

                                
                            ))}



                        </SidebarMenu>

                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

        </>
    )
}