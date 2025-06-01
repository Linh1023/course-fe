interface SubmissionResponse {
    id: string; // id bai nop
    courseName:string; // ten khoa hoc
    lessonName:string; // ten bai hoc
    
    submitterEmail:string; // email nguoi nop
    submitterName:string; // ten nguoi nop
    submissionUrl:string;
    
    graderEmail:string;
    graderName:string; 
    score:number;
    comment:string;
    reviewedAt:string;
    status:string; // trang thai
}