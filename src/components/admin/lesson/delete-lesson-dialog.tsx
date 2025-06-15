"use client"

import * as React from "react"
import { type Row } from "@tanstack/react-table"
// import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TrashIcon } from "lucide-react"
import { LoaderIcon } from "@/components/share/loading-icon"
import API from "@/api/api"
import { FetchServerDeleteApi } from "@/actions/server/fetch_server_api"
import { toast } from "sonner"


interface DeleteLessonsDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  lessons: Row<Lesson>["original"][]
  showTrigger?: boolean
  onSuccess?: () => void
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteLessonsDialog({
  lessons,
  showTrigger = true,
  onSuccess,
  setIsLoading,
  ...props
}: DeleteLessonsDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition()
  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({lessons.length})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có muốn xóa?</DialogTitle>
          <DialogDescription>
            <>
              Hành động này sẽ không được hoàn tác. Điều này sẽ xóa{" "}
              <span className="font-medium">{lessons.length}</span> bài học của bạn.
            </>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={() => {
              startDeleteTransition(async () => {
                const res = await Promise.all(
                  lessons.map((lesson) =>
                    FetchServerDeleteApi(`${API.LESSON.ROOT}/${lesson.id}`)
                  ))
                if (res.some((r) => r.status !== 200)) {
                  toast.error("Xóa bài học thất bại, vui lòng thử lại sau")
                } else {
                  onSuccess?.()
                  setIsLoading(true)
                }
                props.onOpenChange?.(false)
              })
            }}
            disabled={isDeletePending}
          >
            {isDeletePending && (
              <LoaderIcon
                className="mr-1.5 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
