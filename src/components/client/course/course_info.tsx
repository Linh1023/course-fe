"use client"

import { CourseChapters } from "@/components/client/course/course_chapter"

interface Props {
  course: CourseClientResponse | null
}

const CourseInfoSection = ({ course }: Props) => {
  return (
    <div className="w-full md:w-2/3 space-y-6">
      <h1 className="text-3xl font-bold">{course?.name}</h1>
      <p className="text-sm text-muted-foreground">{course?.detail}</p>
      <CourseChapters chapters={course?.chapters || []} />
    </div>
  )
}

export default CourseInfoSection
