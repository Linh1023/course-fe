"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import CourseList from "../home/CourseList";
import { LoaderIcon } from "@/components/share/loading-icon";
import { useLoadingContext } from "@/context/loading_context";
import { FetchClientGetApiNoToken } from "@/actions/client/fetch_client_api";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext();
  const [research, setResearch] = useState<CourseCardResponse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSortChange = (sort: string) => {
    setIsLoading(true);

    const isSame = sortType === sort;
    const newSort = isSame ? "" : sort;
    setSortType(newSort);

    const params = new URLSearchParams(searchParams.toString());
    if (newSort) {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);

  };

  const handleCategorySelect = (id: string) => {
    setIsLoading(true);
    const isAlreadySelected = selectedCategory === id;
    const newSelected = isAlreadySelected ? "" : id;
    setSelectedCategory(newSelected);

    const params = new URLSearchParams(searchParams.toString());
    if (newSelected) {
      params.set("category", newSelected);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
    
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await FetchServerGetApiNoToken( `${API.CATEGORY.ROOT}?status=active`);
      if (res && res.status === 200) {
        setCategories(res.result);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const sortParam = searchParams.get("sort");
    const categoryParam = searchParams.get("category");
    const pageParam = parseInt(searchParams.get("page") || "0", 10);

    setSortType(sortParam || "");
    setSelectedCategory(categoryParam || "");
    setCurrentPage(pageParam);

    const fetch = async () => {
      setIsLoading(true);
      const res = await FetchClientGetApiNoToken(
        API.COURSE.COURSE_FILTER + `?${searchParams.toString()}&size=12`
      );
      if (res && res.status === 200) {
        setResearch(res.result);
        setTotalPages(res.totalPages);
      }
      setIsLoading(false);
      stopLoadingSpiner()
    };

    fetch();
  }, [searchParams]);

  return (
    <div className="p-4 h-full min-h-[55vh] mt-4 mb-8 flex flex-col lg:flex-row gap-6">
      {/* Main content */}
      <div className="w-full lg:w-4/5">
        {/* Bộ lọc và sắp xếp nằm trên cùng */}
        <div className="mb-4 space-y-2 lg:hidden">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-sm font-medium text-gray-600">Sắp xếp:</div>
            <button
              onClick={() => handleSortChange("newest")}
              className={`px-3 py-1 rounded-md border text-sm transition-all ${sortType === "newest"
                ? "bg-blue-100 text-blue-700 border-blue-500"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
            >
              Mới nhất
            </button>
            <button
              onClick={() => handleSortChange("hot")}
              className={`px-3 py-1 rounded-md border text-sm transition-all ${sortType === "hot"
                ? "bg-red-100 text-red-700 border-red-500"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
            >
              Hot
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="text-sm font-medium text-gray-600">Danh mục:</div>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`px-3 py-1 rounded-md border text-sm transition-all ${selectedCategory === category.id
                  ? "bg-red-100 text-red-600 border-red-500 font-semibold"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách khóa học */}
        <div className="space-y-8">
          {isLoading ? (
            <>
              <div className="flex justify-center items-center h-[200px]">
                <LoaderIcon className="size-5 animate-spin mr-2 text-blue-500" />
                <span className="text-sm text-gray-500">Đang tải dữ liệu...</span>
              </div>
            </>

          ) : research.length === 0 ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800">
                {`Kết quả tìm kiếm ${searchParams.get("keyword") != null ? `'${searchParams.get("keyword")}'` : ""}`}
              </h2>
              <div className="flex justify-center items-center h-[200px] text-gray-500 text-sm italic">
                Không có khóa học nào phù hợp với tìm kiếm của bạn.
              </div>

            </>

          ) : (
            <CourseList
              title={`Kết quả tìm kiếm ${searchParams.get("keyword") != null ? `'${searchParams.get("keyword")}'` : ""}`}
              courses={research}
              layout="grid"
            />
          )}

          {/* Phân trang */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => {

                  const params = new URLSearchParams(searchParams.toString());
                  params.set("page", (index+1).toString());

                  if (searchParams.toString() !== params.toString()) {
                    setIsLoading(true);
                  }
                  router.push(`/search?${params.toString()}`);

                }}
                className={`px-3 py-1 border rounded-md text-sm ${index+1 === currentPage
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar chỉ hiện trên desktop */}
      <nav className="hidden lg:block w-1/5 bg-white border border-gray-200 p-4 rounded-xl shadow-md sticky top-24 h-fit lg:h-full">
        <div className="flex items-center gap-3 flex-wrap pb-2">
          <div className="text-sm font-medium text-gray-600">Sắp xếp:</div>
          <button
            onClick={() => handleSortChange("newest")}
            className={`px-3 py-1 rounded-md border text-sm transition-all ${sortType === "newest"
              ? "bg-blue-100 text-blue-700 border-blue-500"
              : "text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            Mới nhất
          </button>
          <button
            onClick={() => handleSortChange("hot")}
            className={`px-3 py-1 rounded-md border text-sm transition-all ${sortType === "hot"
              ? "bg-red-100 text-red-700 border-red-500"
              : "text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            Hot
          </button>
        </div>
        <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
          Danh mục khóa học
        </h2>

        <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          {categories.map((category) => (
            <label
              key={category.id}
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all duration-150 ease-in-out ${selectedCategory === category.id
                ? "bg-red-100 text-red-600 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <input
                type="checkbox"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={() => handleCategorySelect(category.id)}
                className="form-radio text-red-500"
              />
              <span className="text-sm truncate">{category.name}</span>
            </label>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Search;
