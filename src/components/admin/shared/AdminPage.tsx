import { FC, ReactNode } from "react";
import Sidebar from "../Sidebar";
import Nav from "../Nav";
import "../../../sass/admin/style.scss";
import { useStore } from "../../../stores/helpers/useStore";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface Children {
  children: (Element | ReactNode)[] | (Element | ReactNode);
}

const AdminPage: FC<Children> = ({ children }: Children) => {

  const { uiStore, dataStore: { userStore } } = useStore();
  const history = useHistory();
  if (!userStore.getLoggedUser()) {
    history.push("/login");
  }
  const getSidebarOpenedClass = () => {
    return uiStore.adminSidebarOpened ? "sidebar-opened" : "sidebar-closed"
  }
  return (
    <div id="adminPanel" className={getSidebarOpenedClass()}>
      <Sidebar />
      <main>
          <Nav />
        <div className="container p-0">
          { children }
        </div>
      </main>
    </div>
  );
};

export default observer(AdminPage);
