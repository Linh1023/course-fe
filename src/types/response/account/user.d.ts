interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  status: "active" | "inactive";
  role: "admin" | "instructor" | "student";
  name: string;
  sex: "male" | "female" | "other";
  birthday: string;
}

export interface UserPageResponse {
  result: User[];
  totalPages: number;
}