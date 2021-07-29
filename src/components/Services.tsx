import {FC} from "react";
import SectionTitle from "./shared/SectionTitle";

const Services: FC = () => (
    <div id="fh5co-services-section">
        <SectionTitle
            title="Our services"
            sub="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores exercitationem iure nobis pariatur perferendis praesentium."/>
        <div className="container">
            <div className="row">
                <div className="col-md-4 text-center animate-box">
                    <div className="services">
                        <div className="icon">
                            <span><i className="icon-mobile"></i></span>
                        </div>
                        <h3>Lorem ipsum dolor.</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit natus saepe voluptatibus.</p>
                    </div>
                </div>
                <div className="col-md-4 text-center animate-box">
                    <div className="services">
                        <div className="icon">
                            <span><i className="icon-browser"></i></span>
                        </div>
                        <h3>Lorem ipsum dolor.</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque nam similique vero.</p>
                    </div>
                </div>
                <div className="col-md-4 text-center animate-box">
                    <div className="services">
                        <div className="icon">
                            <span><i className="icon-toolbox"></i></span>
                        </div>
                        <h3>Lorem ipsum dolor.</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ducimus soluta.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Services;
