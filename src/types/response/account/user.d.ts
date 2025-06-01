interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  status: "active" | "inactive";
  role: "ADMIN" | "CLIENT";
  sex: "MALE" | "FEMALE" | "OTHER";
  phone: string;
  avatarUrl: string;
  birthday: string;
}

interface UserPageResponse {
  result: User[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}