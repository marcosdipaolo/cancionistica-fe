import { FC } from "react";
import { Link } from "react-router-dom";
import { sidebarConfig } from "./sidebar-config";

const Sidebar: FC = () => {
  return (
    <aside>
      <header>
        <Link to="/"><h5 className="text-transform-uppercase">
          cancionistica
        </h5>
        </Link>
      </header>
      <main>
        <ul>
          { sidebarConfig.map(config => (
            <li>
              <i className={ `icon-${config.icon}` }></i>
              <Link to={ config.path }>{ config.label }</Link>
            </li>
          )) }
        </ul>
      </main>
    </aside>
  );
};

export default Sidebar;