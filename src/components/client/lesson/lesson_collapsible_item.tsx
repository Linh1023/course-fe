"use client"
import { ChevronDown, Video } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { usePathname, useRouter } from "next/navigation"
import { useLoadingContext } from "@/context/loading_context"
interface Props {
    lessonSidebarResponse: LessonSidebarResponse

    clickedLessons:string[]
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
        if (lessonId === lessonSidebarResponse.id){
            stopLoadingSpiner()
        }
        router.push(`/lesson/${lessonSidebarResponse.id}`)
    }
    return (
        <>
            <div className={`flex  items-center justify-between hover:bg-[#f1f5f9] p-1 rounded-[5px] cursor-pointer
             ${lessonId === lessonSidebarResponse.id && ` bg-[#fe4444] text-white hover:bg-[#f87171]`}
            `}
                onClick={() => { handleLesson() }}
            >
                <div className="flex items-center mr-[15px] text-[14px]">
                    <Checkbox className={`mr-[15px]  w-[20px] h-[20px] data-[state=checked]:!bg-[#3B82F6]
                      ${lessonId === lessonSidebarResponse.id && `  border-white bg-white`}
                    `}
                        checked={lessonSidebarResponse.viewed || clickedLessons.includes(lessonSidebarResponse.id)}
                    />
                    {lessonSidebarResponse.name}
                </div>
                <span className="font-bold text-gray-500 text-[15px] flex items-center" >
                    <Video className="mr-[5px]" />   {lessonSidebarResponse.duration}
                </span>
            </div>
        </>
    )
}

export default LessonCollapsibleItem