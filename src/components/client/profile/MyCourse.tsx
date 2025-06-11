"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LearningCourses from "./LearningCourses";
import { MyCourseResponse } from "@/types/response/account/my_course";

interface MyCourseProps {
  coursePromise: Promise<MyCourseResponse>;
}

const tabs = [
  {
    name: "Đang học",
    value: "inProgress",
    count: 0,
  },
];

export default function MyCourse({ coursePromise }: MyCourseProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const debounceCheckMobile = debounce(checkMobile, 200);
    checkMobile();
    window.addEventListener('resize', debounceCheckMobile);
    return () => window.removeEventListener('resize', debounceCheckMobile);
  }, []);

  // Hàm debounce với kiểu chính xác
  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  if (isMobile) {
    return (
      <div className="bg-white">
        {/* Mobile Header */}
        <div className="p-4 border-b">
          <h1 className="text-lg font-semibold text-gray-900">Khóa học của tôi</h1>
        </div>

        {/* Mobile Tab */}
        <div className="border-b">
          <div className="px-4">
            <button className="py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Đang học
            </button>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4">
          <LearningCourses coursePromise={coursePromise} />
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue={tabs[0].value} className="max-w-5xl w-full">
      <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none gap-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <code className="text-[15px]">{tab.name}</code>
            {tab.count ? (
              <span className="ml-1 inline-flex items-center justify-center h-4 px-2 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                {tab.count}
              </span>
            ) : null}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          <LearningCourses coursePromise={coursePromise} />
        </TabsContent>
      ))}
    </Tabs>
  );
}