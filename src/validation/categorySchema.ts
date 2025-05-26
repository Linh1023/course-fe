import * as z from "zod"

export const categorySearchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  detail: z.string().optional(),
}) 

export type CategorySearchParams = z.infer<typeof categorySearchParamsSchema>

export const getCategoriesSchema = categorySearchParamsSchema


export type GetCategoriesSchema = z.infer<typeof getCategoriesSchema>

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Tên danh mục không được để trống"),
  detail: z.string().optional(),
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1, "Tên danh mục không được để trống"),
  detail: z.string().optional(),
})

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>

export const deleteCategorySchema = z.object({
  id: z.string(),
})
export type DeleteCategorySchema = z.infer<typeof deleteCategorySchema>
