"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    SidebarGroup,
} from "@/components/ui/sidebar"

import { ChevronDown, Video } from "lucide-react"
import LessonCollapsibleItem from "./lesson_collapsible_item"
const LessonCollapsible = () => {
    return (
        <>
            <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup className="pt-0 pb-0" >

                    <CollapsibleTrigger className="flex text-left bg-[#F1F5F9]  border-b-[1px] border-gray-200 p-1">
                        <span className="mr-[10px] font-bold"> Chương 1. Cú pháp trong lập trình mới nhất hiện nay </span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>

                    <CollapsibleContent className="flex flex-col p-2 gap-4  pb-0">
                        <LessonCollapsibleItem/>
                    </CollapsibleContent>

                </SidebarGroup>
            </Collapsible>

        </>
    )
}

export default LessonCollapsible