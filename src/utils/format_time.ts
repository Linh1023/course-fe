import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

// Hàm rút gọn
export const formatTimeShort = (dateString: string): string => {
  const now = dayjs();
  const date = dayjs(dateString);
  const diffMinutes = now.diff(date, "minute");
  const diffHours = now.diff(date, "hour");
  const diffDays = now.diff(date, "day");

  if (diffMinutes < 1) return "Vừa xong";
  if (diffMinutes < 60) return `${diffMinutes} phút`;
  if (diffHours < 24) return `${diffHours} giờ`;
  if (diffDays < 7) return `${diffDays} ngày`;
  return date.format("DD/MM"); // hoặc return `${diffDays}ng` nếu vẫn muốn theo ngày
};
  export  const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

  export const formatTimeWithDaysHoursMinutes = (seconds: number, isFullText = true) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (days > 0) {
      return `${days} ${isFullText ? "ngày":"d"} ${hours} ${isFullText ? "giờ":"h"} ${mins} ${isFullText ? "phút":"p"}`;
    }
    if (hours > 0) {
      return `${hours} ${isFullText ? "giờ":"h"} ${mins} ${isFullText ? "phút":"p"}`;
    }
    return `${mins} ${isFullText ? 'phút' : 'p'}`;
  }

  export function formatDateTime(input: string): string {
  const date = new Date(input);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng tính từ 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}