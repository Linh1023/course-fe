"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRef } from "react"
const LessonTabs = () => {

    const bottomRef = useRef<HTMLDivElement>(null)
    const handleScroll = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="content"
                        onClick={() => { handleScroll() }}
                    >Nội dung</TabsTrigger>
                    <TabsTrigger value="comment"
                        onClick={() => { handleScroll() }}
                    >Bình luận</TabsTrigger>
                    <TabsTrigger value="assignment"
                        onClick={() => { handleScroll() }}
                    >Bài tập</TabsTrigger>
                    <TabsTrigger value="submission"
                        onClick={() => { handleScroll() }}
                    >Nộp bài tập</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="mt-[25px]">
                    <div>
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

                <TabsContent value="comment" className="mt-[25px]">
                    Comment
                </TabsContent>

                <TabsContent value="assignment" className="mt-[25px]">
                    <span className="text-[16px] font-bold">Bài tập được giao</span> <br></br>
                
                </TabsContent>

                <TabsContent value="submission" className="mt-[25px]">
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