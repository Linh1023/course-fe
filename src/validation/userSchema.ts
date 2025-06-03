import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().min(1, "Họ tên là bắt buộc").max(100, "Họ tên không được vượt quá 100 ký tự"),
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  username: z.string().min(1, "Tên tài khoản là bắt buộc").max(50, "Tên tài khoản không được vượt quá 50 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  sex: z.enum(["male", "female", "other"], {
    required_error: "Giới tính là bắt buộc",
  }),
  role: z.enum(["admin", "instructor", "student"], {
    required_error: "Vai trò là bắt buộc",
  }),
  status: z.enum(["active", "inactive"], {
    required_error: "Trạng thái là bắt buộc",
  }),
  birthday: z.string().optional().refine(
    (val) => !val || !isNaN(Date.parse(val)),
    { message: "Ngày sinh không hợp lệ" }
  ),
})

export const updateUserSchema = z.object({
  name: z.string().min(1, "Họ tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  username: z.string().min(1, "Tên tài khoản là bắt buộc"),
  status: z.enum(["active", "inactive"]),
  role: z.enum(["ADMIN", "CLIENT"]),
  sex: z.enum(["MALE", "FEMALE", "OTHER"]),
  phone: z.string().min(1, "Số điện thoại là bắt buộc"),
  avatarUrl: z.string().url("URL ảnh đại diện không hợp lệ"),
  birthday: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày sinh không hợp lệ"),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>