"use client"

import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ListVideo, BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentAccountContext } from "@/context/current_account_context";
import Link from "next/link";

const tabs = [
    {
        name: "Thông tin cá nhân",
        value: "profile",
        icon: User,
        link:"/profile"
    },
    {
        name: "Khóa học của tôi",
        value: "courses",
        icon: ListVideo,
        link:"/profile/course"
    },
    {
        name: "Bài tập của tôi",
        value: "assignment",
        icon: BookOpenCheck,
        link:"/profile/submission"
    },
];


export default function ProfileClientLayout({ children }: { children: React.ReactNode }) {



    const {currentAccount} =useCurrentAccountContext()

    return (

        <Tabs
            orientation="vertical"
            defaultValue={tabs[0].value}
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
                    {/* <Button variant="outline" size="sm" className="gap-2">
                        <Share2 size={16} />
                        Share Profile
                    </Button> */}
                </div>

                <TabsList className="shrink-0 grid grid-cols-1 min-w-40 p-0 bg-background gap-4">
                    {tabs.map((tab) => (
                        <Link href={tab.link} key={tab.value}>
                            <TabsTrigger
                                
                                value={tab.value}
                                className="border-l-2 border-transparent justify-start rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary/5 py-1.5"
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