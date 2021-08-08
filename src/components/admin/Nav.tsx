import { FC } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../../stores/helpers/useStore";

const Nav: FC = () => {
  const { dataStore: { userStore } } = useStore();
  const loggedUser = userStore.getLoggedUser();
  const history = useHistory();
  
  if (!loggedUser) {
      history.push("/login");
  }
  return (
    <nav>
      <div className="d-flex flex-row-reverse container">
        <span className="fw-normal">{loggedUser!.name}</span>
      </div>
    </nav>
  );
};

export default Nav;