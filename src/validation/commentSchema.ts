// schemas/comment.schema.ts

import * as z from "zod"



// Schema tạo bình luận
export const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Nội dung không được để trống")
    .max(1000, "Nội dung không được vượt quá 1000 ký tự"),
  lessonId: z.string().min(1, "ID bài học là bắt buộc"),
  authorId: z.string().min(1, "ID tác giả là bắt buộc"),
})

export type CreateCommentSchema = z.infer<typeof createCommentSchema>

// Schema cập nhật bình luận
export const updateCommentSchema = z.object({
  id: z.string().min(1, "ID bình luận là bắt buộc"),
  content: z
    .string()
    .trim()
    .min(1, "Nội dung không được để trống")
    .max(1000, "Nội dung không được vượt quá 1000 ký tự"),
  status: z.enum(["pending", "approved"]),
})

export type UpdateCommentSchema = z.infer<typeof updateCommentSchema>

// Schema xóa bình luận
export const deleteCommentSchema = z.object({
  id: z.string().min(1, "ID là bắt buộc"),
})

export type DeleteCommentSchema = z.infer<typeof deleteCommentSchema>
