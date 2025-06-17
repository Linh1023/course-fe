"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { FetchServerPutApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { updateUserSchema, UpdateUserSchema } from "@/validation/userSchema";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  status: "active" | "inactive";
  role: "ADMIN" | "CLIENT";
  sex: "MALE" | "FEMALE" | "OTHER";
  phone: string;
  avatarUrl: string;
  birthday: string;
  password: string;
}

interface UpdateUserSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  user: User;
  setIsLoading: (v: boolean) => void;
  fetchData:()=>void
}

// Hàm xử lý thông báo lỗi từ server
const handleServerErrors = (errors: any[], form: any) => {
  errors.forEach((error) => {
    switch (error.code) {
      case "ACCOUNT_3":
        form.setError("email", {
          type: "server",
          message: "Email này đã được sử dụng, vui lòng chọn email khác"
        });
        break;
      case "ACCOUNT_4":
        form.setError("username", {
          type: "server", 
          message: "Tên tài khoản này đã tồn tại, vui lòng chọn tên khác"
        });
        break;
      default:
        toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại!");
        break;
    }
  });
};

export function UpdateUserSheet({ user,fetchData, setIsLoading, ...props }: UpdateUserSheetProps) {
  const router = useRouter();
  const [isUpdatePending, startUpdateTransition] = React.useTransition();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      username: user.username || "",
      status: user.status || "active",
      role: user.role || "CLIENT",
      sex: user.sex || "OTHER",
      phone: user.phone || "",
      avatarUrl: user.avatarUrl || "",
      birthday: user.birthday || "",
      password: user.password || "",
    },
  });

  // Reset form khi user thay đổi
  React.useEffect(() => {
    form.reset({
      name: user.name || "",
      email: user.email || "",
      username: user.username || "",
      status: user.status || "active",
      role: user.role || "CLIENT",
      sex: user.sex || "OTHER",
      phone: user.phone || "",
      avatarUrl: user.avatarUrl || "",
      birthday: user.birthday || "",
      password: user.password || "",
    });
  }, [user.id, form]);

  function onSubmit(input: UpdateUserSchema) {
    startUpdateTransition(async () => {
      try {
        // Clear previous server errors
        form.clearErrors("email");
        form.clearErrors("username");

        const updateUserResponse = await FetchServerPutApi(
          API.ACCOUNT.UPDATE(user.id),
          input
        );
        
        if (updateUserResponse.status === 200) {
          fetchData()
          toast.success("Cập nhật người dùng thành công!");
          props.onOpenChange?.(false);
          setIsLoading(true);
        } else if (updateUserResponse.status === 400 && updateUserResponse.errors) {
          // Xử lý lỗi validation từ server
          handleServerErrors(updateUserResponse.errors, form);
          
          // Hiển thị toast error tổng quát
          const errorMessages = updateUserResponse.errors.map((error: any) => {
            switch (error.code) {
              case "ACCOUNT_3":
                return "Email này đã được sử dụng, vui lòng chọn email khác";
              case "ACCOUNT_4":
                return "Tên tài khoản này đã được sử dụng, vui lòng chọn tên khác";
              default:
                return error.message;
            }
          });
          
          toast.error(`Lỗi: ${errorMessages.join(", ")}`);
        } else {
          toast.error(
            updateUserResponse.message || "Cập nhật thất bại, vui lòng thử lại!"
          );
        }
      } catch (error) {
        toast.error("Lỗi hệ thống, vui lòng thử lại sau!");
        console.error("Update user error:", error);
      } finally {
        startUpdateTransition(() => {}); // Đảm bảo trạng thái loading cục bộ được reset
      }
    });
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-[400px] overflow-y-auto">
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
                      onChange={(e) => {
                        field.onChange(e);
                        if (form.formState.errors.email?.type === "server") {
                          form.clearErrors("email");
                        }
                      }}
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
                      onChange={(e) => {
                        field.onChange(e);
                        if (form.formState.errors.username?.type === "server") {
                          form.clearErrors("username");
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Số điện thoại"
                      type="tel"
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
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL ảnh đại diện</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/avatar.jpg"
                      type="url"
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
                        <SelectItem value="MALE" className="capitalize">
                          Nam
                        </SelectItem>
                        <SelectItem value="FEMALE" className="capitalize">
                          Nữ
                        </SelectItem>
                        <SelectItem value="OTHER" className="capitalize">
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
                        <SelectItem value="ADMIN" className="capitalize">
                          Admin
                        </SelectItem>
                        <SelectItem value="CLIENT" className="capitalize">
                          Khách hàng
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập mật khẩu mới"
                      type="text"
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
  );
}