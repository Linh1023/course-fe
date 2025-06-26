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
import { updateCourseSchema, UpdateCourseSchema } from "@/validation/courseSchema"
import { FetchServerPostApiNoJsonBody, FetchServerPutApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { toast } from "sonner"
import VideoPlayer from "@/components/client/video/video_player"
import TrailerPlayer from "@/components/client/video/trailer_player"


interface UpdateCategorySheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  listCategory: Category[]
  course: Course
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  fetchData: () => void
}

export function UpdateCourseSheet({ listCategory, course, fetchData, setIsLoading, ...props }: UpdateCategorySheetProps) {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null)
  const [previewVideo, setPreviewVideo] = React.useState<string | null>(null)
  const [isUpdatePending, startUpdateTransition] = React.useTransition()
  const form = useForm<UpdateCourseSchema>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      name: course.name ?? "",
      detail: course.detail ?? "",
      status: course.status ?? "active",
      categoryId: course.category?.id ?? "",
      price: Number(course.price).toLocaleString("vi-VN") ?? "",
      // image: course.imageUrl ? [new File([course.imageUrl], "image.jpg", { type: "image/jpeg" })] : undefined,
      // video: course.videoUrl ? [new File([course.videoUrl], "video.mp4", { type: "video/mp4" })] : undefined,
    },
  })

  const urlVideo = React.useRef(course.videoUrl)
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

  const onSubmit = async (input: UpdateCourseSchema) => {

    startUpdateTransition(async () => {

      if (input.video && input.video.length > 0) {
        const videourl = await uploadVideo(input.video[0])
        urlVideo.current = videourl
      }

      const dataFormatted: UpdateCourseRequest = {
        name: input.name,
        detail: input.detail ?? "",
        categoryId: input.categoryId || "",
        price: Number(input.price), // Convert formatted price to number
        imageUrl: input.image ? "update url image" : course.imageUrl,
        videoUrl: urlVideo.current,
        status: input.status as "active" | "inactive",
      }
      console.log(dataFormatted)


      const res = await FetchServerPutApi(
        `${API.COURSE.ROOT}/${course.id}`, dataFormatted)
      if (res.status === 200) {
        toast.success("Cập nhật thành công!")
        props.onOpenChange?.(false)
        fetchData()
        setIsLoading(true)
      }
      else {
        toast.error("Cập nhật thất bại, vui lòng thử lại sau.")
      }
    })
  }

  const handleImageChange = (files?: FileList) => {
    if (files && files[0]) {
      form.setValue("image", files)
      setPreviewImage(URL.createObjectURL(files[0]))
    }
  }

  const handleVideoChange = (files?: FileList) => {
    if (files && files[0]) {
      form.setValue("video", files)
      setPreviewVideo(URL.createObjectURL(files[0]))
    }
  }

  React.useEffect(() => {
    if (course.imageUrl) {
      setPreviewImage(course.imageUrl)
    }
    if (course.videoUrl) {
      setPreviewVideo(course.videoUrl)
    }
  }, [course.imageUrl, course.videoUrl])

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Cập nhật khóa học</SheetTitle>
          <SheetDescription>
            Cập nhật thông tin khóa học và lưu thay đổi.
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên khóa học</FormLabel>
                    <FormControl><Input {...field} placeholder="Tên khóa học" /></FormControl>
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
                    <FormControl><Textarea {...field} placeholder="Mô tả khóa học" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Chọn danh mục" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {listCategory.map(cat => (
                            <SelectItem key={cat.id} value={cat.id}>{`${cat.name} ${cat.status === "inactive" ? "(Không hoạt động)" : ""}`}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá</FormLabel>
                    <FormControl><Input type="text"
                      inputMode="numeric"
                      placeholder="Nhập giá khóa học"
                      value={field.value}
                      onChange={(e) => {
                        // Format VNĐ khi nhập
                        const raw = e.target.value.replace(/[^0-9]/g, "");
                        const formatted = Number(raw).toLocaleString("vi-VN");
                        field.onChange(formatted);
                      }} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh khóa học</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleImageChange(e.target.files || undefined);
                        // Manually trigger onChange for react-hook-form
                        field.onChange(e.target.files);
                      }}
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="mt-2 w-40 rounded shadow"
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video trailer</FormLabel>
                    <Input type="file" accept="video/mp4" onChange={(e) => handleVideoChange(e.target.files || undefined)} />
                    {previewVideo && previewVideo != urlVideo.current ? (
                      <video key={previewVideo} controls className="mt-2 w-full max-w-full rounded shadow">
                        <source src={previewVideo} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.
                      </video>
                    ) : (
                      <>
                        <TrailerPlayer
                          fileName={urlVideo.current}
                        />
                      </>
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
