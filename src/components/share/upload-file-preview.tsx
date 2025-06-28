import { FetchClientGetApiBlob } from "@/actions/client/fetch_client_api"
import API from "@/api/api"
import { getMimeType } from "@/utils/getMimeType"
import { FileTextIcon, FileIcon } from "lucide-react"
import { toast } from "sonner"

interface UploadedFilePreviewProps {
  fileUrl: string
  fileName: string
}

export function UploadedFilePreview({ fileUrl, fileName }: UploadedFilePreviewProps) {
  const isBlob = fileUrl.startsWith("blob:")
  const fileExt = fileName?.split(".").pop() || ""

  const getIconByExtension = (ext: string) => {
    switch (ext.toLowerCase()) {
      case "pdf":
        return <FileTextIcon className="w-5 h-5 text-red-600" />
      case "doc":
      case "docx":
        return <FileTextIcon className="w-5 h-5 text-blue-600" />
      case "txt":
        return <FileTextIcon className="w-5 h-5 text-gray-600" />
      default:
        return <FileIcon className="w-5 h-5 text-muted-foreground" />
    }
  }

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (isBlob) {
      window.open(fileUrl, "_blank")
      return
    }

    try {
      const blob = await FetchClientGetApiBlob(`${API.DOCUMENT.DOWNLOAD}/${fileName != "" ? fileName : fileUrl}`);
      if (!blob) {
        toast.error("Không thể tải file. Vui lòng thử lại sau.")
        return
      }

      const mimeType = getMimeType(fileExt)

      if (mimeType === "application/pdf") {
        const blobUrl = URL.createObjectURL(new Blob([blob], { type: mimeType }))
        window.open(blobUrl, "_blank")
      } else {
        // Tải về
        const blobUrl = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = blobUrl
        a.download = fileName
        a.click()
        URL.revokeObjectURL(blobUrl)
      }
    } catch (err) {
      toast.error("Đã xảy ra lỗi khi tải file.")
    }
  }

  return (
    <a
      href={fileUrl}
      onClick={handleClick}
      className="flex items-center gap-2 border p-2 rounded hover:bg-accent transition-colors"
    >
      {getIconByExtension(fileExt)}
      <span className="text-sm underline text-blue-600 hover:text-blue-800">
        {fileName}
      </span>
    </a>
  )
}
