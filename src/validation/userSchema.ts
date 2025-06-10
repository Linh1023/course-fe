import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().min(1, "Họ tên là bắt buộc"),
  email: z.string().min(1, "Vui lòng nhập emai"),
  username: z.string().min(1, "Tên tài khoản là bắt buộc"),
  status: z.enum(["active", "inactive"]),
  role: z.enum(["ADMIN", "CLIENT"]),
  sex: z.enum(["MALE", "FEMALE", "OTHER"]),
  phone: z.string().optional(),
  avatarUrl: z.string().optional(),
 birthday: z.string().min(1, "Ngày sinh là bắt buộc"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, "Họ tên là bắt buộc"),
  email: z.string().optional(),
  username: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  role: z.enum(["ADMIN", "CLIENT"]),
  sex: z.enum(["MALE", "FEMALE", "OTHER"]),
  phone: z.string().optional(),
  avatarUrl: z.string().optional(),
  birthday: z.string().min(1, "Ngày sinh là bắt buộc"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>