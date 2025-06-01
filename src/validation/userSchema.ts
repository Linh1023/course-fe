import { z } from "zod"

export const createUserSchema = z.object({
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