// "use client"

// import * as React from "react"
// import { type Row } from "@tanstack/react-table"
// // import { toast } from "sonner"

// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { TrashIcon } from "lucide-react"
// import { LoaderIcon } from "@/components/share/loading-icon"
// import API from "@/api/api"
// import { FetchServerDeleteApi } from "@/actions/server/fetch_server_api"


// interface DeleteCESDialogProps
//   extends React.ComponentPropsWithoutRef<typeof Dialog> {
//   ces: Row<CourseEnrollmentAdmin>["original"][]
//   showTrigger?: boolean
//   onSuccess?: () => void
// }

// export function DeleteCESDialog({
//   ces,
//   showTrigger = true,
//   onSuccess,
//   ...props
// }: DeleteCESDialogProps) {
//   const [isDeletePending, startDeleteTransition] = React.useTransition()
//   return (
//     <Dialog {...props}>
//       {showTrigger ? (
//         <DialogTrigger asChild>
//           <Button variant="outline" size="sm">
//             <TrashIcon className="mr-2 size-4" aria-hidden="true" />
//             Delete ({ces.length})
//           </Button>
//         </DialogTrigger>
//       ) : null}
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Bạn có muốn xóa?</DialogTitle>
//           <DialogDescription>
//             <>
//               Hành động này sẽ không được hoàn tác. Điều này sẽ xóa{" "}
//               <span className="font-medium">{ces.length}</span> danh mục của bạn.
//             </>
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter className="gap-2 sm:space-x-0">
//           <DialogClose asChild>
//             <Button variant="outline">Hủy</Button>
//           </DialogClose>
//           <Button
//             aria-label="Delete selected rows"
//             variant="destructive"
//             onClick={() => {
//               startDeleteTransition(async () => {
//                 // thực hiện xóa danh mục
//                 await Promise.all(
//                   ces.map((ce) =>
//                     FetchServerDeleteApi(`${API.CATEGORY.ROOT}/${ce.id}`, "/admin/ce")
//                   ))
//                 props.onOpenChange?.(false)
//                 onSuccess?.()
//               })
//             }}
//             disabled={isDeletePending}
//           >
//             {isDeletePending && (
//               <LoaderIcon
//                 className="mr-1.5 size-4 animate-spin"
//                 aria-hidden="true"
//               />
//             )}
//             Xóa
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
