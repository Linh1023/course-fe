'use client'
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Home, Settings, Share2, User } from "lucide-react";
import CoursesGrid from "./CourseGrid";
import MyCourse from './MyCourse';
import { Button } from "@/components/ui/button";
const tabs = [
    {
        name: "Home",
        value: "home",
        icon: Home,
    },
    {
        name: "Profile",
        value: "profile",
        icon: User,
    },
];
// Course type definition
type Course = {
    id: string;
    title: string;
    instructor: string;
    ratings: number;
    image: string;
};

// Mock courses data
const mockCourses: Course[] = [
    {
        id: "1",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "2",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "3",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "4",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "5",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    },
    {
        id: "6",
        title: "Beginner's Guide to Design",
        instructor: "Ronald Richards",
        ratings: 1200,
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop"
    }
];

export default function VerticalLeftBorderedTabsDemo() {
    return (

        <Tabs
            orientation="vertical"
            defaultValue={tabs[0].value}
            className="max-w-5xl w-full flex items-start gap-6"
        >
            <div>
                <div className="p-6 text-center border-b border-gray-200">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                            alt="John Doe"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">Loc Shadow</h2>
                    <Button variant="outline" size="sm" className="gap-2">
                        <Share2 size={16} />
                        Share Profile
                    </Button>
                </div>

                <TabsList className="shrink-0 grid grid-cols-1 min-w-40 p-0 bg-background">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="border-l-2 border-transparent justify-start rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary/5 py-1.5"
                        >
                            <tab.icon className="h-5 w-5 me-2" /> {tab.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            <div className="flex-1 p-6 min-h-[400px]">
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="w-full">
                        {tab.value === 'home' ? (
                            <CoursesGrid courses={mockCourses} />
                        ) : (
                            <div>
                                <MyCourse />
                            </div>
                        )}
                    </TabsContent>
                ))}
            </div>
        </Tabs>
    );
}
