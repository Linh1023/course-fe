"use client"

import { CourseTrailerDialog } from "@/components/client/course/course_trailer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCurrentAccountContext } from "@/context/current_account_context"
import { formatTimeWithDaysHoursMinutes } from "@/utils/format_time"
import { Book, Earth, Timer } from "lucide-react"
import { LoginDialog } from "../login/login_dialog"
import { useState } from "react"
import { RegisterButton } from "./register_button"

interface Props {
  course: CourseClientResponse | null
  courseId: string
}

const CourseSidebarSection = ({ course, courseId }: Props) => {

  const [open, setOpen] = useState(false)


  return (
    <div className="w-full md:w-1/3 relative">
      <div className="sticky top-20">
        <LoginDialog open={open} setOpen={setOpen} redirectUrl={`/course/${courseId}`} />
        <Card>
          <CardContent className="flex flex-col items-center p-4 space-y-4">
            <CourseTrailerDialog course={course} />
            <p className="font-semibold text-[#ef4444]">
              Giá: <span className="font-bold text-lg">
                {Number(course?.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </p>
            <RegisterButton setOpen={setOpen} courseId={courseId} />
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <Book className="w-5 h-5" />{" "}
                <p>Tổng số <span className="font-semibold">{course?.totalLessons}</span> bài học</p>
              </li>
              <li className="flex items-center gap-2">
                <Timer className="w-5 h-5" />{" "}
                <p>Thời lượng <span className="font-semibold">{formatTimeWithDaysHoursMinutes(course?.totalDuration || 0)}</span></p>
              </li>
              <li className="flex items-center gap-2">
                <Earth className="w-5 h-5" /> <p>Học mọi lúc, mọi nơi</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CourseSidebarSection
