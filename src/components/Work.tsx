import { FC } from "react";
import SectionTitle from "./shared/SectionTitle";

const Work: FC = () => (
  <div id="fh5co-work-section">
    <SectionTitle title="Our Website" />
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-center animate-box">
          <div
            className="work"
            style={ { backgroundImage: "url(images/img-1.jpg)" } }
          >
            <a href="#" className="view">
              <span>View Demo</span>
            </a>
          </div>
        </div>
        <div className="col-md-6 text-center animate-box">
          <div
            className="work"
            style={ { backgroundImage: "url(images/img-2.jpg)" } }
          >
            <a href="#" className="view">
              <span>View Demo</span>
            </a>
          </div>
        </div>
        <div className="col-md-6 text-center animate-box">
          <div
            className="work"
            style={ { backgroundImage: "url(images/img-3.jpg)" } }
          >
            <a href="#" className="view">
              <span>View Demo</span>
            </a>
          </div>
        </div>
        <div className="col-md-6 text-center animate-box">
          <div
            className="work"
            style={ { backgroundImage: "url(images/img-4.jpg)" } }
          >
            <a href="#" className="view">
              <span>View Demo</span>
            </a>
          </div>
        </div>
        <p className="text-center view-button animate-box">
          <a href="#" className="btn btn-primary btn-outline btn-lg">
            See More Project
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Work;
