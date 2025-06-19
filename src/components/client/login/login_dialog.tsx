"use client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"


import LoginForm from "./login_form"
import { DialogTitle } from "@radix-ui/react-dialog"

interface LoginDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  redirectUrl?: string
}
export function LoginDialog({ open, setOpen, redirectUrl }: LoginDialogProps) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-3xl py-10">
        <LoginForm redirectUrl={redirectUrl} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog >
  )
}
