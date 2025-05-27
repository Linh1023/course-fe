"use server"

import LessonWrapper from "@/components/client/lesson/lesson_wrapper"


const LessonPage = () => {
    return (
        <>
           <div className="fixed top-68 left-0 h-full w-full z-30">
           <LessonWrapper/>
           </div>
        </>
    )
}

export default LessonPage