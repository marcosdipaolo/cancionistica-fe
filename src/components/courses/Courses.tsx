import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Course as CourseModel } from "../../models/Course";
import { useStore } from "../../stores/helpers/useStore";
import SectionTitle from "../shared/SectionTitle";
import Course from "./CourseWidget";

const Courses: FC = () => {
  const { dataStore: { courseStore } } = useStore();
  const [courses, setCourses] = useState<CourseModel[]>([]);
  useEffect(() => {
    setCourses(courseStore.courses);
  }, [courseStore.courses]);
  return (
    <div id="fh5co-work-section">
      <SectionTitle title="El Taller" />
      <div className="container">
        <div className="row">
          { Array.isArray(courses) && courses.map(
              course => <Course course={course} key={course.id} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default observer(Courses);
