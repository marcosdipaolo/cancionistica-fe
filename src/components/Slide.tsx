import { FC } from "react";
import { Link } from "react-router-dom";

export interface SlideInterface {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
}

const Slide: FC<SlideInterface> = ({
  title,
  category,
  imageUrl,
  id
}: SlideInterface) => (
  <Link to={ `/blog/${id}` }>
    <div className="app-slide" style={ { backgroundImage: `url(${imageUrl})` } }>
      <div className="overlay-gradient"></div>
      <div className="row h-100">
        <div className="col-md-6"></div>
        <div className="slider-text align-self-center col-md-6 animated fadeInUp">
          <div>
            <h2 className="title">{ title }</h2>
            <span className="category">{ category }</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default Slide;
