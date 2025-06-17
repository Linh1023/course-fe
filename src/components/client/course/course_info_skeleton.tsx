"use client"

import { Skeleton } from "@/components/ui/skeleton"

const CourseInfoSkeleton = () => {
  return (
    <div className="w-full md:w-2/3 space-y-6">
      {/* Tiêu đề */}
      <Skeleton className="h-8 w-1/2" />

      {/* Mô tả */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Chapter Skeleton giả */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseInfoSkeleton
