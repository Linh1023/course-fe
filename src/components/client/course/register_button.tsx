"use client";
import { FetchClientDeleteApi, FetchClientGetApi, FetchClientPostApi } from "@/actions/client/fetch_client_api";
import API from "@/api/api";
import { LoaderIcon } from "@/components/share/loading-icon";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentAccountContext } from "@/context/current_account_context";
import { set, setQuarter } from "date-fns";
import { Facebook } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface RegisterButtonProps {
  setOpen: (open: boolean) => void;
  courseId: string;
}
export const RegisterButton = ({ setOpen, courseId }: RegisterButtonProps) => {
  const { currentAccount } = useCurrentAccountContext()
  const [registration, setRegistration] = useState<CourseEnrollment | null>(null)
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false)

  useEffect(() => {
    const fetchRegistration = async () => {
      setIsFetching(true);
      if (!currentAccount) {
        setIsFetching(false);
        return;
      }

      const res = await FetchClientGetApi(`${API.COURSE_ENROLLMENT.OF_ACCOUNT}/${courseId}`);
      if (res && res.status === 200) {
        setRegistration(res.result);
      } else {
        setRegistration(null);
      }
      setIsFetching(false);
    };

    fetchRegistration()
  }, [currentAccount, courseId])

  const handleRegisterCourse = async () => {
    if (!currentAccount) {
      setOpen(true);
      return;
    }
    setLoading(true);
    const res = await FetchClientPostApi(API.COURSE_ENROLLMENT.REGISTER_COURSE_CLIENT, courseId);
    if (res && res.status === 200) {
      setRegistration(res.result);
      toast.success("Đăng ký khóa học thành công, Vui lòng liên hệ để thanh toán");
    }
    setLoading(false);
  }

  const handleCancelRegisterCourse = async () => {
    if (!currentAccount) {
      return;
    }
    setCancelLoading(true);
    const res = await FetchClientDeleteApi(`${API.COURSE_ENROLLMENT.CANCEL_COURSE_REGISTER}/${courseId}`);
    if (res && res.status === 200) {
      setRegistration(null);
      toast.success("Hủy đăng ký khóa học thành công");
    }
    setCancelLoading(false);
  }

  if (isFetching) {
    return (
      <Skeleton className="w-full h-10 rounded-md" />
    );
  }

  if (!currentAccount) {
    return (
      <Button className="bg-[#FE4444] hover:bg-[#F87171] w-full" onClick={handleRegisterCourse}>
        Đăng ký học
      </Button>
    )
  }

  if (registration?.status === "pending") {
    return (
      <>
        <Button disabled className="w-full bg-gray-300 text-gray-600 cursor-not-allowed">
          Đã đăng ký (chờ xác nhận)
        </Button>

        <Button className="bg-[#FE4444] hover:bg-[#F87171] w-full" onClick={handleCancelRegisterCourse} disabled={cancelLoading || loading}>
          {cancelLoading ? <div className="flex items-center gap-2"><LoaderIcon className="mr-1.5 size-4 animate-spin"
            aria-hidden="true" /> Đang hủy đăng ký...</div> : "Hủy đăng ký"}</Button>
        <span>Liên hệ để thanh toán</span>
        <div className="flex w-full justify-center items-center gap-4">
          <div className="group">
            <a
              href="https://www.facebook.com/tran.cuong.737360"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-3 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Facebook className="w-10 h-10 text-white" />
            </a>
          </div>
          <div className="group">
            <a
              href="https://zalo.me/0865275183"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-white font-bold text-xl">Zalo</span>
            </a>
          </div>
        </div>
      </>
    )
  }

  if (registration?.status === "inactive") {
    return (
      <>
        <Button disabled className="w-full bg-gray-300 text-gray-600 cursor-not-allowed">
          Đã bị từ chối đăng ký
        </Button>
        <span>Liên hệ để biết thêm thông tin</span>
        <div className="flex w-full justify-center items-center gap-4">
          <div className="group">
            <a
              href="https://www.facebook.com/tran.cuong.737360"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-3 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Facebook className="w-10 h-10 text-white" />
            </a>
          </div>
          <div className="group">
            <a
              href="https://zalo.me/0865275183"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-white font-bold text-xl">Zalo</span>
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <Button
      className="bg-[#FE4444] hover:bg-[#F87171] w-full"
      onClick={handleRegisterCourse}
      disabled={loading || cancelLoading}
    >
      {loading ? <div className="flex items-center gap-2"><LoaderIcon className="mr-1.5 size-4 animate-spin"
        aria-hidden="true" /> Đang đăng ký...</div> : "Đăng ký học"}
    </Button>
  )
}