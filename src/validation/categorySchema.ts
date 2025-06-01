import * as z from "zod"

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên danh mục không được để trống")
    .max(255, "Tên danh mục không được quá 255 ký tự"),
 detail: z.string().default(""), 
});

export type CreateCategorySchema = z.input<typeof createCategorySchema>

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1, "Tên danh mục không được để trống").max(255, "Tên danh mục không được quá 255 ký tự"),
  detail: z.string().default(""),
  status: z.enum(["active", "inactive"]),
})

export type UpdateCategorySchema = z.input<typeof updateCategorySchema>

export const deleteCategorySchema = z.object({
  id: z.string(),
})

export type DeleteCategorySchema = z.infer<typeof deleteCategorySchema>
