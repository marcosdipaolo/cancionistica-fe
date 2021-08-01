import { FC } from "react";

const Intro: FC<{ title: string; paragraph: string }> = ({
  title,
  paragraph,
}: {
  title: string;
  paragraph: string;
}) => (
  <div id="fh5co-intro-section">
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 animate-box text-center">
          <h2 className="intro-heading">{title}</h2>
          <p>
            <span>{paragraph}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Intro;
