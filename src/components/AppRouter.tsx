import { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Nav from "./Nav";
import AdminProfilePage from "./admin/pages/AdminProfilePage";
import AdminModulesPage from "./admin/pages/AdminModulesPage";
import AdminPurchasesPage from "./admin/pages/AdminPurchasesPage";
import AdminApp from "./admin/AdminApp";

const AppRouter: FC = () => (
  <Router>
    <Nav />
    <Switch>
      <Route exact={true} path="/" component={HomePage} />
      <Route exact={true} path="/about" component={AboutPage} />
      <Route exact={true} path="/contact" component={ContactPage} />
      <Route exact={true} path="/login" component={LoginPage} />
      <Route exact={true} path="/register" component={RegisterPage} />
      <Route exact={true} path="/admin" component={AdminApp} />
      <Route exact={true} path="/admin/profile" component={AdminProfilePage} />
      <Route exact={true} path="/admin/purchases" component={AdminPurchasesPage} />
      <Route exact={true} path="/admin/modules" component={AdminModulesPage} />
    </Switch>
  </Router>
);

export default AppRouter;