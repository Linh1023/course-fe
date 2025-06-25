"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { LoaderIcon } from "@/components/share/loading-icon"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FetchServerPostApiNoJsonBody, FetchServerPutApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { toast } from "sonner"
import { updateLessonSchema, UpdateLessonSchema } from "@/validation/lessonSchema"
import { UploadedFilePreview } from "@/components/share/upload-file-preview"
import { getFileNameFromUrl } from "@/utils/url"
import VideoPlayer from "@/components/client/video/video_player"

interface UpdateLessonSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  lesson: Lesson
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  fetchData: () => void
}

export function UpdateLessonSheet({ lesson, fetchData, setIsLoading, ...props }: UpdateLessonSheetProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition()
  const [previewVideo, setPreviewVideo] = React.useState<string | null>(null)
  const [previewDocument, setPreviewDocument] = React.useState<{ url: string; name: string } | null>(null)
  const [previewAssignment, setPreviewAssignment] = React.useState<{ url: string; name: string } | null>(null)
  let urlVideo = React.useRef(lesson.videoUrl)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const form = useForm<UpdateLessonSchema>({
    resolver: zodResolver(updateLessonSchema),
    defaultValues: {
      name: lesson.name,
      detail: lesson.detail || "",
      lessonNumber: lesson.lessonNumber.toString(),
      status: lesson.status || "active",
    },
  })

  const uploadVideo = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file); // key phải đúng là "file"

    const res = await FetchServerPostApiNoJsonBody(API.VIDEO.UP_LOAD, formData)
    if (res && res.status === 200) {
      return res.result
    } else {
      return null
    }
  };

  const onSubmit = async (input: UpdateLessonSchema) => {



    if (input.video && input.video.length > 0) {
      const videourl = await uploadVideo(input.video[0])
      urlVideo.current = videourl
    }

    const updateData: UpdateLessonRequest = {
      lessonNumber: Number(input.lessonNumber),
      name: input.name,
      detail: input.detail || "",
      videoUrl: urlVideo.current, // sau này sẽ upload video lên server
      documentUrl: input.document ? "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf" : lesson.documentUrl,
      assignmentUrl: input.assignment ? "https://example.com/assignment1.docx" : lesson.assigmentUrl,
      duration: Math.floor(videoRef?.current?.duration || lesson.duration),  // Lấy thời lượng video nếu có;
      status: input.status
    }
    console.log(JSON.parse(JSON.stringify(updateData)))
    console.log(`${API.LESSON.ROOT}/${lesson.id}`)
    startUpdateTransition(async () => {
      const res = await FetchServerPutApi(
        `${API.LESSON.ROOT}/${lesson.id}`, updateData)
      if (res.status === 200) {
        fetchData()
        toast.success("Cập nhật thành công!")
        props.onOpenChange?.(false)
        setIsLoading(true)
      }
      else {
        toast.error("Cập nhật thất bại, vui lòng thử lại sau.")
      }
    })
  }

  const handleVideoChange = (files?: FileList) => {
    if (files && files[0]) {
      form.setValue("video", files)
      setPreviewVideo(URL.createObjectURL(files[0]))
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
    if (!props.open) {
      form.reset()
      setPreviewVideo(null)
      setPreviewDocument(null)
      setPreviewAssignment(null)
    } else {
      setPreviewVideo(lesson.videoUrl)
      const documentFile = getFileNameFromUrl(lesson.documentUrl) || "";
      const assignmentFile = getFileNameFromUrl(lesson.assigmentUrl) || "";
      if (lesson.documentUrl) setPreviewDocument({ url: lesson.documentUrl, name: documentFile })
      if (lesson.assigmentUrl) setPreviewAssignment({ url: lesson.assigmentUrl, name: assignmentFile })
    }
  }, [props.open])

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Cập nhật bài học</SheetTitle>
          <SheetDescription>
            Cập nhật thông tin bài học và lưu thay đổi.
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto max-h-[75vh] pl-2 pr-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
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

                    {previewVideo && previewVideo != urlVideo.current ? (
                      <video ref={videoRef} key={previewVideo} controls className="mt-2 w-full max-w-full rounded shadow">
                        <source src={previewVideo} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.

                      </video>
                    ) : (<>

                      <VideoPlayer
                        fileName={urlVideo.current}
                      />

                    </>)}
                    
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
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={field.value && "capitalize"}>
                          <SelectValue placeholder="Select a label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            value="active"
                            className="capitalize"
                          >
                            Hoạt động
                          </SelectItem>
                          <SelectItem
                            value="inactive"
                            className="capitalize"
                          >
                            Ngưng hoạt động
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                  Lưu
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
