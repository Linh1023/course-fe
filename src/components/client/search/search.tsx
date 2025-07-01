"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import CourseList from "../home/CourseList";
import { LoaderIcon } from "@/components/share/loading-icon";
import { useLoadingContext } from "@/context/loading_context";
import { FetchClientGetApiNoToken, FetchClientGetApiSignalNoToken } from "@/actions/client/fetch_client_api";
import { useDebounce } from "@/hooks/use-debounce";
import { updateQueryStringManually } from "@/utils/handle_query";
import { useQuerySearchClientContext } from "@/context/query_search_client_context";
import { SvgSearch } from "../share/svgSearch";

const Search = () => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams()
  const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext();
  const [research, setResearch] = useState<CourseCardResponse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(() => searchParams.get("category") ?? "");
  const [sortType, setSortType] = useState<string>(() => searchParams.get("sort") ?? "");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(() => parseInt(searchParams.get("page") || "1") ?? 1);
  const [nameSearch, setnameSearch] = useState<string>("")

  // const [isLoading, setIsLoading] = useState(false)
  const pathName = usePathname()
  const router = useRouter()
  const abortControllerRef = useRef<AbortController | null>(null); // Use ref to keep track of the controller
  // const [querySearch, setQuerySearch] = useState(() => searchParams.toString());
  const { querySearch, setQuerySearch, isLoading, setIsLoading } = useQuerySearchClientContext()



  const handleSortChange = (sort: string) => {
    setIsLoading(true);

    const isSame = sortType === sort;
    const newSort = isSame ? "" : sort;
    setSortType(newSort);

    if (newSort) {

      const newQuerySearchTemporary = updateQueryStringManually(querySearch, "sort", newSort)
      const newQuerySearch = updateQueryStringManually(newQuerySearchTemporary, "page", "1")
      if (newQuerySearch != querySearch) {
        setIsLoading(true);
        setQuerySearch(newQuerySearch);
      }
    } else {

      const newQuerySearchTemporary = updateQueryStringManually(querySearch, "sort")
      const newQuerySearch = updateQueryStringManually(newQuerySearchTemporary, "page", "1")
      if (newQuerySearch != querySearch) {
        setIsLoading(true);
        setQuerySearch(newQuerySearch)
      }
    }



  };

  const handleCategorySelect = (id: string) => {
    setIsLoading(true);
    const isAlreadySelected = selectedCategory === id;
    const newSelected = isAlreadySelected ? "" : id;
    setSelectedCategory(newSelected);

    if (newSelected) {
      const newQuerySearchTemporary = updateQueryStringManually(querySearch, "category", newSelected)
      const newQuerySearch = updateQueryStringManually(newQuerySearchTemporary, "page", "1")
      if (newQuerySearch != querySearch) {
        setIsLoading(true);
        setQuerySearch(newQuerySearch);
      }
    } else {
      const newQuerySearchTemporary = updateQueryStringManually(querySearch, "category")
      const newQuerySearch = updateQueryStringManually(newQuerySearchTemporary, "page", "1")
      if (newQuerySearch != querySearch) {
        setIsLoading(true);
        setQuerySearch(newQuerySearch)
      }

    }


  };

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await FetchClientGetApiNoToken(`${API.CATEGORY.ROOT}?status=active`);
      if (res && res.status === 200) {
        setCategories(res.result);
      }
    };
    fetchCategory();
  }, []);



  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams(querySearch);
    const keyword = params.get("keyword") ?? "";
    setnameSearch(keyword);

    const category = params.get("category") ?? "";
    setSelectedCategory(category);
    const sort = params.get("sort") ?? ""
    setSortType(sort)
    fetchData();
  }, [querySearch]);


  const fetchData = async () => {
    // Huỷ request cũ nếu còn
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const { signal } = abortController;

    try {
      const submissions = await FetchClientGetApiSignalNoToken(
        API.COURSE.COURSE_FILTER + `?${querySearch}&size=12`,
        signal
      );


      if (submissions?.status === 200) {
        setResearch(submissions.result);
        setTotalPages(submissions.totalPages);


        router.replace(`${pathName}?${querySearch}`, {
          scroll: false,
        });
      }

    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Yêu cầu bị huỷ, không làm gì cả
        return;
      } else {
        console.error('Lỗi khi fetch:', err);
      }
    } finally {
      // ✅ Luôn setIsLoading(false) nếu không bị huỷ
      if (!signal.aborted) {
        setIsLoading(false);
        stopLoadingSpiner()
      }
    }
  };






  return (
    <div className="p-4 h-full min-h-[55vh] mt-4 mb-8 flex flex-col lg:flex-row gap-6">
      {/* Main content */}


      {/* Bộ lọc và sắp xếp nằm trên cùng */}
      <div className="w-full lg:w-4/5">


        {/* <div className="mb-4 space-y-2 lg:hidden">
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
        </div> */}


        <div className="mb-6 space-y-4 lg:hidden">
          {/* Sort Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Sắp xếp</span>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleSortChange("newest")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${sortType === "newest"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  <span className="flex items-center gap-1">
                    ✨ Mới nhất
                  </span>
                </button>

                <button
                  onClick={() => handleSortChange("hot")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${sortType === "hot"
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-200"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  <span className="flex items-center gap-1">
                    🔥 Hot
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">Danh mục</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${selectedCategory === category.id
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <span className="flex items-center gap-1">
                      {selectedCategory === category.id && "✓ "}
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
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
                {`Kết quả tìm kiếm ${nameSearch != "" ? `'${nameSearch}'` : ""}`}
              </h2>
              <div className="flex justify-center items-center h-[200px] text-gray-500 text-sm italic">
                Không có khóa học nào phù hợp với tìm kiếm của bạn.
              </div>

            </>

          ) : (
            <CourseList
              svg={<SvgSearch size={45} />}
              title={`Kết quả tìm kiếm ${nameSearch != "" ? `'${nameSearch}'` : ""}`}
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

                  setCurrentPage(index + 1)
                  const newQuerySearch = updateQueryStringManually(querySearch, "page", (index + 1).toString())
                  if (newQuerySearch != querySearch) {
                    setIsLoading(true);
                    setQuerySearch(newQuerySearch)
                  }

                }}
                className={`px-3 py-1 border rounded-md text-sm ${index + 1 === currentPage
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
      {/* <nav className="hidden lg:block w-1/5 bg-white border border-gray-200 p-4 rounded-xl shadow-md sticky top-24 h-fit lg:h-full">
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
      </nav> */}


      <nav className="hidden lg:block w-1/5 bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm sticky top-24 h-fit lg:h-full transition-all duration-300 hover:shadow-xl">
        {/* Sort Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <div className="text-sm font-semibold text-gray-700 tracking-wide">Sắp xếp</div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleSortChange("newest")}
              className={`group relative px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 transform hover:scale-105 ${sortType === "newest"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                : "text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800"
                }`}
            >
              <span className="relative z-10">Mới nhất</span>
              {sortType === "newest" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-40 transition-opacity"></div>
              )}
            </button>

            <button
              onClick={() => handleSortChange("hot")}
              className={`group relative px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 transform hover:scale-105 ${sortType === "hot"
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-500 shadow-lg shadow-red-500/25"
                : "text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800"
                }`}
            >
              <span className="relative z-10">🔥 Hot</span>
              {sortType === "hot" && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl blur opacity-30 group-hover:opacity-40 transition-opacity"></div>
              )}
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-800 tracking-wide">
              Danh mục khóa học
            </h2>
          </div>

          <div className="relative">
            {/* Gradient overlay for scroll indication */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

            <div className="space-y-2 pr-2">
              {categories.map((category, index) => (
                <label
                  key={category.id}
                  className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${selectedCategory === category.id
                    ? "bg-gradient-to-r from-red-50 to-pink-50 text-red-600 font-semibold border border-red-200 shadow-md"
                    : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 text-gray-700 border border-transparent hover:border-gray-200"
                    }`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={() => handleCategorySelect(category.id)}
                      className={`form-radio w-4 h-4 transition-all duration-200 ${selectedCategory === category.id
                        ? "text-red-500 ring-red-500 ring-offset-2"
                        : "text-gray-400 hover:text-red-400"
                        }`}
                    />
                    {selectedCategory === category.id && (
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                    )}
                  </div>

                  <span className="text-sm  flex-1 group-hover:text-gray-800 transition-colors line-clamp-2">
                    {category.name}
                  </span>

                  {selectedCategory === category.id && (
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-full opacity-20 blur-lg"></div>
      </nav>





    </div>
  );
};

export default Search;
