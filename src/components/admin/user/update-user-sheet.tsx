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
import { updateUserSchema, UpdateUserSchema } from "@/validation/userSchema"
import { LoaderIcon } from "@/components/share/loading-icon"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import API from "@/api/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { FetchServerPutApi } from "@/actions/server/fetch_server_api"
import { User } from "@/types/response/account/user"

interface UpdateUserSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  user: User
}

export function UpdateUserSheet({ user, ...props }: UpdateUserSheetProps) {
  const router = useRouter()
  const [isUpdatePending, startUpdateTransition] = React.useTransition()
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      username: user.username ?? "",
      password: "",
      sex: user.sex ?? "other",
      role: user.role ?? "student",
      status: user.status ?? "active",
      birthday: user.birthday ?? "",
    },
  })

  React.useEffect(() => {
    form.reset({
      name: user.name ?? "",
      email: user.email ?? "",
      username: user.username ?? "",
      password: "",
      sex: user.sex ?? "other",
      role: user.role ?? "student",
      status: user.status ?? "active",
      birthday: user.birthday ?? "",
    })
  }, [user, form])

  function onSubmit(input: UpdateUserSchema) {
    startUpdateTransition(async () => {
      const updateUserResponse = await FetchServerPutApi(API.ACCOUNT.UPDATE(user.id), input,
        "/admin/user"
      )
      if (updateUserResponse.status == 200) {
        toast.success("Cập nhật người dùng thành công!")
        props.onOpenChange?.(false)
      } else {
        toast.error("Cập nhật thất bại, vui lòng thử lại!")
      }
    })
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Cập nhật người dùng</SheetTitle>
          <SheetDescription>
            Cập nhật thông tin người dùng và lưu thay đổi.
          </SheetDescription>
        </SheetHeader>
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
                  <FormLabel>Họ tên</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Họ tên"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên tài khoản</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tên tài khoản"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu (để trống nếu không thay đổi)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mật khẩu"
                      type="password"
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
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={field.value && "capitalize"}>
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male" className="capitalize">
                          Nam
                        </SelectItem>
                        <SelectItem value="female" className="capitalize">
                          Nữ
                        </SelectItem>
                        <SelectItem value="other" className="capitalize">
                          Khác
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vai trò</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={field.value && "capitalize"}>
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="admin" className="capitalize">
                          Admin
                        </SelectItem>
                        <SelectItem value="instructor" className="capitalize">
                          Giảng viên
                        </SelectItem>
                        <SelectItem value="student" className="capitalize">
                          Học viên
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="active" className="capitalize">
                          Hoạt động
                        </SelectItem>
                        <SelectItem value="inactive" className="capitalize">
                          Ngưng hoạt động
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YYYY-MM-DD"
                      type="date"
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
                Lưu
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}