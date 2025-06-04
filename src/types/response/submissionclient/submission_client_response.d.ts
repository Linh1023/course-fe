interface SubmissionClientResponse {
    id: string; // id bai nop
    courseName:string; // ten khoa hoc
    lessonName:string; // ten bai hoc
    
    submissionUrl:string;
    
    score:number;
    comment:string;
    submittedAt:string
    status:string; // trang thai
}

interface SubmissionClientPageResponse {
  result: SubmissionClientResponse[];
  totalPages: number;
}
