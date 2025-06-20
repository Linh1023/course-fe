import * as z from "zod";

// 🎯 Schema tạo đăng ký khóa học
export const createCourseEnrollmentSchema = z.object({
  courseId: z.string().min(1, "Khóa học là bắt buộc"),
  accountId: z.string().min(1, "Người dùng là bắt buộc"),
});

export type CreateCourseEnrollmentSchema = z.infer<
  typeof createCourseEnrollmentSchema
>;

// 🎯 Schema cập nhật trạng thái
export const updateCourseEnrollmentSchema = z.object({
  courseEnrollmentId: z.string().min(1, "ID đăng ký là bắt buộc"),
  status: z.enum(["active", "inactive", "pending"]),
});

export type UpdateCourseEnrollmentSchema = z.infer<
  typeof updateCourseEnrollmentSchema
>;

// 🎯 Schema xóa đăng ký
export const deleteCourseEnrollmentSchema = z.object({
  courseEnrollmentId: z.string().min(1, "ID đăng ký là bắt buộc"),
});

export type DeleteCourseEnrollmentSchema = z.infer<
  typeof deleteCourseEnrollmentSchema
>;
