"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { updateCategorySchema, UpdateCategorySchema } from "@/validation/categorySchema"
import { LoaderIcon } from "@/components/share/loading-icon"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import API from "@/api/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { FetchServerPutApi } from "@/actions/server/fetch_server_api"
import { updateSubmissionSchema, UpdateSubmissionSchema } from "@/validation/submission_schema"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"


interface Props
  extends React.ComponentPropsWithRef<typeof Sheet> {

  submission: SubmissionAdminResponse;
  showUpdateSubmissionSheet: boolean;
  setShowUpdateSubmissionSheet: (v: boolean) => void;

}

export function UpdateSubmissionSheet(props: Props) {
  const router = useRouter()


  const [isUpdatePending, startUpdateTransition] = React.useState(false)
  const { submission, showUpdateSubmissionSheet, setShowUpdateSubmissionSheet } = props;

  const form = useForm<UpdateSubmissionSchema>({
    resolver: zodResolver(updateSubmissionSchema),
    defaultValues: {
      submitterNameEmail: `${submission.submitterName} ${submission.submitterUsername ? `(${submission.submitterUsername})` : ""}`,
      courseLessonName: `${submission.courseName} (${submission.lessonName})`,
      score: submission.score == null ? "0" : submission.score.toString(),
      comment: submission.comment ?? "",
      submissionUrl: submission.submissionUrl ?? ""
    },
  })

  React.useEffect(() => {
    form.reset({
      submitterNameEmail: `${submission.submitterName} ${submission.submitterUsername ? `(${submission.submitterUsername})` : ""}`,
      courseLessonName: `${submission.courseName} (${submission.lessonName})`,
      score: submission.score == null ? "0" : submission.score.toString(),
      comment: submission.comment ?? "",
      submissionUrl: submission.submissionUrl ?? ""
    })
  }, [submission, form])

  function onSubmit(input: UpdateSubmissionSchema) {

    const fetchSaveSubmission = async () => {
      startUpdateTransition(true)
      const req: GradedSubmissionRequest = {
        score: input.score,
        comment: input.comment ?? "",
      }
      const res = await FetchServerPutApi( `${API.SUBMISSON.SUBMISSION}/${submission.id}`  , req, "/admin/submission")
      if (res && res.status === 200) {
        toast.success("Thao tác thành công")
        setShowUpdateSubmissionSheet(false)
      } else {
        toast.error("Lỗi")
      }
       startUpdateTransition(false)
    }

    fetchSaveSubmission()
  }

  return (
    <Sheet open={showUpdateSubmissionSheet} onOpenChange={setShowUpdateSubmissionSheet} >
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Quản lý chấm bài</SheetTitle>
          <div className="flex items-center">
            <SheetDescription>
              Trạng thái
            </SheetDescription>
            <Badge
              className="ml-[20px]"
              variant={
                submission.status === "graded"
                  ? "secondary"
                  : "destructive"
              }
            >
              {submission.status === "submitted" ? "Chưa chấm" : "Đã chấm"}
            </Badge>

          </div>


        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField control={form.control}
              name="submitterNameEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông tin học viên</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Thông tin học viên"
                      className="resize-none"
                      readOnly
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            >
            </FormField>

            <FormField
              control={form.control}
              name="courseLessonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông tin khóa học (Bài học)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả bài học"
                      className="resize-none"
                      readOnly
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="submissionUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File bài làm</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="File bài làm"
                      className="resize-none"
                      type="text"
                      readOnly
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điểm</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Điểm"
                      className="resize-none"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhận xét</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhận xét"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />




            <SheetFooter className="gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Hủy
                </Button>
              </SheetClose>
              <Button disabled={isUpdatePending}>
                {isUpdatePending && (
                  <LoaderIcon
                    className="mr-1.5 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                {submission.status === "submitted" ? "Chấm bài" : "Lưu"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
