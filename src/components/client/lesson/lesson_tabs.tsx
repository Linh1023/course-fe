"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRef } from "react"
interface Props {
    lessonResponse:LessonClientDetailResponse
}

const LessonTabs = (props: Props) => {
    const { lessonResponse } = props

    const bottomRef = useRef<HTMLDivElement>(null)
    const handleScroll = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="content"
                        className="data-[state=active]:bg-[#fe4444] data-[state=active]:text-white text-black "
                        onClick={() => { handleScroll() }}
                    >Nội dung</TabsTrigger>
                    <TabsTrigger value="comment"
                        className="data-[state=active]:bg-[#fe4444] data-[state=active]:text-white text-black"
                        onClick={() => { handleScroll() }}
                    >Bình luận</TabsTrigger>
                    <TabsTrigger value="assignment"
                        className="data-[state=active]:bg-[#fe4444] data-[state=active]:text-white text-black"
                        onClick={() => { handleScroll() }}
                    >Bài tập</TabsTrigger>
                    <TabsTrigger value="submission"
                        className="data-[state=active]:bg-[#fe4444] data-[state=active]:text-white text-black"
                        onClick={() => { handleScroll() }}
                    >Nộp bài tập</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className=" bg-[#f1f5f9] p-4 rounded-md">
                    <div >
                        <span >{lessonResponse.detail}</span> <br />
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

                <TabsContent value="assignment" className=" bg-[#f1f5f9] p-4 rounded-md">
                    <span className="text-[16px] font-bold">Bài tập được giao</span>
                    <br />
                    <span>{lessonResponse.assignmentUrl}</span>
                </TabsContent>

                <TabsContent value="submission" className=" bg-[#f1f5f9] p-4 rounded-md">
                    <span className="text-[16px] font-bold">Nộp bài tập</span>
                    <Input placeholder="Nộp bài tập" className="mt-[20px] h-[80px]" type="file" />
                    <div className="flex  justify-center">
                        <Button className="mt-[20px] bg-[#fe4444] hover:bg-[#f87171]">Nộp bài</Button>
                    </div>
                </TabsContent>
            </Tabs>
            <div ref={bottomRef} />
        </>

    )

}

export default LessonTabs