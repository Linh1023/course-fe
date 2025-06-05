interface SubmissionAdminResponse {
    id: string; // id bai nop
    courseName:string; // ten khoa hoc
    lessonName:string; // ten bai hoc
    
    submitterUsername:string; //  nguoi nop
    submitterName:string; // ten nguoi nop
    submissionUrl:string;
    
    graderEmail:string;
    graderName:string; 
    score:number;
    comment:string;
    reviewedAt:string;
    submittedAt:string
    status:string; // trang thai
}

interface SubmissionPageResponse {
  result: SubmissionAdminResponse[];
  totalPages: number;
}
