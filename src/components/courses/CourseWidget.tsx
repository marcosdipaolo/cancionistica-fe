import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Course } from "../../models/Course";
import { Image } from "../../models/Image";
import { useStore } from "../../stores/helpers/useStore";

export interface CourseProps {
  course: Course;
}

const CourseWidget: FC<CourseProps> = ({ course }) => {
  const thumb = course.images.find(img => img.size === "thumbnail") ?? { path: "" };
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;
  const { dataStore: { cartStore } } = useStore();

  const addToCart = () => {
    if (cartStore.isInCart(course)) {
      cartStore.removeFromCart(course);
    } else {
      cartStore.addToCart(course);
    }
  };


  return (
    <div id={ `course#${course.id}` } className="col-md-6 text-center animate-box">
      <div
        className="work"
        style={ { backgroundImage: `url(${backEndUrl}/${thumb.path})` } }
      >
        <Link to={ `/courses/${course.id}` } className="view">
          <span>Ver Descripción</span>
        </Link>
        <span onClick={addToCart} className="icon-container cursor-pointer">
          <span className="sign position-absolute" style={{color: cartStore.isInCart(course) ? 'red' : 'green'}}>{cartStore.isInCart(course) ? "-" : "+"}</span>
          <i className="icon-cart"></i>
        </span>
      </div>
    </div>
  );
};

export default observer(CourseWidget);