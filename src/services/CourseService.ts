import { inject, injectable } from "inversify";
import { TYPES } from "../container/types";
import { INotificationService, NotificationType } from "./NotificationService";
import cancionistica from "../api/cancionistica";
import { Course } from "../models/Course";
import { AxiosResponse } from "axios";

export interface ICourseService {
  getCourses(): Promise<AxiosResponse<Course[]>>;
  getCourse(id: string): Promise<AxiosResponse<Course>>;
}

@injectable()
export class CourseService implements ICourseService {
  @inject(TYPES.notificationService) private notificationService!: INotificationService;

  getCourses(): Promise<AxiosResponse<Course[]>> {
    try {
      return cancionistica.get<Course[]>("/api/courses");
    }
    catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, err.message);
      return Promise.reject();
    }
  }

  getCourse(id: string): Promise<AxiosResponse<Course>> {
    try {
      return cancionistica.get<Course>(`/api/courses/${id}`);
    } catch(err) {
      this.notificationService.createNotification(NotificationType.ERROR, err.message);
      return Promise.reject(err)
    }
  }
}