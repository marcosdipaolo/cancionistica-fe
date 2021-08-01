import { FC } from "react";

export interface SlideInterface {
  imageUrl: string;
  title: string;
  tag: string;
}

const Slide: FC<SlideInterface> = ({
  title,
  tag,
  imageUrl,
}: SlideInterface) => (
  <div className="app-slide" style={{ backgroundImage: `url(${imageUrl})` }}>
    <div className="overlay-gradient"></div>
    <div className="row h-100">
      <div className="col-md-6"></div>
      <div className="slider-text align-self-center col-md-6 animated fadeInUp">
        <div>
          <h2 className="title">{title}</h2>
          <span className="tag">{tag}</span>
        </div>
      </div>
    </div>
  </div>
);

export default Slide;
