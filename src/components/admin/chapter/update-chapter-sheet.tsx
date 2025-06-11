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
import { updateChapterSchema, UpdateChapterSchema } from "@/validation/chapterSchema"
import { FetchServerPutApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { toast } from "sonner"


interface UpdateChapterSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  chapter: Chapter
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function UpdateChapterSheet({ chapter, setIsLoading, ...props }: UpdateChapterSheetProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition()
  const form = useForm<UpdateChapterSchema>({
    resolver: zodResolver(updateChapterSchema),
    defaultValues: {
      chapterNumber: chapter.chapterNumber.toString() || "",
      name: chapter.name || "",
      detail: chapter.detail || "",
      status: chapter.status || "active",
    },
  })

  function onSubmit(input: UpdateChapterSchema) {
    const updateData: UpdateChapterRequest = {
      chapterNumber: Number(input.chapterNumber),
      name: input.name,
      detail: input.detail || "",
      status: input.status,
    }
    startUpdateTransition(async () => {
      const updateCategoryResponse = await FetchServerPutApi(
        `${API.CHAPTER.ROOT}/${chapter.id}`,
        updateData,
        "/admin/course"
      )
      if (updateCategoryResponse.status == 200) {
        toast.success("Cập nhật thành công!")
        props.onOpenChange?.(false)
        setIsLoading?.(true)
      }
      else {
        toast.error("Cập nhật thất bại, vui lòng thử lại!")
      }
    })
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Cập nhật chương</SheetTitle>
          <SheetDescription>
            Cập nhật thông tin chương và lưu thay đổi.
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto max-h-[75vh] pl-2 pr-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >  <FormField
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
