import {FC, ReactNode} from "react";
import Footer from "../Footer";
import Header from "../Header";

interface Children {
    children: (Element | ReactNode)[] | (Element | ReactNode);
}

const Page: FC<Children> = ({ children }: Children) => (
    <div id="fh5co-page">
        <Header/>
        {children}
        <Footer/>
    </div>
);

export default Page;
