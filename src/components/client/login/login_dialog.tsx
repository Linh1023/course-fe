"use client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"


import LoginForm from "./login_form"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useLoadingContext } from "@/context/loading_context"

interface LoginDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  redirectUrl?: string
}
export function LoginDialog({ open, setOpen, redirectUrl }: LoginDialogProps) {
  const { stopLoadingSpiner } = useLoadingContext()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-3xl py-10">
        <LoginForm redirectUrl={redirectUrl} onSuccess={() => {
          stopLoadingSpiner();
          setOpen(false);
        }} />
      </DialogContent>
    </Dialog >
  )
}
