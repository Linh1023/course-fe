"use client"

import { useLoadingContext } from "@/context/loading_context";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Progress } from "@/components/ui/progress"

const Loading = () => {
    const pathName = usePathname();
    const { isLoading, stopLoadingSpiner } = useLoadingContext();
    const [count, setCount] = useState<number>(0);


    useEffect(() => {
        stopLoadingSpiner()
        console.log("stop by pathname >>> ")
    }, [pathName])

    useEffect(() => {
        if (!isLoading) {
            setCount(0);
            return;
        }

        let i = 0;
        const interval = setInterval(() => {
            setCount(i);
            i++;
            if (i >= 98) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval); // cleanup khi isLoading đổi
    }, [isLoading]);

    return (
        <>
            {isLoading &&
                (
                    <>
                        <div id='loading-overlay'  >
                            <div className="w-[300px] max-w-[80%]">
                                <Progress value={count} />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default Loading;
