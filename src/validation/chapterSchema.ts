import * as z from "zod"

export const createChapterSchema = z.object({
  chapterNumber: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 1_000_000_000, "Thứ tự chương không hợp lệ"),
  name: z
    .string()
    .trim()
    .min(1, "Tên chương không được để trống")
    .max(255, "Tên chương không được quá 255 ký tự"),
  detail: z.string().default(""),
});

export type CreateChapterSchema = z.input<typeof createChapterSchema>

export const updateChapterSchema = z.object({
  chapterNumber: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 1_000_000_000, "Thứ tự chương không hợp lệ"),
  name: z
    .string()
    .trim()
    .min(1, "Tên chương không được để trống")
    .max(255, "Tên chương không được quá 255 ký tự"),
  detail: z.string().default(""),
  status: z.enum(["active", "inactive"]),
})

export type UpdateChapterSchema = z.input<typeof updateChapterSchema>

export const deleteChapterSchema = z.object({
  id: z.number(),
})

export type DeleteChapterSchema = z.infer<typeof deleteChapterSchema>
