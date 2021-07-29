import "./sass/bootstrap.scss"
import "./sass/style.scss"
import Slider from "./components/Slider"
import Services from "./components/Services"
import Work from "./components/Work"
import Nav from "./components/Nav"
import Branding from "./components/Branding"
import Contact from "./components/Contact"
import Header from "./components/Header"
import Product from "./components/Product"
import Page from "./components/shared/Page";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import AboutUs from "./components/About";
import {useState, Fragment, useEffect} from "react";
import Intro from "./components/Intro"
import Login from "./components/auth/Login"

function App() {
    const [menuOpened, setMenuOpened] = useState(false)

    useEffect(() => {
        if (menuOpened) {
            document.body.classList.add("menu-show");
            return;
        }
        document.body.classList.remove("menu-show");
    }, [menuOpened])

    const toggleMenu = () => {
        setMenuOpened(!menuOpened);
    }
    return (
        <Fragment>
            <Router>
                <Nav toggleMenu={toggleMenu} menuOpened={menuOpened}/>
                <Switch>
                    <Route exact={true} path="/">
                        <Page toggleMenu={toggleMenu}>
                            <Intro
                                title="Lorem ipsum dolor sit amet, consectetur."
                                paragraph="Lorem ipsum dolor sit amet, consectetur."
                            />
                            <Slider/>
                            <Services/>
                            <Work/>
                            <Branding/>
                            <Product/>
                        </Page>
                    </Route>
                    <Route exact={true} path="/about">
                        <Page toggleMenu={toggleMenu}>
                            <AboutUs />
                        </Page>
                    </Route>
                    <Route exact={true} path="/contact">
                        <Page toggleMenu={toggleMenu}>
                            <Contact/>
                        </Page>
                    </Route>
                    <Route exact={true} path="/login">
                        <Page toggleMenu={toggleMenu}>
                            <Login/>
                        </Page>
                    </Route>
                </Switch>
            </Router>
        </Fragment>
    );
}

export default App;
