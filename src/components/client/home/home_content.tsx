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
import Link from "next/link";
import { useQuerySearchClientContext } from "@/context/query_search_client_context";

interface HomeProps {
  data_hot: CourseCardResponse[];
  data_newest: CourseCardResponse[];
}

const HomeContent = ({ data_hot, data_newest }: HomeProps) => {
  const router = useRouter();
  const { currentAccount } = useCurrentAccountContext();
  const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext();
  const [enrollCourse, setEnrollCourse] = useState<CourseCardResponse[]>([]);
  const [isProgress, setIsProgress] = useState(true);

  const { querySearch, setQuerySearch } = useQuerySearchClientContext()

  useEffect(() => {
    const fetchEnrollCourse = async () => {
      if (!currentAccount) return;

      const res = await FetchServerGetApi(
        `${API.ACCOUNT.MY_COURSE}?perPage=3`
      );
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
        <div
          className={`${currentAccount && enrollCourse.length > 0 ? "lg:col-span-3" : "lg:col-span-4"
            } space-y-6`}
        >
          {/* Carousel */}
          <div className="rounded-lg overflow-hidden mb-4">
            <Carousel
              className="w-full h-72"
              loop
              plugins={[Autoplay({ delay: 2000 })]}
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg h-72 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 text-4xl md:text-6xl">📚</div>
                      <div className="absolute top-8 left-8 text-2xl md:text-3xl">✨</div>
                      <div className="absolute top-16 right-16 text-xl md:text-2xl">🔢</div>
                      <div className="absolute bottom-8 right-8 text-2xl md:text-3xl">📊</div>
                      <div className="absolute bottom-4 left-4 w-20 h-20 md:w-32 md:h-32 border border-white/20 rounded-full"></div>
                      <div className="absolute top-1/2 right-1/3 w-12 h-12 md:w-16 md:h-16 border border-white/10 rounded-full"></div>
                      <div className="absolute bottom-1/3 right-1/4 w-8 h-8 md:w-12 md:h-12 border border-white/5 rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex items-center p-4 md:p-8 text-white">
                      <div className="flex-1 max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 leading-tight">
                          Học Toán Trực Tuyến
                        </h2>

                        <p className="text-sm md:text-lg font-medium text-white/90 mb-2 md:mb-3">
                          Nền tảng học toán hiệu quả cho học sinh THCS
                        </p>

                        <p className="text-xs md:text-base text-white/80 leading-relaxed mb-3 md:mb-4">
                          Khám phá thế giới toán học thú vị với phương pháp giảng dạy hiện đại,
                          bài tập phong phú và hệ thống theo dõi tiến độ chi tiết
                        </p>

                        {/* CTA Button */}
                        <Link href={"/search?page=1"}
                          onClick={() => {
                            const newQuerySearch = `page=1&size=12`
                            if (newQuerySearch != querySearch) {
                              setQuerySearch(newQuerySearch)
                            }
                          }}
                        >
                          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold py-1.5 px-3 md:py-2 md:px-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg mb-2 md:mb-3 text-sm md:text-base">
                            <span className="flex items-center gap-1.5">
                              <span>Khám Phá Ngay</span>
                              <span className="text-base md:text-lg">🚀</span>
                            </span>
                          </button>
                        </Link>


                        {/* Icon features - compact version */}
                        <div className="flex items-center gap-3 md:gap-4 text-white/70">
                          <div className="flex items-center gap-1">
                            <span className="text-sm md:text-lg">🎥</span>
                            <span className="text-xs md:text-sm">Video HD</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm md:text-lg">🏆</span>
                            <span className="text-xs md:text-sm">Tương tác</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm md:text-lg">📈</span>
                            <span className="text-xs md:text-sm">Tiến độ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg h-72 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute top-4 right-4 text-4xl md:text-6xl">🔥</div>
                      <div className="absolute top-8 left-8 text-2xl md:text-3xl">⭐</div>
                      <div className="absolute top-16 right-16 text-xl md:text-2xl">📈</div>
                      <div className="absolute bottom-8 right-8 text-2xl md:text-3xl">💎</div>
                      <div className="absolute top-12 left-1/3 text-lg md:text-xl">🏆</div>
                      <div className="absolute bottom-16 left-8 text-xl md:text-2xl">🎯</div>

                      {/* Animated circles */}
                      <div className="absolute bottom-4 left-4 w-20 h-20 md:w-32 md:h-32 border-2 border-white/30 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 right-1/3 w-12 h-12 md:w-16 md:h-16 border border-white/20 rounded-full"></div>
                      <div className="absolute bottom-1/3 right-1/4 w-8 h-8 md:w-12 md:h-12 border border-white/10 rounded-full animate-bounce"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex items-center p-4 md:p-6 text-white">
                      <div className="flex-1 max-w-2xl">
                        {/* Hot Badge */}
                        <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 px-2 py-1 rounded-full mb-2">
                          <span className="text-yellow-300 text-sm">🔥</span>
                          <span className="text-yellow-200 font-medium text-xs">TRENDING HOT</span>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold mb-1 leading-tight">
                          Khóa Học Được Yêu Thích Nhất
                        </h2>

                        <p className="text-sm md:text-base font-medium text-white/90 mb-2">
                          Top khóa học toán THCS được chọn nhiều nhất
                        </p>



                        {/* CTA Button */}
                        <Link href={"/search?page=1&sort=hot"}
                          onClick={() => {
                            const newQuerySearch = `page=1&size=12&sort=hot`
                            if (newQuerySearch != querySearch) {
                              setQuerySearch(newQuerySearch)
                            }
                          }}
                        >
                          <button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-orange-900 font-bold py-2.5 px-5 md:py-3 md:px-6 rounded-full transition-all duration-300 hover:scale-105 shadow-lg mb-3 text-sm md:text-base">
                            <span className="flex items-center gap-1.5">
                              <span>Xem Khóa Học Hot</span>
                              <span className="text-base">🚀</span>
                            </span>
                          </button>
                        </Link>

                        {/* Popular Subjects - Streamlined */}
                        <div className="flex items-center gap-2 text-white/80">
                          <span className="text-xs font-medium">Phổ biến:</span>
                          <div className="flex gap-1.5">
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">Đại số</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">Hình học</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">Số học</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg h-72 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute top-4 right-4 text-4xl md:text-6xl">📚</div>
                      <div className="absolute top-8 left-8 text-2xl md:text-3xl">✨</div>
                      <div className="absolute top-16 right-16 text-xl md:text-2xl">🎓</div>
                      <div className="absolute bottom-8 right-8 text-2xl md:text-3xl">💡</div>
                      <div className="absolute top-12 left-1/3 text-lg md:text-xl">🔬</div>
                      <div className="absolute bottom-16 left-8 text-xl md:text-2xl">📊</div>

                      {/* Animated circles */}
                      <div className="absolute bottom-4 left-4 w-20 h-20 md:w-32 md:h-32 border-2 border-white/30 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/2 right-1/3 w-12 h-12 md:w-16 md:h-16 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                      <div className="absolute bottom-1/3 right-1/4 w-8 h-8 md:w-12 md:h-12 border border-white/10 rounded-full animate-bounce"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex items-center p-4 md:p-6 text-white">
                      <div className="flex-1 max-w-2xl">
                        {/* New Badge */}
                        <div className="inline-flex items-center gap-2 bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 px-2 py-1 rounded-full mb-2">
                          <span className="text-cyan-300 text-sm">✨</span>
                          <span className="text-cyan-200 font-medium text-xs">MỚI CẬP NHẬT</span>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold mb-1 leading-tight">
                          Khóa Học Mới Nhất
                        </h2>

                        <p className="text-sm md:text-base font-medium text-white/90 mb-4">
                          Chương trình học cập nhật theo xu hướng mới
                        </p>

                        <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-4">
                          Nội dung được thiết kế theo phương pháp giảng dạy hiện đại
                        </p>

                        {/* CTA Button */}
                        <Link href={"/search?page=1&sort=newest"}
                        onClick={() => {
                            const newQuerySearch = `page=1&size=12&sort=newest`
                            if (newQuerySearch != querySearch) {
                              setQuerySearch(newQuerySearch)
                            }
                          }}
                        >
                          <button className="bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-teal-900 font-bold py-2.5 px-5 md:py-3 md:px-6 rounded-full transition-all duration-300 hover:scale-105 shadow-lg mb-3 text-sm md:text-base">
                            <span className="flex items-center gap-1.5">
                              <span>Khám Phá Ngay</span>
                              <span className="text-base">⚡</span>
                            </span>
                          </button>
                        </Link>

                        {/* Course Features */}
                        <div className="flex items-center gap-3 text-white/80">
                          <div className="flex items-center gap-1">
                            <span className="text-cyan-300 text-sm">📖</span>
                            <span className="text-xs font-medium">Giáo trình chuẩn</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-emerald-300 text-sm">🎥</span>
                            <span className="text-xs">Video HD chất lượng cao</span>
                          </div>
                        </div>
                      </div>

                      {/* Right side decoration */}
                      <div className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2">
                        <div className="relative">
                          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-3xl">🆕</span>
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-bounce flex items-center justify-center">
                            <span className="text-xs">✨</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          {/* Khóa học đang học - HIỂN THỊ trên mobile/tablet, ẨN desktop */}
          {currentAccount && enrollCourse.length > 0 && (
            <div className="block lg:hidden mb-8">
              <CourseList
                title="Khóa học đang học"
                courses={enrollCourse}
                layout="list"
                isProgress={isProgress}
              />
            </div>
          )}

          {/* Các danh sách khóa học khác */}
          <div className="space-y-8">
            <CourseList
              title="Khóa học nổi bật"
              courses={data_hot}
              layout="grid"
              seeMoreLink="sort=hot&page=1&size=12"
            />
            <CourseList
              title="Khóa học mới ra mắt"
              courses={data_newest}
              layout="grid"
              seeMoreLink="sort=newest&page=1&size=12"
            />
            {/* <CourseList
              title="Khóa học mới ra mắt"
              courses={data_newest}
              layout="grid"
              seeMoreLink="/search?category=newest"
            /> */}
          </div>
        </div>

        {/* Cột phải - KHÓA HỌC ĐANG HỌC chỉ hiện desktop asdasd */}
        {currentAccount && enrollCourse.length > 0 && (
          <div className="hidden lg:flex lg:col-span-1 flex-col space-y-4 bg-gray-100 p-4 rounded-xl">
            <CourseList
              title="Khóa học đang học"
              courses={enrollCourse}
              layout="list"
              isProgress={isProgress}
            />

            {enrollCourse.length > 3 && (<>
              <div className="flex justify-center">
                <Link href={"/profile/course"} className="text-[#fe7171]">Xem thêm</Link>
              </div>

            </>)}

            {/* <div className="flex gap-4 items-center justify-center pt-4">
              <Facebook
                href=""
                className="w-8 h-8 hover:text-red-500 cursor-pointer rounded"
              />
              <PhoneCall
                href=""
                className="w-8 h-8 hover:text-red-500 cursor-pointer rounded"
              />
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeContent;
