import { FC } from "react";
import SectionTitle from "./shared/SectionTitle";

const Product: FC = () => (
  <div id="fh5co-product-section">
    <SectionTitle title="Product" />
    <div className="container">
      <div className="row">
        <div className="col-md-4 prod text-center animate-box">
          <div
            className="product"
            style={{ backgroundImage: "url(images/img-9.jpg)" }}
          >
            <a href="#" className="view">
              <i className="icon-plus" />
            </a>
          </div>
          <h3>
            <a href="#">Bag</a>
          </h3>
          <span className="price">$48</span>
        </div>
        <div className="col-md-4 prod text-center animate-box">
          <div
            className="product"
            style={{ backgroundImage: "url(images/img-11.jpg" }}
          >
            <a href="#" className="view">
              <i className="icon-plus" />
            </a>
          </div>
          <h3>
            <a href="#">Arigato Shoes</a>
          </h3>
          <span className="price">$109</span>
        </div>
        <div className="col-md-4 prod text-center animate-box">
          <div
            className="product"
            style={{ backgroundImage: "url(images/img-12.jpg" }}
          >
            <a href="#" className="view">
              <i className="icon-plus" />
            </a>
          </div>
          <h3>
            <a href="#">New Balance Shoes</a>
          </h3>
          <span className="price">$89</span>
        </div>
        <p className="text-center view-button animate-box">
          <a href="#" className="btn btn-primary btn-outline btn-lg">
            See More Product
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Product;
