'use client'
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Home, Settings, Share2, User, ListVideo } from "lucide-react";
import CoursesGrid from "./CourseGrid";
import MyCourse from './MyCourse';
import { Button } from "@/components/ui/button";
import MyInformation from "./MyInformation";
import { useCurrentAccountContext } from "@/context/current_account_context";
import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";

const tabs = [
    {
        name: "Thông tin cá nhân",
        value: "profile",
        icon: User,
    },
    {
        name: "Khóa học của tôi",
        value: "courses",
        icon: ListVideo,
       
    },
];


export default function VerticalLeftBorderedTabsDemo() {
     const [profile, setProfile] = useState<CurrentProfile | null>(null);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await FetchServerGetApi(API.PROFILE.CURRENT_PROFILE);
        if (response && response.status === 200) {
          setProfile(response.result);
        } else {
          setError('Failed to fetch profile');
        }
      } catch (err) {
        setError('Error fetching profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                            src={profile?.avatarUrl || "https://via.placeholder.com/150"}
                            alt={profile?.name || "User Avatar"}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        {profile?.name || "User Name"}
                    </h2>
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
                        {tab.value === 'profile' ? (
                            <MyInformation  currentProfile = {profile}/>
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
