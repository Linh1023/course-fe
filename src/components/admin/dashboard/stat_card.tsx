"use client"

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
    stat: StatCardProps
}

const StatCard = (prop: Props) => {
    const { stat } = prop

    let { theme } = useTheme()
    theme = theme === "system" ? "dark" :theme

    return (
        <>
            <Link href={`${stat.link}`} >
                <div className={`flex items-center gap-4 p-6 ${theme === "dark" ? "bg-black" : "bg-gray-200"}  rounded-xl shadow-sm   hover:shadow-md transition-shadow duration-200`}
                >
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        {stat.icon}
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-2xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-900"} `}>{stat.count}</span>
                        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}  `}>{stat.label}</span>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default StatCard