"use client";

import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { LoaderIcon } from "@/components/share/loading-icon";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

interface CreateCourseEnrollmentItemProps {
  endpointType: string;
  placeholder: string;
  onSelect: (item: any) => void;
  displayField: string;
}

export function CreateCourseEnrollmentItem({
  endpointType,
  placeholder,
  onSelect,
  displayField,
}: CreateCourseEnrollmentItemProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (hasSelected || query.trim() === "") {
      setResults([]);
      setShowSuggestions(false);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        let endpoint;
        console.log(endpointType == "accountId");
        if (endpointType == "accountId")
          endpoint = `${API.ACCOUNT.ROOT}?keyword=${encodeURIComponent(
            query
          )}&username=${encodeURIComponent(query)}&page=1&size=5`;
        else
          endpoint = `${API.COURSE.COURSE_FILTER}?name=${encodeURIComponent(
            query
          )}&page=1&size=5`;
        const data = await FetchServerGetApi(endpoint);

        console.log(endpoint);

        setResults(data.result ?? []);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Lỗi tìm kiếm", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query, endpointType]);

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setHasSelected(false);
        }}
        autoComplete="off"
      />
      <div className="absolute z-[10000] w-full top-full left-0 bg-white shadow-lg rounded-md  overflow-y-auto mt-1">
        {showSuggestions && results.length > 0 && (
          <ul className="mt-1 max-h-60 overflow-y-auto rounded-md border bg-white dark:bg-black  shadow">
            {results.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  setQuery(item[displayField]);
                  setShowSuggestions(false);
                  setHasSelected(true);
                }}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-600"
              >
                {item[displayField]}
              </li>
            ))}
          </ul>
        )}
        {loading && (
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500">
            <LoaderIcon className="animate-spin size-4" />
            Đang tìm kiếm...
          </div>
        )}
      </div>
    </div>
  );
}
