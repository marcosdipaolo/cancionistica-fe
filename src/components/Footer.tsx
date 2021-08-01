import { FC } from "react";

const Footer: FC = () => (
  <footer>
    <div id="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3 className="section-title">Minimal</h3>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics.
            </p>
          </div>

          <div className="col-md-4 col-md-push-1">
            <h3 className="section-title">Our Services</h3>
            <ul>
              <li>
                <a href="#">Videos</a>
              </li>
              <li>
                <a href="#">Photography</a>
              </li>
              <li>
                <a href="#">Editing Photos</a>
              </li>
              <li>
                <a href="#">Newsletter</a>
              </li>
              <li>
                <a href="#">API</a>
              </li>
              <li>
                <a href="#">FAQ / Contact</a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h3 className="section-title">Information</h3>
            <ul>
              <li>
                <a href="#">Terms &amp; Condition</a>
              </li>
              <li>
                <a href="#">License</a>
              </li>
              <li>
                <a href="#">Privacy &amp; Policy</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row copy-right">
          <div className="col-md-6 col-md-offset-3 text-center">
            <p className="fh5co-social-icon">
              <a href="#">
                <i className="icon-twitter2"></i>
              </a>
              <a href="#">
                <i className="icon-facebook2"></i>
              </a>
              <a href="#">
                <i className="icon-instagram"></i>
              </a>
              <a href="#">
                <i className="icon-dribbble2"></i>
              </a>
              <a href="#">
                <i className="icon-youtube"></i>
              </a>
            </p>
            <p>
              Copyright 2016 Free Html5
              <a href="#">Minimal</a>. All Rights Reserved. <br />
              Made with
              <i className="icon-heart3"></i>
              by
              <a href="http://freehtml5.co/" target="_blank" rel="noreferrer">
                Freehtml5.co
              </a>
              / Demo Images:
              <a
                href="http://blog.gessato.com/"
                target="_blank"
                rel="noreferrer"
              >
                Gessato
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
