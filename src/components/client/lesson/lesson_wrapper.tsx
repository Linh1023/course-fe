"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { LessonAppSidebar } from "@/components/client/lesson/lesson_app_sidebar"
import LessonContent from "./lesson_content"
import { Button } from "@/components/ui/button"
import { BookCheck, ChevronLeft, ChevronRight, CirclePlay } from "lucide-react"
interface Props {
    lessonResponse:LessonClientDetailResponse
    commentResponse:CommentClientResponse
}
const LessonWrapper = (props: Props) => {
    const { lessonResponse,commentResponse } = props
    return (
        <>
            <LessonContent 
            lessonResponse = {lessonResponse}
            commmentResponse={commentResponse}
            />
        </>
    )
}

export default LessonWrapper