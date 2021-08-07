import { FC } from "react";
import SectionTitle from "./shared/SectionTitle";

const Branding: FC = () => (
  <div id="fh5co-work-section">
    <SectionTitle title="Branding" />
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-center animate-box">
          <div
            className="work"
            style={ { backgroundImage: "url(images/img-5.jpg)" } }
          >
            <a href="#" className="view">
              <span>View Demo</span>
            </a>
          </div>
        </div>
        <div className="col-md-8 text-center animate-box">
          <div
            className="work"
            style={ { backgroundImage: "url(images/img-6.jpg)" } }
          >
            <a href="#" className="view">
              <span>View Demo</span>
            </a>
          </div>
        </div>
        <div className="col-md-7 text-center animate-box">
          <div
            className="work"
            style={ { backgroundImage: "url(images/img-7.jpg)" } }
          >
            <a href="#" className="view">
              <span>View Demo</span>
            </a>
          </div>
        </div>
        <div className="col-md-5 text-center animate-box">
          <div
            className="work"
            style={ { backgroundImage: "url(images/img-8.jpg)" } }
          >
            <a href="#" className="view">
              <span>View Demo</span>
            </a>
          </div>
        </div>
        <p className="text-center view-button animate-box">
          <a href="#" className="btn btn-primary btn-outline btn-lg">
            See More branding
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Branding;
