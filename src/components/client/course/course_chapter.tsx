import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatTime } from "@/utils/format_time";
import { PlayCircle } from "lucide-react";

interface CourseChaptersProps {
  chapters: ChapterClientResponse[];
}
export function CourseChapters({ chapters }: CourseChaptersProps) {
  return (
    <Accordion type="multiple" className="w-full flex flex-col space-y-2">
      <h2 className="font-bold text-lg">Nội dung khóa học</h2>
      {chapters.map((chapter, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-none">
          <AccordionTrigger className="flex justify-between px-4 py-3 bg-muted rounded-md hover:bg-muted/70">
            <div className="font-semibold">{chapter.name}</div>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <ul className="space-y-2 py-2">
              {chapter.lessons.map((lesson, i) => (
                <li key={i} className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-rose-400" />
                    <span>{lesson.name}</span>
                  </div>
                  <span className="text-xs">{formatTime(lesson.duration)}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
