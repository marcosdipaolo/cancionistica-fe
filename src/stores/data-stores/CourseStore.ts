import { inject, injectable } from "inversify";
import { flow, makeAutoObservable } from "mobx";
import { TYPES } from "../../container/types";
import { Course } from "../../models/Course";
import { ICourseService } from "../../services/CourseService";

@injectable()
export class CourseStore {

  courses: Course[] = [];

  @inject(TYPES.courseService) private courseService!: ICourseService;

  constructor() {
    makeAutoObservable(this);
  }

  getCourses = flow(function* (this: CourseStore) {
    const { data } = yield this.courseService.getCourses();
    this.courses = data;
  });
}