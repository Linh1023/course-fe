import * as z from "zod"

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Tên danh mục không được để trống").max(255, "Tên danh mục không được quá 255 ký tự"),
  detail: z.string().optional(),
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1, "Tên danh mục không được để trống").max(255, "Tên danh mục không được quá 255 ký tự"),
  detail: z.string().optional(),
  status: z.enum(["active", "inactive"]),
})

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>

export const deleteCategorySchema = z.object({
  id: z.string(),
})

export type DeleteCategorySchema = z.infer<typeof deleteCategorySchema>
