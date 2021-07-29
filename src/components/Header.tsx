import {FC, MouseEventHandler} from "react";

interface HeaderProps {
    toggleMenu: MouseEventHandler
}

const Header: FC<HeaderProps> = ({toggleMenu}) => (
    <header>
        <div className="container">
            <div className="fh5co-navbar-brand">
                <h1 className="text-center"><a className="fh5co-logo" href="index.html">Cancionística</a></h1>
                <a onClick={toggleMenu} className={`js-fh5co-nav-toggle fh5co-nav-toggle`}><i /></a>
            </div>
        </div>
    </header>
)


export default Header;
