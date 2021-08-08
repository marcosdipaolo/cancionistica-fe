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
        <ul className="position-relative">
          { sidebarConfig.map(config => (
            <li key={config.path}>
              <i className={ `icon-${config.icon}` }></i>
              <Link to={ config.path }>{ config.label }</Link>
            </li>
          )) }
          <li className="position-absolute bottom-0">
            <i className="icon-exit"></i>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </main>
    </aside>
  );
};

export default Sidebar;