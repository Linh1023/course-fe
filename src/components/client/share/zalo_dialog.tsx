"use client"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
    isShowZaloDialog: boolean
    setIsShowZaloDialog: (v: boolean) => void
}


const ZaloDialog = (props: Props) => {
    const { isShowZaloDialog, setIsShowZaloDialog } = props
    return (
        <>
            <Dialog open={isShowZaloDialog} onOpenChange={setIsShowZaloDialog} >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>QR code Zalo</DialogTitle>
                        <DialogDescription>
                            Quét mã QR để chat qua Zalo
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center">

                        <img src="https://res.cloudinary.com/moment-images/cuongzalo_rnilyh" className="w-[315px] h-[450px]" alt="qrcodezalo" />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Đóng</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ZaloDialog

