"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SidebarSkeleton = () => {
  return (
    <div className="w-full md:w-1/3 relative">
      <div className="sticky top-20">
        <Card>
          <CardContent className="flex flex-col items-center p-4 space-y-4">
            {/* Video Skeleton */}
            <Skeleton className="w-full h-48 rounded-lg" />

            {/* Giá */}
            <Skeleton className="w-1/2 h-6" />

            {/* Nút đăng ký */}
            <Skeleton className="w-full h-10 rounded-md" />

            {/* Thông tin khóa học */}
            <div className="w-full space-y-2 pt-4">
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-2/3 h-4" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SidebarSkeleton
