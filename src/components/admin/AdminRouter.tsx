import { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminHomePage from "./pages/AdminHomePage";
import AdminProfilePage from "./pages/AdminProfilePage";
import AdminPurchasesPage from "./pages/AdminPurchasesPage";
import AdminModulesPage from "./pages/AdminModulesPage";
import Sidebar from "./Sidebar";
import Nav from "../Nav";

const AdminRouter: FC = () => (
  <Router>
    <Nav />
    <aside>
      <Sidebar />
    </aside>
    <Switch>
      <Route exact={true} path="/admin" component={AdminHomePage} />
      <Route exact={true} path="/admin/profile" component={AdminProfilePage} />
      <Route exact={true} path="/admin/purchases" component={AdminPurchasesPage} />
      <Route exact={true} path="/admin/modules" component={AdminModulesPage} />
    </Switch>
  </Router>
);

export default AdminRouter;