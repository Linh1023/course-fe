"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";

import API from "@/api/api";
import { useLoadingContext } from "@/context/loading_context";
import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import { useCurrentAccountContext } from "@/context/current_account_context";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import CourseList from "./CourseList";
import { Facebook, PhoneCall } from "lucide-react";

interface HomeProps {
  data_hot: CourseCardResponse[];
  data_newest: CourseCardResponse[];
}

const HomeContent = ({ data_hot, data_newest }: HomeProps) => {
  const router = useRouter();
  const { currentAccount } = useCurrentAccountContext();
  const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext();
  const [enrollCourse, setEnrollCourse] = useState<CourseCardResponse[]>([]);

  useEffect(() => {
    const fetchEnrollCourse = async () => {
      if (!currentAccount) return;

      const res = await FetchServerGetApi(API.COURSE_ENROLLMENT.GET_COURSE_ENROLL);
      if (res && res.status === 200) {
        setEnrollCourse(res.result);
      }
    };

    fetchEnrollCourse();
  }, [currentAccount]);

  return (
    <div className="p-4 h-full mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Cột trái */}
        <div className={`${currentAccount ? "lg:col-span-3" : "lg:col-span-4"} space-y-6`}>
          {/* Carousel */}
          <div className="rounded-lg overflow-hidden">
            <Carousel className="w-full h-72" loop plugins={[Autoplay({ delay: 2000 })]}>
              <CarouselContent>
                <CarouselItem><div className="bg-gray-300 rounded-lg h-72" /></CarouselItem>
                <CarouselItem><div className="bg-red-900 rounded-lg h-72" /></CarouselItem>
                <CarouselItem><div className="bg-blue-300 rounded-lg h-72" /></CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          {/* Danh sách khóa học */}
          <div className="space-y-8">
            <CourseList title="Khóa học nổi bật" courses={data_hot} layout="grid" seeMoreLink="/search?category=hot" />
            <CourseList title="Khóa học mới ra mắt" courses={data_newest} layout="grid" seeMoreLink="/search?category=newest" />
            <CourseList title="Khóa học mới ra mắt" courses={data_newest} layout="grid" seeMoreLink="/search?category=newest" />
          </div>
        </div>

        {/* Cột phải chỉ hiển thị nếu đã đăng nhập */}
        {currentAccount && (
          <div className="lg:flex lg:col-span-1 flex-col space-y-4 bg-gray-100 p-4 rounded-xl">
            <CourseList title="Khóa học đang học" courses={enrollCourse} layout="list" />
            <div className="flex gap-4 items-center justify-center pt-4">
              <Facebook href="" className="w-8 h-8  hover:text-red-500 cursor-pointer rounded" />
              <PhoneCall href="" className="w-8 h-8  hover:text-red-500 cursor-pointer rounded" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
