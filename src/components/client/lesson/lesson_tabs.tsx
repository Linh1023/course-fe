"use client"
import { FetchServerGetApi, FetchServerGetApiBlob, FetchServerPostApi, FetchServerPostApiNoJsonBody } from "@/actions/server/fetch_server_api"
import API from "@/api/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLoadingContext } from "@/context/loading_context"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import CommentSection from "./comment_lesson_section"
import { usePathname } from "next/navigation"

import CommentLessonSection from "./comment_lesson_section"
import { LoaderIcon } from "@/components/share/loading-icon"
import { UploadedFilePreview } from "@/components/share/upload-file-preview"
import { FetchClientGetApiBlob } from "@/actions/client/fetch_client_api"
import { getMimeType } from "@/utils/getMimeType"
interface Props {
    lessonResponse: LessonClientDetailResponse

}

const LessonTabs = (props: Props) => {
    const { lessonResponse } = props
    const [file, setFile] = useState<File | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null)
    const [isEmptyInputSubmiss, setIsEmptyInputSubmiss] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(lessonResponse.submissionUrl ? true : false)
    const [isLoadingSubmitted, setIsLoadingSubmitted] = useState(false)

    const [previewSubmisison, setPreviewSubmission] = useState<{ url: string; name: string } | null>({url : lessonResponse.submissionUrl, name: lessonResponse.submissionUrl})


    const pathName = usePathname()
    const parts = pathName.split('/');
    const currentLessonId = parts[2];




    const handleScroll = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

 


    const uploadDocuments = async (file: any) => {
        const formData = new FormData();
        formData.append("file", file); // key phải đúng là "file"


        const res = await FetchServerPostApiNoJsonBody(API.DOCUMENT.UP_LOAD, formData)
        if (res && res.status === 200) {
            return res.result
        } else {
            return null
        }
    }

    const handleSubmission = async () => {
        if (file) {
            setIsLoadingSubmitted(true)



            const dataDocument = await uploadDocuments(file)
            if (dataDocument === null) {
                toast.error("Nộp bài thất bại vui lòng thử lại sau")
                return
            }
   
            const req: SubmissionClientRequest = {
                lessonId: lessonResponse.id,
                submissionUrl: dataDocument
            }

            const res = await FetchServerPostApi(API.SUBMISSON.SUBMISSION, req);
            if (res && res.status === 200) {
                toast.success("Nộp bài thành công")
                setIsSubmitted(true)
                // await fetch(dataDocument)
          

            } else {
                toast.error("Lỗi")
            }

            setIsLoadingSubmitted(false)
        } else {
            setIsEmptyInputSubmiss(true)
        }

    }


    const handleFileChange = async (event: any) => {
        const file = event.target.files?.[0];

        setFile(file)
        const url = URL.createObjectURL(file)
        setPreviewSubmission({
            url: url,
            name: file.name,
        })
        setIsEmptyInputSubmiss(false)
    }

    return (
        <>
            <Tabs defaultValue="content" className="w-full min-h-[500px]">
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
                        lessonResponse.assignmentUrl && (<>
                            <TabsTrigger value="submission"
                                className="data-[state=active]:bg-[#fe4444] data-[state=active]:text-white text-black"
                                onClick={() => { handleScroll() }}
                            >Bài tập</TabsTrigger>
                        </>)
                    }

                </TabsList>
                <TabsContent value="content" className=" bg-[#f1f5f9] p-4 rounded-md">
                    <div >
                        {lessonResponse.documentUrl && (<>
                            <div>
                                <span className="text-[16px] font-bold">Tài liệu của bài học : </span>
                                <UploadedFilePreview
                                    fileUrl={""}
                                    fileName={lessonResponse.documentUrl}
                                />
                            </div>
                        </>)}


                        <div className="mb-[20px]">
                            <span >{lessonResponse.detail}</span> <br />
                        </div>


                        <span className="font-bold"> Để  mua thêm khóa học vui lòng liên hệ  :</span>
                        <ul className="list-disc ms-9">
                            <li className="mt-[25px] break-words">
                                Facebook :
                                <a href="https://www.facebook.com/tran.cuong.737360" target="_blank"
                                    className="text-blue-600 underline hover:text-blue-800"
                                > https://www.facebook.com/tran.cuong.737360</a>
                            </li>
                            <li>
                                Zalo :
                                <a href="https://zalo.me/0865275183"
                                    target="_blank" className="mt-[20px] text-blue-600 underline hover:text-blue-800"> 0865 275 183</a>
                            </li>

                        </ul>
                    </div>
                </TabsContent>

                <TabsContent value="comment" className=" bg-[#f1f5f9] p-4 rounded-md">
                    <CommentLessonSection lessonId={lessonResponse.id} />
                </TabsContent>

                {lessonResponse.assignmentUrl && (
                    <>
                        <TabsContent value="submission" className=" bg-[#f1f5f9] p-4 rounded-md">
                            <div >
                                <span className="text-[16px] font-bold">Bài tập của bài học</span>

                                <div className="mt-[10px]">
                                    {/* <span>{lessonResponse.assignmentUrl}</span> <br /> */}
                                    {
                                        <UploadedFilePreview
                                            fileUrl={""}
                                            fileName={lessonResponse.assignmentUrl}
                                        />
                                    }
                                </div>
                            </div>

                            <DropdownMenuSeparator className="mt-[10px] mb-[10px] bg-gray-200 h-[1px]" />

                            <div className="flex  justify-center">
                                <span className="text-[16px] font-bold">Nộp bài tập</span>
                            </div>



                            {(isSubmitted ) ? (
                                <>
                                    {
                                        previewSubmisison && (<>
                                            <UploadedFilePreview
                                                fileUrl={previewSubmisison.url}
                                                fileName={previewSubmisison.name}
                                            />
                                        </>)
                                    }
                                    <span className="text-green-600 font-bold flex items-center"> <Check className="mr-[10px]" /> Đã nộp bài tập</span>
                                </>
                            ) : (<>
                                <Input
                                    placeholder="Nộp bài tập" className="mt-[20px] h-[80px]" type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => { handleFileChange(e); }}
                                    disabled={isLoadingSubmitted}
                                />
                            </>)}

                            {isEmptyInputSubmiss && (
                                <>
                                    <span className="text-red-500 font-bold">Vui lòng chọn file để nộp bài</span>
                                </>
                            )}

                            {isSubmitted === false  && (

                                <div className="flex  justify-center">

                                    <Button className="mt-[20px] bg-[#fe4444] hover:bg-[#f87171]"
                                        onClick={() => { handleSubmission() }}
                                        disabled={isLoadingSubmitted}
                                    >
                                        {isLoadingSubmitted && (
                                            <LoaderIcon
                                                className="mr-1.5 size-4 animate-spin"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Nộp bài

                                    </Button>

                                </div>


                            )}



                        </TabsContent>
                    </>
                )}

            </Tabs>
            <div ref={bottomRef} />
        </>

    )

}

export default LessonTabs