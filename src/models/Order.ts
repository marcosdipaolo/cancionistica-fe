import { Course } from "./Course";
import { User } from "./User";

export interface Order {
  id: string;
  userId: string;
  preferenceId: string;
  createdAt: string;
  courses: Course[];
  amount: number;
  status: string;
  user: User
} 