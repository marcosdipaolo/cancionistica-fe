import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../stores/helpers/useStore";
import CartIcon from "./CartIcon";

const Header: FC = () => {
  const { uiStore, dataStore: { userStore } } = useStore();
  const [ showTooltip, setShowTooltip ] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", closeTooltip);
    return () => {
      document.body.removeEventListener("click", closeTooltip);
    };
  }, []);

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
                { userStore.getLoggedUser() ? <Link to="/admin"><li>tu cuenta</li></Link> : "" }
                <Link to="/logout"><li>Logout</li></Link>
              </ul>
            </div>

            <Link to="/courses/pre-purchase">
              <CartIcon />
            </Link>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
