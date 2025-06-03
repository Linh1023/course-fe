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
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


interface DeleteSubmissionsDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  submissions: Row<SubmissionAdminResponse>["original"][] // dữ liệu submission đã chọn
  hanldeDeletedSuccess: () => void
  isOpen: boolean, // giá trị để biết để Dialog bật tắt
  setIsOpen: (v: boolean) => void, // cái này để Dialog nó set bật tắt
  showTrigger?: boolean
}

export function DeleteSubmissionsDialog(props: DeleteSubmissionsDialogProps) {

  const { submissions, isOpen, setIsOpen, hanldeDeletedSuccess, showTrigger } = props

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleDeteledSubmissions = async () => {
    setIsLoading(true)
    // await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("submissions >>> ", submissions)

    for (const submission of submissions) {
      console.log(submission.id);
      await FetchServerDeleteApi(`${API.SUBMISSON.SUBMISSION}/${submission.id}`)
    }
    router.refresh();

    //  thanh cong
      setIsOpen(false)
    
    setIsLoading(false)
    hanldeDeletedSuccess()
  }


  return (
    // thêm open={isOpen} và onOpenChange={setIsOpen}  để nó nhận được sự kiện đóng mở dialog
    <Dialog open={isOpen} onOpenChange={setIsOpen}  >
      
      {showTrigger && (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Xóa ({submissions.length})
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có muốn xóa?</DialogTitle>
          <DialogDescription>
            <>
              Hành động này sẽ không được hoàn tác. Điều này sẽ xóa{" "}
              <span className="font-medium">{submissions.length}</span> bài nộp của học viên.
            </>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={() => {
              handleDeteledSubmissions()
            }}
            disabled={isLoading}
          >
            {isLoading && (
              <LoaderIcon
                className="mr-1.5 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
