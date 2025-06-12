export const getFileNameFromUrl = (url: string): string | null => {
  try {
    const pathname = new URL(url).pathname
    const filename = pathname.split("/").pop() || ""
    return filename || null
  } catch {
    return null
  }
}