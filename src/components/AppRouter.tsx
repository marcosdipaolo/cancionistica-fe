import { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminProfilePage from "./admin/pages/AdminProfilePage";
import AdminPurchasesPage from "./admin/pages/AdminPurchasesPage";
import AdminModulesPage from "./admin/pages/AdminModulesPage";
import AdminHomePage from "./admin/pages/AdminHomePage";
import SingleModulePage from "./pages/SingleModulePage";
import AdminBlogPage from "./admin/pages/AdminBlogPage";
import AdminNewPostPage from "./admin/pages/AdminNewPostPage";
import Logout from "./auth/Logout";

const AppRouter: FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ HomePage } />
      <Route exact path="/about" component={ AboutPage } />
      <Route exact path="/contact" component={ ContactPage } />
      <Route exact path="/login" component={ LoginPage } />
      <Route exact path="/logout" component={ Logout } />
      <Route exact path="/register" component={ RegisterPage } />
      <Route exact path="/modules/:id" component={ SingleModulePage } />
      <Route exact path="/admin" component={ AdminHomePage } />
      <Route exact path="/admin/profile" component={ AdminProfilePage } />
      <Route exact path="/admin/purchases" component={ AdminPurchasesPage } />
      <Route exact path="/admin/modules" component={ AdminModulesPage } />
      <Route exact path="/admin/blog" component={ AdminBlogPage } />
      <Route exact path="/admin/blog/new" component={ AdminNewPostPage } />
    </Switch>
  </Router>
);

export default AppRouter;