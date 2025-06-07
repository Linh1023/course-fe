"use client"


import { Table, type Row } from "@tanstack/react-table"
// import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TrashIcon } from "lucide-react"
import { LoaderIcon } from "@/components/share/loading-icon"
import API from "@/api/api"
import { FetchServerDeleteApi } from "@/actions/server/fetch_server_api"
import React, { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


interface DeleteSubmissionsDialogProps
    extends React.ComponentPropsWithoutRef<typeof Dialog> {

    submission: SubmissionClientResponse;

    isOpen: boolean, // giá trị để biết để Dialog bật tắt
    setIsOpen: (v: boolean) => void, // cái này để Dialog nó set bật tắt
}

export function SubmissionCommentDialog(props: DeleteSubmissionsDialogProps) {

    const { submission, isOpen, setIsOpen } = props


    return (
        // thêm open={isOpen} và onOpenChange={setIsOpen}  để nó nhận được sự kiện đóng mở dialog
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-2xl w-full p-0 overflow-hidden">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-4 border-b">
                    <DialogHeader className="space-y-1">
                        <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Chi tiết bài nộp
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Thông tin chi tiết về bài làm và đánh giá
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-5">
                    {/* Course and Lesson Info */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-800 mb-1">Khóa học & Bài học</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    <span className="font-medium">{submission.courseName}</span>
                                    <span className="mx-2 text-gray-400">•</span>
                                    <span>{submission.lessonName}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Score Section */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-800 mb-1">Điểm số</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-green-600">
                                        {submission.score || (
                                            "Chưa có"
                                        )}
                                    </span>
                                    <span className="text-gray-500 text-sm">điểm</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-800 mb-3">Nhận xét từ giảng viên</h3>
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                        {submission.comment || (
                                            <span className="text-gray-500 italic">
                                                Chưa có nhận xét từ giảng viên
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 bg-gray-50 border-t">
                    <DialogClose asChild>
                        <Button variant="outline" className="px-6 py-2 hover:bg-white transition-colors">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Đóng
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
