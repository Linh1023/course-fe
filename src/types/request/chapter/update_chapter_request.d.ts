interface UpdateChapterRequest{
  chapterNumber: number;
  name: string;
  detail: string;
  status: "active" | "inactive";
}