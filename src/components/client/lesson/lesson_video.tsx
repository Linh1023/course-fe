"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { BookCheck } from "lucide-react"
interface Props {
    lessonResponse:LessonClientDetailResponse
}

const LessonVideo = (props: Props) => {
    const { lessonResponse } = props
    return (
        <>
          
           <DropdownMenuSeparator className="mt-[10px] mb-[10px] bg-gray-200 h-[1px]" />
            <div className="w-full h-[500px] border-[1px] border-gray-300 mt-[20px] mb-[10px]" >
                {lessonResponse.videoUrl}
            </div>
            
            <span className="font-bold text-[20px] ">{lessonResponse.name}</span>

             <DropdownMenuSeparator className="mt-[10px] mb-[10px] bg-gray-200 h-[1px]" />
        </>
    )
}

export default LessonVideo