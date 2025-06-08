"use client"

import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ListVideo, BookOpenCheck, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentAccountContext } from "@/context/current_account_context";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const tabs = [
    {
        name: "Thông tin cá nhân",
        value: "profile",
        icon: User,
        link: "/profile"
    },
    {
        name: "Khóa học của tôi",
        value: "courses",
        icon: ListVideo,
        link: "/profile/course"
    },
    {
        name: "Bài tập của tôi",
        value: "assignment",
        icon: BookOpenCheck,
        link: "/profile/submission"
    },
];

export default function ProfileClientLayout({ children }: { children: React.ReactNode }) {
    const { currentAccount } = useCurrentAccountContext();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    // Determine active tab based on current path
    const getActiveTab = () => {
        if (pathname.includes('/course')) return 'courses';
        if (pathname.includes('/submission')) return 'assignment';
        return 'profile';
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return (
            <div className="max-w-md mx-auto bg-white min-h-screen">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
                    <button 
                        onClick={() => router.back()}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-semibold">Hồ sơ cá nhân</h1>
                    <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full">
                        <Share2 size={20} />
                    </button>
                </div>

                {/* Mobile Profile Section */}
                <div className="p-4 border-b bg-white">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            <img
                                src={currentAccount?.avatarUrl || "https://via.placeholder.com/64"}
                                alt={currentAccount?.name || "User Avatar"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                {currentAccount?.name || "User Name"}
                            </h2>
                            <p className="text-gray-600 text-sm">Học viên</p>
                        </div>
                    </div>
                </div>

                {/* Mobile Tab Navigation */}
                <div className="flex border-b bg-white sticky top-[73px] z-10">
                    {tabs.map((tab) => (
                        <Link 
                            href={tab.link} 
                            key={tab.value}
                            className="flex-1"
                        >
                            <button
                                className={`w-full py-3 px-2 text-xs font-medium transition-colors relative ${
                                    getActiveTab() === tab.value
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <tab.icon size={16} />
                                    <span className="text-[10px] leading-tight">{tab.name}</span>
                                </div>
                            </button>
                        </Link>
                    ))}
                </div>

                {/* Mobile Content */}
                <div className="flex-1 bg-gray-50">
                    {children}
                </div>
            </div>
        );
    }

    // Desktop Layout (original)
    return (
        <Tabs
            orientation="vertical"
            defaultValue={getActiveTab()}
            className="max-w-7xl w-full flex items-start gap-6"
        >
            <div>
                <div className="p-6 text-center border-b border-gray-200">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                        <img
                            src={currentAccount?.avatarUrl || "https://via.placeholder.com/150"}
                            alt={currentAccount?.name || "User Avatar"}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        {currentAccount?.name || "User Name"}
                    </h2>
                </div>

                <TabsList className="shrink-0 grid grid-cols-1 min-w-40 p-0 bg-background gap-4">
                    {tabs.map((tab) => (
                        <Link href={tab.link} key={tab.value}>
                            <TabsTrigger
                                value={tab.value}
                                className="w-full border-l-2 border-transparent justify-start rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary/5 py-1.5"
                            >
                                <tab.icon className="h-5 w-5 me-2" /> {tab.name}
                            </TabsTrigger>
                        </Link>
                    ))}
                </TabsList>
            </div>

            <div className="flex-1 p-6 min-h-[400px]">
                {children}
            </div>
        </Tabs>
    );
}
