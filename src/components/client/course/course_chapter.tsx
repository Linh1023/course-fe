import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatTime } from "@/utils/format_time";
import { PlayCircle } from "lucide-react";

interface CourseChaptersProps {
  chapters: ChapterClientResponse[];
}
export function CourseChapters({ chapters }: CourseChaptersProps) {
  return (
    <Accordion type="multiple" className="w-full flex flex-col  "  defaultValue={["item-0"]}>
      <div className=" from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Nội dung khóa học
        </h2>
      </div>
      {chapters.length === 0 && (
        <div className="text-sm text-muted-foreground p-2 mt-0">Chưa có nội dung</div>
      )}
      {/* {chapters.map((chapter, index) => (
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
      ))} */}

      {chapters.map((chapter, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-none mb-4 overflow-hidden rounded-xl shadow-sm p-2"
        >
          <AccordionTrigger className="flex justify-between px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all duration-300 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md group [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b-0" >
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-bold rounded-full shadow-sm">
                  {index + 1}
                </div>
                <span className="font-semibold text-gray-800 text-left group-hover:text-gray-900">
                  {chapter.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                  {chapter.lessons?.length || 0} bài học
                </span>
              </div>
            </div>

          </AccordionTrigger>

          <AccordionContent className="px-0 bg-white border border-slate-200 border-t-0 rounded-b-xl">
            <div className="px-6 py-4">
              <ul className="space-y-3">
                {chapter.lessons?.map((lesson, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 border border-transparent hover:border-slate-200 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-rose-100 rounded-full group-hover:bg-rose-200 transition-colors">
                        <PlayCircle className="w-4 h-4 text-rose-500 group-hover:text-rose-600" />
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-gray-900">
                        {lesson.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">
                        {formatTime(lesson.duration)}
                      </span>

                    </div>
                  </li>
                )) || (
                    <li className="text-center text-gray-500 py-4">
                      <span className="text-sm">Chưa có bài học nào</span>
                    </li>
                  )}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
