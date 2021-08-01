import { FC } from "react";

const Contact: FC = () => (
  <div id="fh5co-contact-section">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-md-push-1 animate-box">
          <h3>Our Address</h3>
          <ul className="contact-info">
            <li>
              <i className="icon-location-pin"></i>198 West 21th Street, Suite
              721 New York NY 10016
            </li>
            <li>
              <i className="icon-phone2"></i>+ 1235 2355 98
            </li>
            <li>
              <i className="icon-mail"></i>
              <a href="#">info@yoursite.com</a>
            </li>
            <li>
              <i className="icon-globe2"></i>
              <a href="#">www.yoursite.com</a>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-md-push-1 animate-box">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <textarea
                  name=""
                  className="form-control"
                  id=""
                  cols={30}
                  rows={7}
                  placeholder="Message"
                ></textarea>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <input
                  type="submit"
                  value="Send Message"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
