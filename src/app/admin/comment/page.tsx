import { columns } from "@/components/admin/comment/table/columns";
import { DataTable } from "@/components/admin/comment/table/data_table";
import { AdminComment } from "@/components/admin/comment/table/data_table";

async function getData(): Promise<AdminComment[]> {
  return [
    {
      id: "1",
      lessonName: "Giới thiệu về React",
      lessonId: "lesson-1",
      accountName: "Nguyễn Văn A",
      accountId: "account-1",
      status: "success",
      createdAt: "2023-10-01T12:00:00Z",
      content: "",
    },
    {
      id: "2",
      lessonName: "Làm quen với Next.js",
      lessonId: "lesson-2",
      accountName: "Trần Thị B",
      accountId: "account-2",
      status: "pending",
      createdAt: "2023-10-02T14:30:00Z",
      content: "",
    },
    {
      id: "3",
      lessonName: "Tìm hiểu về TypeScript",
      lessonId: "lesson-3",
      accountName: "Lê Văn C",
      accountId: "account-3",
      status: "processing",
      createdAt: "2023-10-03T09:15:00Z",
      content: "",
    },
    {
      id: "4",
      lessonName: "Xây dựng ứng dụng với React Native",
      lessonId: "lesson-4",
      accountName: "Phạm Thị D",
      accountId: "account-4",
      status: "failed",
      createdAt: "2023-10-04T16:45:00Z",
      content: "",
    },
    {
      id: "1",
      lessonName: "React Basics",
      lessonId: "101",
      accountName: "John Doe",
      accountId: "201",
      status: "success",
      createdAt: "2025-05-28",
      content: "",
    },
    {
      id: "2",
      lessonName: "Next.js Guide",
      lessonId: "102",
      accountName: "Jane Smith",
      accountId: "202",
      status: "pending",
      createdAt: "2025-05-27",
      content: "",
    },
    {
      id: "1",
      lessonName: "React Basics",
      lessonId: "101",
      accountName: "John Doe",
      accountId: "201",
      status: "success",
      createdAt: "2025-05-28",
      content: "",
    },
    {
      id: "2",
      lessonName: "Next.js Guide",
      lessonId: "102",
      accountName: "Jane Smith",
      accountId: "202",
      status: "pending",
      createdAt: "2025-05-27",
      content: "",
    },
    {
      id: "1",
      lessonName: "React Basics",
      lessonId: "101",
      accountName: "John Doe",
      accountId: "201",
      status: "success",
      createdAt: "2025-05-28",
      content: "",
    },
    {
      id: "2",
      lessonName: "Next.js Guide",
      lessonId: "102",
      accountName: "Jane Smith",
      accountId: "202",
      status: "pending",
      createdAt: "2025-05-27",
      content: "",
    },
    {
      id: "1",
      lessonName: "React Basics",
      lessonId: "101",
      accountName: "John Doe",
      accountId: "201",
      status: "success",
      createdAt: "2025-05-28",
      content: "",
    },
    {
      id: "2",
      lessonName: "Next.js Guide",
      lessonId: "102",
      accountName: "Jane Smith",
      accountId: "202",
      status: "pending",
      createdAt: "2025-05-27",
      content: "",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
