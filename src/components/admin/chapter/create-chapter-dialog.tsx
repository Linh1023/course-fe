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
import { createChapterSchema, CreateChapterSchema } from "@/validation/chapterSchema"
import { FetchServerPostApi } from "@/actions/server/fetch_server_api"
import { useRouter } from "next/navigation"

interface CreateChapterDialogProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  courseId: string
}
export function CreateChapterDialog({ courseId, setIsLoading }: CreateChapterDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()
  const form = useForm<CreateChapterSchema>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      chapterNumber: "",
      name: "",
      detail: "",
    },
  })



  const onSubmit = (data: CreateChapterSchema) => {
    const createData: CreateChapterRequest = {
      chapterNumber: Number(data.chapterNumber),
      name: data.name,
      detail: data.detail || "",
      courseId: courseId
    }
    startTransition(async () => {
      const res = await FetchServerPostApi(API.CHAPTER.ROOT, createData, "/admin/course")
      if (res.status === 200) {
        router.replace("?page=1")
        form.reset()
        toast.success("Tạo chương thành công")
        setOpen(false)
        setIsLoading(true)
      } else {
        toast.error("Tạo chương thất bại, vui lòng thử lại sau")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PlusIcon className="mr-2 size-4" />
                Thêm chương
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Thêm chương mới</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tạo chương</DialogTitle>
          <DialogDescription>Nhập thông tin chi tiết để tạo mới chương.</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[75vh] pl-2 pr-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="chapterNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chương số</FormLabel>
                    <FormControl><Input type="text" inputMode="numeric" placeholder="Chương số" value={field.value}
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
                    <FormLabel>Tên chương</FormLabel>
                    <FormControl><Input {...field} placeholder="Tên chương" /></FormControl>
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
                    <FormControl><Textarea {...field} placeholder="Mô tả chương" /></FormControl>
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
