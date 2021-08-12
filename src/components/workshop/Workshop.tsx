import { FC } from "react";
import SectionTitle from "../shared/SectionTitle";
import WorkshopModule from "./WorkshopModule";
import modulesConfig, { WorkshopModuleData } from './modules.config';

const Workshop: FC = () => (
  <div id="fh5co-work-section">
    <SectionTitle title="El Taller" />
    <div className="container">
      <div className="row">
        {
          modulesConfig.map(({ index, thumb }: WorkshopModuleData) => (
            <WorkshopModule
              index={ index }
              image={ thumb }
              key={ index }
            />
          ))
        }
        {/* <p className="text-center view-button animate-box">
          <a href="#" className="btn btn-primary btn-outline btn-lg">
            See More Project
          </a>
        </p> */}
      </div>
    </div>
  </div>
);

export default Workshop;
