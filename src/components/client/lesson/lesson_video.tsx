"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { BookCheck } from "lucide-react"

const LessonVideo = () => {
    return (
        <>
            <span className="font-bold flex items-center gap-2 text-[20px]" > <BookCheck /> Lập trình C++ cơ bản</span>
           <DropdownMenuSeparator className="mt-[10px] mb-[10px] bg-gray-200 h-[1px]" />
            <div className="w-full h-[500px] border-[1px] border-gray-300 mt-[20px] mb-[10px]" >
                Video
            </div>
            
            <span className="font-bold text-[20px] ">2. Cú pháp điều kiện cơ bản C++</span>

             <DropdownMenuSeparator className="mt-[10px] mb-[10px] bg-gray-200 h-[1px]" />
        </>
    )
}

export default LessonVideo