import { FC } from "react";
import { Link } from "react-router-dom";
import { Category } from "../models/Category";
import { Image } from "../models/Image";

export interface SlideInterface {
  id: string;
  images: Image[];
  title: string;
  post_category: Category | undefined;
}

const Slide: FC<SlideInterface> = ({
  title,
  post_category,
  images,
  id
}: SlideInterface) => (
  <Link to={ `/blog/${id}` }>
    <div className="app-slide" style={ { backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${images.find(img => img.size === "full")?.path})` } }>
      <div className="overlay-gradient"></div>
      <div className="row h-100">
        <div className="col-md-6"></div>
        <div className="slider-text align-self-center col-md-6 animated fadeInUp">
          <div>
            <h2 className="title">{ title }</h2>
            <span className="category">{ post_category?.name }</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default Slide;
