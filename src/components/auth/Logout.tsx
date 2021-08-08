import { FC } from "react";
import { Redirect } from "react-router-dom";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import { IAuthService } from "../../services/AuthService";
import { useStore } from "../../stores/helpers/useStore";

const Logout: FC = () => {
  const { dataStore: { userStore } } = useStore();
  const authService = useInjection<IAuthService>(TYPES.authService);
  authService.logout();
  userStore.logout();
  return (
    <Redirect to="/" />
  );
}

export default Logout;