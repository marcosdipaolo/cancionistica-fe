import { FC } from "react";
import SectionTitle from "./shared/SectionTitle";

const AboutUs: FC = () => (
  <div>
    <div id="fh5co-intro-section">
      <SectionTitle
        title="About us"
        sub="Lorem ipsum dolor sit amet, consectetur.2"
      />
    </div>
    <div id="fh5co-about-section">
      <div className="container">
        <div className="row animate-box">
          <div className="col-md-8 offset-md-2 text-center animate-box">
            <div className="about-content">
              <h3>History</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                quo est quis mollitia ratione magni assumenda repellat atque
                modi temporibus tempore ex. Dolore facilis ex sunt ea
                praesentium expedita numquam. Quos quia provident consequuntur
                culpa facere ratione maxime commodi voluptates id repellat velit
                eaque aspernatur expedita.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center animate-box ">
            <div className="heading-section">
              <h2>Our Creative Staff</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-4 animate-box">
            <div className="fh5co-staff">
              <img src="images/person1.jpg" alt="" />
              <h3>Jean Smith</h3>
              <span className="role">Web Designer</span>
              <p>
                Quos quia provident consequuntur culpa facere ratione maxime
                commodi voluptates id repellat velit eaque aspernatur expedita.
                Possimus itaque adipisci.
              </p>
              <ul className="fh5co-social-icons">
                <li>
                  <a href="#">
                    <i className="icon-facebook3"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-twitter2"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-dribbble2"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 animate-box">
            <div className="fh5co-staff">
              <img src="images/person1.jpg" alt="" />
              <h3>Hush Raven</h3>
              <span className="role">Front-end Developer</span>
              <p>
                Quos quia provident consequuntur culpa facere ratione maxime
                commodi voluptates id repellat velit eaque aspernatur expedita.
                Possimus itaque adipisci.
              </p>
              <ul className="fh5co-social-icons">
                <li>
                  <a href="#">
                    <i className="icon-facebook3"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-twitter2"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-dribbble2"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 animate-box">
            <div className="fh5co-staff">
              <img src="images/person1.jpg" alt="" />
              <h3>Alex King</h3>
              <span className="role">Back-end Developer</span>
              <p>
                Quos quia provident consequuntur culpa facere ratione maxime
                commodi voluptates id repellat velit eaque aspernatur expedita.
                Possimus itaque adipisci.
              </p>
              <ul className="fh5co-social-icons">
                <li>
                  <a href="#">
                    <i className="icon-facebook3"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-twitter2"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-dribbble2"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutUs;
