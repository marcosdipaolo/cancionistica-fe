import { FC } from "react";
import { useStore } from "../../stores/helpers/useStore";

const Nav: FC = () => {
  const { uiStore, dataStore: { userStore } } = useStore();
  const loggedUser = userStore.getLoggedUser();
  return (
    <nav>
      <div className="d-flex px-4 justify-content-between pt-3">
        <i onClick={() => uiStore.toggleAdminSidebarOpened()} className="icon-menu"></i>
        <span className="fw-normal">{ loggedUser ? loggedUser.name : "usuario no detectado" }</span>
      </div>
    </nav>
  );
};

export default Nav;