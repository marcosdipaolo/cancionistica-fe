import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../stores/helpers/useStore";
import Noti from "./messages/Noti";

const Header: FC = () => {
  const history = useHistory();
  const { uiStore, dataStore: { userStore } } = useStore();
  const [ showTooltip, setShowTooltip ] = useState(false);
  const [ loggedOut, setLoggedOut ] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", closeTooltip);
    return () => {
      document.body.removeEventListener('click', closeTooltip);
    };
  }, []);

  const logout = () => {
    userStore.logout();
    setLoggedOut(true);
    history.push("/");
  };

  const openTooltip = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    setShowTooltip(true);
    document.querySelector(".user-tooltip")?.classList.add("d-block");
  };

  const closeTooltip = (e: { stopPropagation: () => void; }) => {
    setShowTooltip(false);
    setTimeout(() => {
      document.querySelector(".user-tooltip")?.classList.add("d-none");
    }, 300);
  };

  const alertVisible = () => {
    setTimeout(() => {
      setLoggedOut(false);
    }, 3000);
    return loggedOut;
  };

  return (
    <header className="app-header">
      <div className="container clearfix">
        <div className="fh5co-navbar-brand">
          <h1 className="text-center">
            <Link className="fh5co-logo" to="/">
              Cancionística
            </Link>
          </h1>
          <div>
            <div className={ "position-absolute user-tooltip" + (showTooltip ? " visible" : "") }>
              <ul>
                { userStore.getLoggedUser() ? <li><Link to="/admin">tu cuenta</Link></li> : "" }
                <li onClick={ logout }>Logout</li>
              </ul>
            </div>
            {
              userStore.getLoggedUser()
                ? <i onClick={ openTooltip } className="icon-user" />
                : ""
            }
            <a
              onClick={ uiStore.toggleMenu }
              className={ `js-fh5co-nav-toggle fh5co-nav-toggle` }
            >
              <i />
            </a>
            <div className="position-absolute" style={ { right: '100px' } }>
              <Noti visible={ alertVisible() } message="Cerraste sesión." colorClass="success" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
