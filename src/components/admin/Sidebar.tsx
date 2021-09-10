import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/helpers/useStore";
import { sidebarConfig } from "./sidebar-config";

const Sidebar: FC = () => {
  const { uiStore, dataStore: { userStore } } = useStore();
  
  useEffect(() => {
    userStore.checkIfAdmin();
  }, []);
  
  return (
    <aside className={ uiStore.adminSidebarOpened ? "opened" : "closed" }>
      <header>
        <Link to="/">
          <h5 className="text-transform-uppercase">
            cancionistica
          </h5>
        </Link>
      </header>
      <main>
        <ul>
          { sidebarConfig.map(config => (
            <li key={ config.path } style={ { display: (!userStore.isAdmin && (config.path === "/admin/blog")) ? "none" : "block" } }>
              <i className={ `icon-${config.icon}` }></i>
              <Link to={ config.path }>{ config.label }</Link>
            </li>
          )) }
          <li>
            <i className="icon-exit"></i>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </main>
    </aside>
  );
};

export default observer(Sidebar);