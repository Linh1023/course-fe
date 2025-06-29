"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LearningCourses from "./LearningCourses";
import PendingCourses from "./PendingCourse";
import { MyCourseResponse } from "@/types/response/account/my_course";


const tabs = [
  {
    name: "Đang học",
    value: "inProgress",
    count: 0,
  },
  {
    name: "Khóa học đang chờ duyệt",
    value: "pending",
    count: 0,
  },
];

export default function MyCourse() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("inProgress");

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="bg-white">
        {/* Mobile Header */}
        <div className="p-4 border-b">
          <h1 className="text-lg font-semibold text-gray-900">Khóa học của tôi</h1>
        </div>

        {/* Mobile Tab */}
        <div className="border-b">
          <div className="px-4 flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.value
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent"
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4">
          {activeTab === "inProgress" ? <LearningCourses /> : <PendingCourses />}
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
            <code className="text-[15px] font-mono">{tab.name}</code>
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
          {tab.value === 'inProgress' ? <LearningCourses /> : <PendingCourses />}
        </TabsContent>
      ))}
    </Tabs>
  );
}