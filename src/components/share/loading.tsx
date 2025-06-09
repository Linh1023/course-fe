"use client"

import { useLoadingContext } from "@/context/loading_context";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Progress } from "@/components/ui/progress"
import { LoaderIcon } from "./loading-icon";

const Loading = () => {
    const pathName = usePathname();
    const { isLoading, stopLoadingSpiner } = useLoadingContext();
    const [count, setCount] = useState<number>(0);


    useEffect(() => {
        stopLoadingSpiner()

    }, [pathName])


    return (
        <>
            {isLoading &&
                (
                    <>
                        <div id='loading-overlay'  >
                            <LoaderIcon
                                className="mr-1.5 size-10 animate-spin text-[#fe4444]"
                                aria-hidden="true"
                            ></LoaderIcon>

                        </div>
                    </>
                )
            }
        </>
    );
};

export default Loading;
