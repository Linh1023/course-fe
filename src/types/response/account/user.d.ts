 interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
  status: "active" | "inactive";
  role: "CLIENT" | "ADMIN";
  sex: "MALE" | "FEMALE" | "OTHER";
  birthday: string;
}


interface UserPageResponse {
  result: User[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}