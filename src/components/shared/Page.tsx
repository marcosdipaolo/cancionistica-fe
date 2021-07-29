import {FC, MouseEventHandler} from "react";
import Footer from "../Footer";
import Intro from "../Intro";
import Header from "../Header";

interface NavProps {
    toggleMenu: MouseEventHandler
}

const Page: FC<NavProps> = (props) => (
    <div id="fh5co-page">
        <Header toggleMenu={props.toggleMenu}/>
        { props.children }
        <Footer/>
    </div>
)

export default Page;
