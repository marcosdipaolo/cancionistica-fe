import { FC } from "react";
import { Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPurchasesPage from "./admin/pages/AdminPurchasesPage";
import AdminHomePage from "./admin/pages/AdminHomePage";
import SingleCoursePage from "./courses/SingleCoursePage";
import AdminBlogPage from "./admin/pages/AdminBlogPage";
import AdminNewPostPage from "./admin/pages/AdminNewPostPage";
import Logout from "./auth/Logout";
import SinglePostPage from "./pages/SinglePostPage";
import AdminEditPost from "./admin/pages/AdminEditPost";
import { NotificationContainer } from "react-notifications";
import history from "../history";
import CartPage from "./pages/CartPage";
import ResetPasswordRequestPage from "./pages/ResetPasswordRequestPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PurchasePage from "./pages/PurchasePage";
import AdminPaymentsPage from "./admin/pages/AdminPaymentsPage";

const AppRouter: FC = () => (
  <Router history={ history }>
    <NotificationContainer />
    <Switch>
      <Route exact path="/" component={ HomePage } />
      <Route exact path="/about" component={ AboutPage } />
      <Route exact path="/contact" component={ ContactPage } />
      <Route exact path="/login" component={ LoginPage } />
      <Route exact path="/logout" component={ Logout } />
      <Route exact path="/register" component={ RegisterPage } />
      <Route exact path="/reset-password-request" component={ ResetPasswordRequestPage } />
      <Route exact path="/reset-password/:token" component={ ResetPasswordPage } />
      <Route exact path="/courses/pre-purchase" component={ CartPage } />
      <Route exact path="/purchase" component={ PurchasePage } />
      <Route exact path="/courses/:id" component={ SingleCoursePage } />
      <Route exact path="/blog/:id" component={ SinglePostPage } />
      <Route exact path="/admin" component={ AdminHomePage } />
      <Route exact path="/admin/purchases" component={ AdminPurchasesPage } />
      <Route exact path="/admin/payments" component={ AdminPaymentsPage } />
      <Route exact path="/admin/blog" component={ AdminBlogPage } />
      <Route exact path="/admin/blog/new" component={ AdminNewPostPage } />
      <Route exact path="/admin/blog/:id/edit" component={ AdminEditPost } />
    </Switch>
  </Router>
);

export default AppRouter;