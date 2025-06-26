import * as z from "zod"

export const createCourseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên khóa học không được để trống")
    .max(255, "Tên khóa học không được quá 255 ký tự"),
  categoryId: z.string().default(""),
  price: z
    .string()
    .transform((val) => {
      const cleaned = val.replace(/[^0-9]/g, "");
      return cleaned;
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 1_000_000_000, "Giá không hợp lệ"),
  detail: z.string().default(""),
  image: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Vui lòng chọn 1 ảnh")
    .refine((files) => files &&
      files.length === 1 && ["image/png", "image/jpeg", "image/jpg"].includes(files[0]?.type), "Chỉ cho phép PNG, JPG")
    .refine((files) => files && files[0]?.size <= 5 * 1024 * 1024, "Kích thước ảnh không được quá 5MB"),
  video: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Vui lòng chọn 1 video")
    .refine((files) => files &&
      files.length === 1 && ["video/mp4"].includes(files[0]?.type), "Chỉ cho phép video MP4"),
});

export type CreateCourseSchema = z.input<typeof createCourseSchema>

export const updateCourseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên khóa học không được để trống")
    .max(255, "Tên khóa học không được quá 255 ký tự"),
  categoryId: z.string().default(""),
  price: z
    .string()
    .transform((val) => {
      const cleaned = val.replace(/[^0-9]/g, "");
      return cleaned;
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 1_000_000_000, "Giá không hợp lệ"),
  detail: z.string().default(""),
  image: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Vui lòng chọn 1 ảnh")
    .refine((files) => files &&
      files.length === 1 && ["image/png", "image/jpeg", "image/jpg"].includes(files[0]?.type), "Chỉ cho phép PNG, JPG")
    .refine((files) => files && files[0]?.size <= 5 * 1024 * 1024, "Kích thước ảnh không được quá 5MB").optional(),
  video: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Vui lòng chọn 1 video")
    .refine((files) => files &&
      files.length === 1 && ["video/mp4"].includes(files[0]?.type), "Chỉ cho phép video MP4").optional(),
  status: z.enum(["active", "inactive"]),
})

export type UpdateCourseSchema = z.input<typeof updateCourseSchema>

export const deleteCourseSchema = z.object({
  id: z.string(),
})

export type DeleteCourseSchema = z.infer<typeof deleteCourseSchema>
