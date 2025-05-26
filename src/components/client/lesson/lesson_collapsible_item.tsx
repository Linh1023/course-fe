"use client"
import { ChevronDown, Video } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
const LessonCollapsibleItem = () => {
    return (
        <>
            <div className="flex  items-center justify-between hover:bg-[#f1f5f9] p-1 rounded-[5px] cursor-pointer">

                <div className="flex items-center mr-[15px] text-[14px]">
                    <Checkbox className="mr-[15px]  w-[20px] h-[20px] data-[state=checked]:!bg-[#3B82F6]" />
                    1. Cú pháp cơ bản C++
                </div>

                <span className="font-bold text-gray-500 text-[15px] flex items-center" >
                    <Video className="mr-[5px]" />   3:05
                </span>

            </div>

            <div className="flex  items-center justify-between   p-1 rounded-[5px] cursor-pointer  
                                        bg-[#fe4444] text-white
                                        ">
                <div className="flex items-center mr-[15px] text-[14px] ">
                    <Checkbox className="mr-[15px]  w-[20px] h-[20px] data-[state=checked]:!bg-[#3B82F6]
                                                 border-white bg-white
                                                " />
                    2. Cú pháp điều kiện cơ bản C++
                </div>

                <span className="font-bold  text-[15px] flex items-center text-white" >
                    <Video className="mr-[5px]" />   3:05
                </span>

            </div>


        </>
    )
}

export default LessonCollapsibleItem