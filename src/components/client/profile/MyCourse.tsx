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
    count: 0, // Có thể cập nhật động
  },
];

export default function MyCourse({ coursePromise }: MyCourseProps) {
  return (
    <Tabs defaultValue={tabs[0].value} className="max-w-5xl w-full">
      <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none gap-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <code className="text-[15px]">{tab.name}</code>{" "}
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