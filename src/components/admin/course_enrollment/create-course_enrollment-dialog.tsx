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

      console.log(res)

      if (res.status === 200) {
        fetchData();
        form.reset();
        toast.success("Tạo đăng ký khóa học thành công");
        setOpen(false);
        setIsLoading(true);
      } else {
        for(const error of res.errors) {
          handleError(error.code)
        } 
        // if (res.errors && Array.isArray(res.errors)) {
        //   res.errors.forEach((err: { code: string }) => {
        //     handleError(err.code);
        //   });
        // } else {
        //   toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
        // }
      }
    });
  };
  const handleError = (errorCode: string) => {

      switch (errorCode) {
        case "COURSE_ENROLLMENT_4":
          toast.error("Khóa học đã được đăng ký cho người dùng này");
          break;
        case "COURSE_ENROLLMENT_5":
          toast.error("Khóa học đã được đăng ký cho người dùng này nhưng đang bị khóa");
          break;
        case "COURSE_ENROLLMENT_6":
          toast.error("Người dùng đã đăng ký khóa học này và đang chờ xác nhận");
          break;
        default:
          toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
          break;
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
