import {Link} from "react-router-dom";
import {FC, MouseEventHandler} from "react";

interface NavProps {
    toggleMenu: MouseEventHandler,
    menuOpened: boolean
}

const Nav: FC<NavProps> = ({toggleMenu, menuOpened}) => {
    return (
        <nav id="fh5co-main-nav" role="navigation">
            <a
                onClick={toggleMenu}
                className={`js-fh5co-nav-toggle fh5co-nav-toggle active${menuOpened ? ' show' : ''}`}>
                <i/>
            </a>
            <div className="js-fullheight fh5co-table">
                <div className="fh5co-table-cell js-fullheight">
                    <ul>
                        <li onClick={toggleMenu}><Link to="/">Inicio</Link></li>
                        <li onClick={toggleMenu}><Link to="/about">Yo</Link></li>
                        <li onClick={toggleMenu}><Link to="/contact">Contacto</Link></li>
                        <li onClick={toggleMenu}><Link to="/login">Login</Link></li>
                        <li onClick={toggleMenu}><Link to="/register">Registrate</Link></li>
                    </ul>
                    <p className="fh5co-social-icon">
                        <a><i className="icon-twitter2" /></a>
                        <a><i className="icon-facebook2" /></a>
                        <a><i className="icon-instagram" /></a>
                        <a><i className="icon-dribbble2" /></a>
                        <a><i className="icon-youtube" /></a>
                    </p>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
