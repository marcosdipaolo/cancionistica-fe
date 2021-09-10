import "../../sass/style.scss";
import { FC, Fragment, ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Nav from "../Nav";

interface Children {
  children: (Element | ReactNode)[] | (Element | ReactNode);
}

const Page: FC<Children> = ({ children }: Children) => (
  <Fragment>
    <Nav />
    <div id="fh5co-page">
      <Header />
      <br />
      { children }
      <Footer />
    </div>
  </Fragment>
);

export default Page;
