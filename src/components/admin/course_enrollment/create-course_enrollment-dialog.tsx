"use client";

import { FetchServerPostApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { LoaderIcon } from "@/components/share/loading-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createCourseEnrollmentSchema,
  CreateCourseEnrollmentSchema,
} from "@/validation/courseEnrollmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CreateCourseEnrollmentItem } from "./create_course_enrollment_item";
import CourseEnrollmentErrorCode from "@/exception/course_enrollment_error_code";

interface CreateCourseEnrollmentDialogProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
}

export const CreateCourseEnrollmentDialog = ({
  setIsLoading,
  fetchData,
}: CreateCourseEnrollmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isCreatePending, startCreateTransition] = useTransition();

  const form = useForm<CreateCourseEnrollmentSchema>({
    resolver: zodResolver(createCourseEnrollmentSchema),
    defaultValues: {
      courseId: "",
      accountId: "",
    },
  });

  const onSubmit = (input: CreateCourseEnrollmentSchema) => {
    startCreateTransition(async () => {
      const res = await FetchServerPostApi(
        API.COURSE_ENROLLMENT.CREATE_COURSE_ENROLLMENT,
        input
      ); // Updated to correct endpoint

      if (res.status === 200) {
        fetchData();
        form.reset();
        toast.success("Tạo đăng ký khóa học thành công");
        setOpen(false);
        setIsLoading(true);
      } else {
        handleError(res.errors);
      }
    });
  };
  const handleError = (errorCode: string) => {
    const errorMessage: string =
      CourseEnrollmentErrorCode[
        errorCode as keyof typeof CourseEnrollmentErrorCode
      ];
    if (errorMessage) {
      toast.error(errorMessage);
      switch (errorCode) {
        case "COURSE_ENROLLMENT_2":
          toast.error("Khóa học đã được đăng ký trước đó");
          break;
        case "COURSE_ENROLLMENT_1":
          toast.error("Khóa học không tồn tại");
          break;

        default:
          toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
          break;
      }
    } else {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <PlusIcon className="mr-2 size-4" aria-hidden="true" />
        Thêm đăng ký khóa học
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo đăng ký khóa học</DialogTitle>
          <DialogDescription>
            Điền thông tin để đăng ký khóa học mới
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khóa học</FormLabel>
                  <FormControl>
                    <CreateCourseEnrollmentItem
                      endpointType={"courseId"}
                      placeholder="Tìm khóa học..."
                      onSelect={(item) => field.onChange(item.id)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tài khoản</FormLabel>
                  <FormControl>
                    <CreateCourseEnrollmentItem
                      endpointType="accountId"
                      placeholder="Tìm tài khoản theo username..."
                      onSelect={(item) => field.onChange(item.id)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Hủy
                </Button>
              </DialogClose>
              <Button disabled={isCreatePending}>
                {isCreatePending && (
                  <LoaderIcon
                    className="mr-1.5 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Tạo mới
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
