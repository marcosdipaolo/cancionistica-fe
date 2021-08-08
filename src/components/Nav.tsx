import { Link, useHistory } from "react-router-dom";
import { FC, Fragment } from "react";
import { useStore } from "../stores/helpers/useStore";
import { observer } from "mobx-react-lite";

const Nav: FC = () => {
  const history = useHistory();
  const { uiStore, dataStore: { userStore } } = useStore();

  const logout = () => {
    uiStore.toggleMenu();
    history.push("/logout");
  };

  return (
    <nav id="fh5co-main-nav" role="navigation">
      <a
        onClick={ uiStore.toggleMenu }
        className={ `js-fh5co-nav-toggle fh5co-nav-toggle active${uiStore.menuOpened ? " show" : ""
          }` }
      >
        <i />
      </a>
      <div className="js-fullheight fh5co-table">
        <div className="fh5co-table-cell js-fullheight">
          <ul>
            <li onClick={ uiStore.toggleMenu }>
              <Link to="/">Inicio</Link>
            </li>
            <li onClick={ uiStore.toggleMenu }>
              <Link to="/about">Yo</Link>
            </li>
            <li onClick={ uiStore.toggleMenu }>
              <Link to="/contact">Contacto</Link>
            </li>
            {
              userStore.getLoggedUser()
                ? <Fragment>
                  <li onClick={ logout }>
                    <a href="#">Logout</a>
                  </li>
                </Fragment>
                : <Fragment>
                  <li onClick={ uiStore.toggleMenu }>
                    <Link to="/login">Login</Link>
                  </li>
                  <li onClick={ uiStore.toggleMenu }>
                    <Link to="/register">Registrate</Link>
                  </li>
                </Fragment>
            }
          </ul>
          <p className="fh5co-social-icon">
            <a>
              <i className="icon-twitter2" />
            </a>
            <a>
              <i className="icon-facebook2" />
            </a>
            <a>
              <i className="icon-instagram" />
            </a>
            <a>
              <i className="icon-dribbble2" />
            </a>
            <a>
              <i className="icon-youtube" />
            </a>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default observer(Nav);
