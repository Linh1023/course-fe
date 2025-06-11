import { FileTextIcon, FileIcon } from "lucide-react"

interface UploadedFilePreviewProps {
  fileUrl: string
  fileName: string
}

export function UploadedFilePreview({ fileUrl, fileName }: UploadedFilePreviewProps) {
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

  const fileExt = fileName.split(".").pop() || ""

  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 border p-2 rounded hover:bg-accent transition-colors"
    >
      {getIconByExtension(fileExt)}
      <span className="text-sm underline text-blue-600 hover:text-blue-800">
        {fileName}
      </span>
    </a>
  )
}
