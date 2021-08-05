import { FC, ReactNode } from "react";
import Nav from "../Nav";
import Sidebar from "../Sidebar";

interface Children {
  children: (Element | ReactNode)[] | (Element | ReactNode);
}

const Page: FC<Children> = ({ children }: Children) => (
  <div className="admin-page">
    <div className="container-fluid">
      <main>
        {children}
      </main>
    </div>
  </div>
);

export default Page;
