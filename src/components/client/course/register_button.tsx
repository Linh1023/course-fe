"use client";
import { FetchClientDeleteApi, FetchClientGetApi, FetchClientPostApi } from "@/actions/client/fetch_client_api";
import API from "@/api/api";
import { LoaderIcon } from "@/components/share/loading-icon";
import { Button } from "@/components/ui/button";
import { useCurrentAccountContext } from "@/context/current_account_context";
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

  useEffect(() => {
    const fetchRegistration = async () => {
      if (!currentAccount) return
      const res = await FetchClientGetApi(`${API.COURSE_ENROLLMENT.OF_ACCOUNT}/${courseId}`)
      if (res && res.status === 200) {
        setRegistration(res.result);
      } else {
        setRegistration(null);
      }
    }

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
    setLoading(true);
    const res = await FetchClientDeleteApi(`${API.COURSE_ENROLLMENT.CANCEL_COURSE_REGISTER}/${courseId}`);
    if (res && res.status === 200) {
      setRegistration(null);
      toast.success("Hủy đăng ký khóa học thành công");
    }
    setLoading(false);
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
        <Button className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200" onClick={() => {
          window.open("https://www.facebook.com/tran.cuong.737360", "_blank");
        }}>Liên hệ để thanh toán</Button>
        <Button className="bg-[#FE4444] hover:bg-[#F87171] w-full" onClick={handleCancelRegisterCourse}>Hủy đăng ký</Button>
      </>
    )
  }

  return (
    <Button
      className="bg-[#FE4444] hover:bg-[#F87171] w-full"
      onClick={handleRegisterCourse}
      disabled={loading}
    >
      {loading ? <div className="flex items-center"><LoaderIcon /> Đang đăng ký...</div> : "Đăng ký học"}
    </Button>
  )
}