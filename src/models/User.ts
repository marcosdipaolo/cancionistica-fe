import { PersonalInfo } from "../stores/data-stores/UserStore";

export interface User {
    id: string;
    name: string;
    email: string;
    personalInfo?: PersonalInfo,
    emailVerifiedAt: string | null
}