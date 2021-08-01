import { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Nav from "./Nav";

const AppRouter: FC = () => (
  <Router>
    <Nav />
    <Switch>
      <Route exact={true} path="/" component={HomePage} />
      <Route exact={true} path="/about" component={AboutPage} />
      <Route exact={true} path="/contact" component={ContactPage} />
      <Route exact={true} path="/login" component={LoginPage} />
      <Route exact={true} path="/register" component={RegisterPage} />
    </Switch>
  </Router>
);

export default AppRouter;