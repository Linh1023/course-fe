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
import { SvgHot } from "../share/svgHot";
import SvgNew from "../share/svgNew";
import { SvgLearning } from "../share/svgLearning";

interface HomeProps {
  data_hot: CourseCardResponse[];
  data_newest: CourseCardResponse[];
  data_my_lesson: CourseCardResponse[];
}

const HomeContent = ({ data_hot, data_newest, data_my_lesson }: HomeProps) => {
  const router = useRouter();

  const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext();
  const [enrollCourse, setEnrollCourse] = useState<CourseCardResponse[]>(data_my_lesson);
  const [isProgress, setIsProgress] = useState(true);

  const { querySearch, setQuerySearch } = useQuerySearchClientContext()


  return (
    <div className="p-4 h-full mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Cột trái */}
        <div
          className={`${enrollCourse.length > 0 ? "lg:col-span-3" : "lg:col-span-4"
            } space-y-6`}
        >
          {/* Carousel */}
          <div className="rounded-lg overflow-hidden mb-4">
            <Carousel
              className="w-full h-72"
              loop
              plugins={[Autoplay({ delay: 4000 })]}
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
          {enrollCourse.length > 0 && (
            <div className="block lg:hidden mb-8 bg-gradient-to-br from-white to-gray-50 p-4 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <CourseList
                svg={<SvgLearning />}
                title="Khóa học đang học"
                courses={enrollCourse}
                layout="list"
                isProgress={isProgress}
              />
              {enrollCourse.length > 2 && (
                <div className="flex justify-center pt-3">
                  <Link
                    href="/profile/course?page=1"
                    className="group relative inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                  >
                    <span>Xem thêm</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>

                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Các danh sách khóa học khác */}
          <div className="space-y-8">
            <CourseList
              svg={<SvgHot size={40} />}
              title="Khóa học nổi bật"
              courses={data_hot}
              layout="grid"
              seeMoreLink="sort=hot&page=1&size=12"
            />
            <CourseList
              svg={<SvgNew size={45} />}
              title="Khóa học mới ra mắt"
              courses={data_newest}
              layout="grid"
              seeMoreLink="sort=newest&page=1&size=12"
            />
          </div>
        </div>




        {/* Cột phải - KHÓA HỌC ĐANG HỌC chỉ hiện desktop asdasd */}
        {enrollCourse.length > 0 && (
          <div className="hidden lg:flex lg:col-span-1 flex-col space-y-1 bg-gradient-to-br from-white to-gray-50 p-4 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            {/* Header với icon */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Khóa học đang học
              </h3>
            </div>

            {/* Course List Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-30"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-3 pt-1 border border-white/50 shadow-sm">
                <CourseList
                  title=""
                  courses={enrollCourse}
                  layout="list"
                  isProgress={isProgress}
                />
              </div>
            </div>

            {/* View More Button */}
            {enrollCourse.length > 2 && (
              <div className="flex justify-center pt-1">
                <Link
                  href="/profile/course?page=1"
                  className="group relative inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  <span>Xem thêm</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>

                </Link>
              </div>
            )}

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"></div>
            <div className="absolute bottom-6 left-4 w-1 h-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-40"></div>
          </div>
        )}





      </div>
    </div>
  );
};

export default HomeContent;
