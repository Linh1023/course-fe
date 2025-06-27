"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PlayCircleIcon } from "lucide-react"

import { useEffect, useState } from "react"
import TrailerPlayer from "../video/trailer_player"

interface CourseTrailerDialogProps {
  course: CourseClientResponse | null
}
export function CourseTrailerDialog({ course }: CourseTrailerDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <div className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      course ? `url("${course.imageUrl}")` : "https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

                {/* Play icon */}
                <PlayCircleIcon
                  className="absolute top-1/2 left-1/2 w-20 h-20 text-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
                />
                <p className="absolute left-0 right-0 bottom-4 text-white text-center font-bold">Xem giới thiệu khóa học</p>
              </div>
            </DialogTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Giới thiệu khóa học</DialogTitle>
          <DialogDescription>
            {course?.name}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 w-full max-h-[70vh] rounded shadow">
          <TrailerPlayer
            fileName={course?.videoUrl ?? ""}
          />
        </div>
      </DialogContent>
    </Dialog >
  )
}
