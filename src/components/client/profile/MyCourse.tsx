'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LearningCourse from './LearningCourses';
import LearnedCourse from './LearnedCourses';

const tabs = [
  {
    name: 'Đang học',
    value: 'pnpm',
    count: 9,
  },
  {
    name: 'Đã học',
    value: 'npm',
    content: 'npx shadcn@latest add tabs',
  },
];


export default function MyCourse() {
  return (
    <Tabs defaultValue={tabs[0].value} className="max-w-5xl w-full">
      <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none gap-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <code className="text-[15px]">{tab.name}</code>{' '}
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
          {tab.value === 'pnpm' ? (
            <LearningCourse/>
          ) : (
            <LearnedCourse />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}