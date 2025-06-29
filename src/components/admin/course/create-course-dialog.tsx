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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoaderIcon } from "@/components/share/loading-icon"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import API from "@/api/api"
import { useRouter } from "next/navigation"
import { createCourseSchema, CreateCourseSchema } from "@/validation/courseSchema"
import { FetchServerPostApi, FetchServerPostApiNoJsonBody } from "@/actions/server/fetch_server_api"

interface CreateCourseDialogProps {
  listCategory: Category[]
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  fetchData: () => void
}
export function CreateCourseDialog({ listCategory, setIsLoading, fetchData }: CreateCourseDialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const [previewImage, setPreviewImage] = React.useState<string | null>(null)
  const [previewVideo, setPreviewVideo] = React.useState<string | null>(null)

  const form = useForm<CreateCourseSchema>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: "", detail: "", categoryId: "", price: "",
      image: undefined, video: undefined,
    },
  })

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

  const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file); // key phải đúng là "file"

    const res = await FetchServerPostApiNoJsonBody(API.IMAGE.UP_LOAD, formData)
    if (res && res.status === 200) {
      return res.result
    } else {
      return null
    }
  };

  const onSubmit = async (data: CreateCourseSchema) => {

    startTransition(async () => {

      let dataUpload = null
      if (data.video) {
        dataUpload = await uploadVideo(data.video[0])
        if (dataUpload === null) {
          toast.error("Tạo khóa học thất bại, vui lòng thử lại sau")
          return
        }
      }

      const dataImage = await uploadImage(data.image[0])
      if (dataImage === null) {
        toast.error("Tạo khóa học thất bại, vui lòng thử lại sau")
        return
      }

      const dataFormmatted: CreateCourseRequest = {
        name: data.name,
        detail: data.detail || "",
        categoryId: data.categoryId || "",
        price: Number(data.price), // Chuyển đổi giá sang số
        imageUrl: dataImage, // Sau nay sẽ upload lên server
        videoUrl: dataUpload, // Sau nay sẽ upload lên server
      }


      const res = await FetchServerPostApi(API.COURSE.ROOT, dataFormmatted, "/admin/course")
      if (res.status === 200) {
        fetchData()
        form.reset()
        toast.success("Tạo khóa học thành công")
        setPreviewImage(null)
        setPreviewVideo(null)
        setOpen(false)
        setIsLoading(true)
      } else {
        toast.error("Tạo khóa học thất bại, vui lòng thử lại sau")
      }
    })
  }

  React.useEffect(() => {
    if (!open) {
      form.reset()
      setPreviewImage(null)
      setPreviewVideo(null)
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
                Thêm khóa học
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Thêm khóa học mới</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tạo khóa học</DialogTitle>
          <DialogDescription>Nhập thông tin chi tiết để tạo mới khóa học.</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[75vh] pl-2 pr-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                    {previewVideo && (
                      <video key={previewVideo} controls className="mt-2 w-full max-w-full rounded shadow">
                        <source src={previewVideo} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.
                      </video>
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
