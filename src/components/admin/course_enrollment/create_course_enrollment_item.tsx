"use client";

import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import { LoaderIcon } from "@/components/share/loading-icon";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

interface CreateCourseEnrollmentItemProps {
  apiEndpoint: string;
  placeholder: string;
  onSelect: (item: any) => void;
  displayField: string;
}

export function CreateCourseEnrollmentItem({
  apiEndpoint,
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
    if (query.trim() === "") {
      setResults([]);
      setShowSuggestions(false);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await FetchServerGetApi(
          `${apiEndpoint}?keyword=${encodeURIComponent(query)}&page=1&size=5`
        );
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
  }, [query, apiEndpoint]);

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      <div className="absolute z-[10000] w-full">
        {showSuggestions && results.length > 0 && (
          <ul className="mt-1 max-h-60 overflow-y-auto rounded-md border bg-white dark:bg-black  shadow">
            {results.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  setQuery(item[displayField]);
                  setShowSuggestions(false);
                }}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-600"
              >
                {item[displayField]}
              </li>
            ))}
          </ul>
        )}
        {loading && (
          <div className="w-full flex justify-center">
            <LoaderIcon
              className="mr-1.5 size-9 animate-spin"
              aria-hidden="true"
            ></LoaderIcon>
          </div>
        )}
      </div>
    </div>
  );
}
