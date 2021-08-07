import { FC, ReactNode } from "react";
import Sidebar from "../Sidebar";
import Nav from "../Nav";
import "../../../sass/admin/style.scss";
import { useStore } from "../../../stores/helpers/useStore";
import { useHistory } from "react-router-dom";

interface Children {
  children: (Element | ReactNode)[] | (Element | ReactNode);
}

const AdminPage: FC<Children> = ({ children }: Children) => {

  const { dataStore: { userStore } } = useStore();
  const history = useHistory();
  if (!userStore.getLoggedUser()) {
    history.push("/login");
  }
  return (
    <div id="adminPanel">
      <Sidebar />
      <main>
        <div className="container-fluid p-0">
          <Nav />
          { children }
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
