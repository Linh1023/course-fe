"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import {
  Form, FormControl, FormField, FormItem,
  FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { LoaderIcon } from "@/components/share/loading-icon"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import API from "@/api/api"
import { FetchServerPostApi } from "@/actions/server/fetch_server_api"
import { useRouter } from "next/navigation"
import { createLessonSchema, CreateLessonSchema } from "@/validation/lessonSchema"
import { UploadedFilePreview } from "@/components/share/upload-file-preview"
import { number } from "zod"
import { set } from "date-fns"

interface CreateLessonDialogProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  chapterId: number
}
export function CreateLessonDialog({ chapterId, setIsLoading }: CreateLessonDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const [previewVideo, setPreviewVideo] = React.useState<string | null>(null)
  const [previewDocument, setPreviewDocument] = React.useState<{ url: string; name: string } | null>(null)
  const [previewAssignment, setPreviewAssignment] = React.useState<{ url: string; name: string } | null>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const form = useForm<CreateLessonSchema>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
    },
  })



  const onSubmit = (data: CreateLessonSchema) => {
    const createData: CreateLessonRequest = {
      lessonNumber: Number(data.lessonNumber),
      name: data.name,
      detail: data.detail || "",
      videoUrl: data.video ? "http://url" : "", // sau này sẽ upload video lên server
      documentUrl: data.document ? "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf" : "",
      assignmentUrl: data.assignment ? "https://example.com/assignment1.docx" : "",
      duration: Math.round(videoRef?.current?.duration || 0),  // Lấy thời lượng video nếu có;
      chapterId: chapterId,
    }

    console.log(createData)
    startTransition(async () => {
      const res = await FetchServerPostApi(API.LESSON.ROOT, createData, "/admin/course")
      if (res.status === 200) {
        router.replace("?page=1")
        form.reset()
        toast.success("Tạo bài học thành công")
        setPreviewVideo(null)
        setPreviewDocument(null)
        setPreviewAssignment(null)
        setOpen(false)
        setIsLoading(true)
      } else {
        toast.error("Tạo bài học thất bại, vui lòng thử lại sau")
      }
    })
  }

  const handleVideoChange = (files?: FileList) => {
    if (files && files[0]) {
      form.setValue("video", files)
      setPreviewVideo(URL.createObjectURL(files[0]))
      // Gán src vào videoRef
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(files[0]);
      }
    }
  }

  const handleFileChange = (
    files: FileList | undefined,
    type: "document" | "assignment"
  ) => {
    if (files && files[0]) {
      form.setValue(type, files)

      const url = URL.createObjectURL(files[0])
      if (type === "document") {
        setPreviewDocument({
          url: url,
          name: files[0].name,
        })
      } else {
        setPreviewAssignment({
          url: url,
          name: files[0].name,
        })
      }
    }
  }

  React.useEffect(() => {
    if (!open) {
      form.reset()
      setPreviewVideo(null)
      setPreviewDocument(null)
      setPreviewAssignment(null)
    }
  }, [open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PlusIcon className="mr-2 size-4" />
                Thêm bài học
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Thêm bài học mới</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tạo bài học</DialogTitle>
          <DialogDescription>Nhập thông tin chi tiết để tạo mới bài học.</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[75vh] pl-2 pr-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="lessonNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bài học số</FormLabel>
                    <FormControl><Input type="text" inputMode="numeric" placeholder="Bài học số" value={field.value}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, "");
                        return field.onChange(raw);
                      }} /></FormControl >
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên bài học</FormLabel>
                    <FormControl><Input {...field} placeholder="Tên bài học" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl><Textarea {...field} placeholder="Mô tả bài học" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video bài học</FormLabel>
                    <Input type="file" accept="video/mp4" onChange={(e) => handleVideoChange(e.target.files || undefined)} />
                    {previewVideo && (
                      <video ref={videoRef} key={previewVideo} controls className="mt-2 w-full max-w-full rounded shadow">
                        <source src={previewVideo} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.
                      </video>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tài liệu đính kèm</FormLabel>
                    <Input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={(e) => handleFileChange(e.target.files || undefined, "document")}
                    />
                    {previewDocument && (
                      <UploadedFilePreview fileUrl={previewDocument.url} fileName={previewDocument.name} />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bài tập</FormLabel>
                    <Input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={(e) => handleFileChange(e.target.files || undefined, "assignment")}
                    />
                    {previewAssignment && (
                      <UploadedFilePreview fileUrl={previewAssignment.url} fileName={previewAssignment.name} />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">Hủy</Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                  {isPending && <LoaderIcon className="mr-2 size-4 animate-spin" />}
                  Tạo mới
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
