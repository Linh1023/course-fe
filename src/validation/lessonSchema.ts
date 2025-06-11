import * as z from "zod"

export const createLessonSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên khóa học không được để trống")
    .max(255, "Tên khóa học không được quá 255 ký tự"),
  detail: z.string().default(""),
  lessonNumber: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 1_000_000_000, "Thứ tự bài học không hợp lệ"),
  video: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Vui lòng chọn 1 video")
    .refine((files) => files &&
      files.length === 1 && ["video/mp4"].includes(files[0]?.type), "Chỉ cho phép video MP4"),
  document: z.custom<FileList>()
    .refine((files) => files?.length === 1, "Vui lòng chọn 1 tài liệu")
    .refine((files) => files &&
      files.length === 1 &&  files.length === 1 && ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(files[0]?.type),
    "Chỉ cho phép tài liệu PDF hoặc DOCX").optional(),
  assignment: z.custom<FileList>()
    .refine((files) => files?.length === 1, "Vui lòng chọn 1 bài tập")
    .refine((files) => files &&
       files.length === 1 &&
      ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(files[0]?.type),
    "Chỉ cho phép bài tập PDF hoặc DOCX")
  .optional(),
});

export type CreateLessonSchema = z.input<typeof createLessonSchema>

export const updateLessonSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên khóa học không được để trống")
    .max(255, "Tên khóa học không được quá 255 ký tự"),
  detail: z.string().default(""),
  lessonNumber: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 1_000_000_000, "Thứ tự bài học không hợp lệ"),
  video: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Vui lòng chọn 1 video")
    .refine((files) => files &&
      files.length === 1 && ["video/mp4"].includes(files[0]?.type), "Chỉ cho phép video MP4").optional(),
  document: z.custom<FileList>()
    .refine((files) => files?.length === 1, "Vui lòng chọn 1 tài liệu")
    .refine((files) => files &&
      files.length === 1 &&  files.length === 1 && ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(files[0]?.type),
    "Chỉ cho phép tài liệu PDF hoặc DOCX").optional(),
  assignment: z.custom<FileList>()
    .refine((files) => files?.length === 1, "Vui lòng chọn 1 bài tập")
    .refine((files) => files &&
      files.length === 1 && ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(files[0]?.type),
    "Chỉ cho phép bài tập PDF hoặc DOCX")
  .optional(),
  status: z.enum(["active", "inactive"]),
})

export type UpdateLessonSchema = z.input<typeof updateLessonSchema>

export const deleteLessonSchema = z.object({
  id: z.string(),
})

export type DeleteLessonSchema = z.infer<typeof deleteLessonSchema>
