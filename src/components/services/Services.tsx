import { FC } from "react";
import SectionTitle from "../shared/SectionTitle";
import Service from "./Service";

const Services: FC = () => (
  <div id="fh5co-services-section">
    <SectionTitle
      title="Our services"
      sub="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores exercitationem iure nobis pariatur perferendis praesentium."
    />
    <div className="container">
      <div className="row">
        <Service iconClass="icon-mobile" title="Lorem ipsum dolor" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
          natus saepe voluptatibus."/>
        <Service iconClass="icon-browser" title="Lorem ipsum dolor" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
          natus saepe voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
          natus saepe voluptatibus."/>
        <Service iconClass="icon-toolbox" title="Lorem ipsum dolor" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
          natus saepe voluptatibus."/>
      </div>
    </div>
  </div>
);

export default Services;
