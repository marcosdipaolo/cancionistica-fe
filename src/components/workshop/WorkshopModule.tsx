import { FC } from "react";
import { Link } from "react-router-dom";

export interface WorkshopModuleProps {
  index: number;
  image: string;
}

const WorkshopModule: FC<WorkshopModuleProps> = ({ index, image }) => {
  return (
    <div id={ `module#${index}` } className="col-md-6 text-center animate-box">
      <div
        className="work"
        style={ { backgroundImage: `url(${image})`, backgroundSize: 'cover' } }
      >
        <Link to={`/modules/${index}`} className="view">
          <span>Ver Descripción</span>
        </Link>
      </div>
    </div>
  );
};

export default WorkshopModule;