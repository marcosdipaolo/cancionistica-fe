import { inject, injectable } from "inversify";
import { TYPES } from "../container/types";
import { INotificationService } from "./NotificationService";
import cancionistica from "../api/cancionistica";
import { Course } from "../models/Course";
import { AxiosResponse } from "axios";

export interface ICourseService {
  getCourses(): Promise<AxiosResponse<Course[]>>;
}

@injectable()
export class CourseService implements ICourseService {
  @inject(TYPES.notificationService) private notificationService!: INotificationService;

  getCourses(): Promise<AxiosResponse<Course[]>> {
    return cancionistica.get("/api/courses");
  }
}