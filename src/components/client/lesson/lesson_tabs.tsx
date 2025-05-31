"use client"
import { FetchServerPostApi } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLoadingContext } from "@/context/loading_context"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
interface Props {
    lessonResponse: LessonClientDetailResponse
}

const LessonTabs = (props: Props) => {
    const { lessonResponse } = props
    const [file, setFile] = useState<File | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null)
    const [isEmptyInputSubmiss, setIsEmptyInputSubmiss] = useState(false)
    const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext()
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleScroll = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        console.log("submission url >>> ", lessonResponse)
        if (lessonResponse.submissionUrl != null)
        {
            setIsSubmitted(true)
        }
    }, [])


    const handleSubmission = async () => {
        if (file) {
            startLoadingSpiner()
            const req: SubmissionClientRequest = {
                lessonId: lessonResponse.id,
                submissionUrl: "https://url"
            }

            const res = await FetchServerPostApi(API.SUBMISSON.SUBMISSION, req);
            if (res && res.status === 200) {
                toast.success("Nộp bài thành công")
                setIsSubmitted(true)
            } else {
                toast.error("Lỗi")
            }

            stopLoadingSpiner()
        } else {
            setIsEmptyInputSubmiss(true)
        }

    }


    const handleFileChange = async (event: any) => {
        const file = event.target.files?.[0];

        setFile(file)
        setIsEmptyInputSubmiss(false)
    }

    return (
        <>
            <Tabs defaultValue="content" className="w-full">
                <TabsList className={`grid w-full 
                    ${lessonResponse.assignmentUrl === null ? `grid-cols-2` : `grid-cols-3`}`}>

                    <TabsTrigger value="content"
                        className="data-[state=active]:bg-[#fe4444] data-[state=active]:text-white text-black "
                        onClick={() => { handleScroll() }}
                    >Nội dung</TabsTrigger>
                    <TabsTrigger value="comment"
                        className="data-[state=active]:bg-[#fe4444] data-[state=active]:text-white text-black"
                        onClick={() => { handleScroll() }}
                    >Bình luận</TabsTrigger>
                    {/* <TabsTrigger value="assignment"
                        className="data-[state=active]:bg-[#fe4444] data-[state=active]:text-white text-black"
                        onClick={() => { handleScroll() }}
                    >Bài tập</TabsTrigger> */}

                    {
                        lessonResponse.assignmentUrl !== null && (<>
                            <TabsTrigger value="submission"
                                className="data-[state=active]:bg-[#fe4444] data-[state=active]:text-white text-black"
                                onClick={() => { handleScroll() }}
                            >Bài tập</TabsTrigger>
                        </>)
                    }



                </TabsList>
                <TabsContent value="content" className=" bg-[#f1f5f9] p-4 rounded-md">
                    <div >
                        <div className="mb-[20px]">

                            <span >{lessonResponse.detail}</span> <br />
                        </div>


                        <span className="font-bold"> Để  mua thêm khóa học vui lòng liên hệ  :</span>
                        <ul className="list-disc ms-9">
                            <li className="mt-[25px] break-words">
                                Facebook :
                                <a href="https://www.facebook.com/tran.cuong.737360"
                                    className="text-blue-600 underline hover:text-blue-800"
                                > https://www.facebook.com/tran.cuong.737360</a>
                            </li>
                            <li className="mt-[20px]">Zalo : 0963717300</li>
                        </ul>
                    </div>
                </TabsContent>

                <TabsContent value="comment" className=" bg-[#f1f5f9] p-4 rounded-md">
                    <span className="text-[16px] font-bold">Comment</span>
                </TabsContent>

                {/* <TabsContent value="assignment" className=" bg-[#f1f5f9] p-4 rounded-md">
                    <span className="text-[16px] font-bold">Bài tập được giao</span>
                    <br />
                    <span>{lessonResponse.assignmentUrl}</span>
                </TabsContent> */}

                <TabsContent value="submission" className=" bg-[#f1f5f9] p-4 rounded-md">
                    <div >
                        <span className="text-[16px] font-bold">Bài tập của bài học</span>

                        <div className="mt-[10px]">
                            <span>{lessonResponse.assignmentUrl}</span> <br />
                        </div>
                    </div>

                    <DropdownMenuSeparator className="mt-[10px] mb-[10px] bg-gray-200 h-[1px]" />

                    <div className="flex  justify-center">
                        <span className="text-[16px] font-bold">Nộp bài tập</span>
                    </div>

                    <Input
                        placeholder="Nộp bài tập" className="mt-[20px] h-[80px]" type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => { handleFileChange(e); }}
                        disabled={isSubmitted === true}

                    />
                    { isSubmitted&& (
                        <>
                            <span className="text-green-600 font-bold flex items-center"> <Check className="mr-[10px]" /> Đã nộp bài tập</span>
                        </>
                    )}

                    {isEmptyInputSubmiss && (
                        <>
                            <span className="text-red-500 font-bold">Vui lòng chọn file để nộp bài</span>
                        </>
                    )}

                    {isSubmitted === false && (
                        <>

                            <div className="flex  justify-center">
                                <Button className="mt-[20px] bg-[#fe4444] hover:bg-[#f87171]"
                                    onClick={() => { handleSubmission() }}

                                >Nộp bài</Button>
                            </div>
                        </>
                    )}



                </TabsContent>
            </Tabs>
            <div ref={bottomRef} />
        </>

    )

}

export default LessonTabs