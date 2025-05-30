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


interface UpdateCategorySheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  category: Category
}

export function UpdateCategorySheet({ category, ...props }: UpdateCategorySheetProps) {
  const router = useRouter()
  const [isUpdatePending, startUpdateTransition] = React.useTransition()
  const form = useForm<UpdateCategorySchema>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category.name ?? "",
      detail: category.detail ?? "",
      status: category.status ?? "",
    },
  })

  React.useEffect(() => {
    form.reset({
      name: category.name ?? "",
      detail: category.detail ?? "",
      status: category.status ?? "",
    })
  }, [category, form])

  function onSubmit(input: UpdateCategorySchema) {
    startUpdateTransition(async () => {
      // update category in the database
      const updateCategoryResponse = await FetchServerPutApi(
        `${API.CATEGORY.ROOT}/${category.id}`,
        input,
        "/admin/category"
      )
      if (updateCategoryResponse.status == 200) {
        toast.success("Cập nhật thành công!")
        props.onOpenChange?.(false)
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
          <SheetTitle>Cập nhật danh mục</SheetTitle>
          <SheetDescription>
            Cập nhật thông tin danh mục và lưu thay đổi.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField control={form.control} name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên danh mục</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tên danh mục"
                      className="resize-none"
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
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả về danh mục"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
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
      </SheetContent>
    </Sheet>
  )
}
