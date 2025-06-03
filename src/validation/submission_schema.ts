import * as z from "zod"

export const updateSubmissionSchema = z.object({
    submitterNameEmail: z.string(),
    courseLessonName: z.string(),
    score: z
        .string()
        .refine(
            (val) => {
                const num = parseFloat(val);
                return !isNaN(num) && num >= 0 && num <= 10;
            },
            { message: "Điểm phải là số từ 0 đến 10" }
        ),
    comment :z.string().default(""),
    submissionUrl : z.string(),

})

export type UpdateSubmissionSchema = z.input<typeof updateSubmissionSchema>