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

export function AppSidebarLesson() {

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

                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarGroup className="pt-0 pb-0" >
                                    
                                    <CollapsibleTrigger className="flex text-left bg-[#F1F5F9]  border-b-[1px] border-gray-200 p-1">
                                        <span className="mr-[10px] font-bold"> Chương 2. Cú pháp trong lập trình mới nè hi hi hi </span>
                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                    
                                    <CollapsibleContent className="flex flex-col p-2 gap-4  pb-0">
                                        <div className="flex  items-center justify-between hover:bg-[#f1f5f9] p-1 rounded-[5px] cursor-pointer">

                                            <div className="flex items-center mr-[15px]">
                                                <Checkbox className="mr-[15px]  w-[25px] h-[25px] data-[state=checked]:!bg-[#3B82F6]" />
                                                Bài 1. Cú pháp cơ bản C++
                                            </div>

                                            <span className="font-bold text-gray-500 text-[15px] flex items-center" >
                                                <Video className="mr-[5px]" />   3:05
                                            </span>

                                        </div>

                                        <div className="flex  items-center justify-between   p-1 rounded-[5px] cursor-pointer  
                                        bg-[#fe4444] text-white
                                        ">

                                            <div className="flex items-center mr-[15px] ">
                                                <Checkbox className="mr-[15px]  w-[25px] h-[25px] data-[state=checked]:!bg-[#3B82F6]
                                                 border-white
                                                " />
                                                Bài 1. Cú pháp cơ bản C++
                                            </div>

                                            <span className="font-bold  text-[15px] flex items-center text-white" >
                                                <Video className="mr-[5px]" />   3:05
                                            </span>

                                        </div>

                                    </CollapsibleContent>
                               
                                </SidebarGroup>
                            </Collapsible>


                        </SidebarMenu>

                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

        </>
    )
}