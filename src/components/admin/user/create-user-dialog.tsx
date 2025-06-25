import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon, PlusIcon } from "lucide-react";
import { FetchServerPostApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { CreateUserSchema, createUserSchema } from "@/validation/userSchema";

// Interface cho error response từ API
interface ApiError {
  code: string;
  message: string;
}

interface CreateUserDialogProps {
  setIsLoading: (v: boolean) => void;
  fetchData:() =>void
}

export function CreateUserDialog({ setIsLoading, fetchData }: CreateUserDialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isCreatePending, startCreateTransition] = React.useTransition();

  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      status: "active",
      role: "CLIENT",
      sex: "OTHER",
      phone: "",
      avatarUrl: "",
      birthday: "",
      password: "",
    },
  });

  // Hàm xử lý lỗi từ API
  const handleApiErrors = (errors: ApiError[]) => {
    if (!Array.isArray(errors)) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      return;
    }

    errors.forEach((error) => {
      switch (error.code) {
        case "ACCOUNT_3":
          form.setError("email", {
            type: "manual",
            message: "Email này đã được sử dụng, vui lòng chọn email khác"
          });
          toast.error("Email đã tồn tại");
          break;
        case "ACCOUNT_4":
          form.setError("username", {
            type: "manual",
            message: "Tên tài khoản này đã được sử dụng, vui lòng chọn tên khác"
          });
          toast.error("Tên tài khoản đã tồn tại");
          break;
        case "ACCOUNT_2":
          toast.error("Không thể lưu thông tin người dùng, vui lòng thử lại");
          break;
        case "ACCOUNT_1":
          toast.error("Không tìm thấy tài khoản");
          break;
        default:
          toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại");
          break;
      }
    });
  };

  function onSubmit(input: CreateUserSchema) {
    form.clearErrors();
    startCreateTransition(async () => {
      try {
        const res = await FetchServerPostApi(API.ACCOUNT.CREATE, input);
        
        if (res.status === 200 || res.status === 201) {

          form.reset();
          toast.success("Tạo người dùng thành công");
          setOpen(false);
          fetchData()
          setIsLoading(true);
        } else if (res.status === 400) {
          if (res.data && res.data.errors && Array.isArray(res.data.errors)) {
            handleApiErrors(res.data.errors);
          } else if (res.errors && Array.isArray(res.errors)) {
            handleApiErrors(res.errors);
          } else if (res.message) {
            toast.error(res.message);
          } else {
            toast.error("Dữ liệu không hợp lệ, vui lòng kiểm tra lại thông tin");
          }
        } else {
          toast.error("Tạo người dùng thất bại, vui lòng thử lại sau");
        }
      } catch (error: any) {
        console.error("Create user error:", error);
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData.errors && Array.isArray(errorData.errors)) {
            handleApiErrors(errorData.errors);
          } else if (errorData.message) {
            toast.error(errorData.message);
          } else {
            toast.error("Tạo người dùng thất bại, vui lòng thử lại sau");
          }
        } else if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Có lỗi xảy ra, vui lòng kiểm tra kết nối mạng và thử lại");
        }
      } finally {
        startCreateTransition(() => {}); // Đảm bảo trạng thái loading cục bộ được reset
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" disabled={isCreatePending}>
                <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                Thêm người dùng
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Thêm người dùng</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo người dùng</DialogTitle>
          <DialogDescription>
            Điền thông tin để tạo người dùng mới
          </DialogDescription>
        </DialogHeader>
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
                  <FormLabel>Mật khẩu</FormLabel>
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
            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isCreatePending}>
                  Hủy
                </Button>
              </DialogClose>
              <Button disabled={isCreatePending}>
                {isCreatePending && (
                  <LoaderIcon
                    className="mr-1.5 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Tạo mới
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}