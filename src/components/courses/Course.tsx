import { FC } from "react";
import { Link } from "react-router-dom";
import { Image } from "../../models/Image";

export interface CourseProps {
  courseId: string;
  images: Image[];
}

const Course: FC<CourseProps> = ({ courseId, images }) => {
  const thumb = images.find(img => img.size === "thumbnail") ?? {path: ""}; 
  
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;
  return (
    <div id={ `course#${courseId}` } className="col-md-6 text-center animate-box">
      <div
        className="work"
        style={ { backgroundImage: `url(${backEndUrl}/${thumb.path})`, backgroundSize: 'cover' } }
      >
        <Link to={`/courses/${courseId}`} className="view">
          <span>Ver Descripción</span>
        </Link>
      </div>
    </div>
  );
};

export default Course;