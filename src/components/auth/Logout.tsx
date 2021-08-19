import { FC, useEffect } from "react";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import { IAuthService } from "../../services/AuthService";
import { useStore } from "../../stores/helpers/useStore";
import { INotificationService } from "../../services/NotificationService";
import history from "../../history";

const Logout: FC = () => {
  const notiService = useInjection<INotificationService>(TYPES.notificationService);
  const authService = useInjection<IAuthService>(TYPES.authService);
  const { dataStore: { userStore } } = useStore();
  useEffect(() => {
    try {
      userStore.logout();
    } catch (err) {
    }
    history.push("/");
  }, [ notiService, authService, userStore, history ]);
  return (
    <div>{ }</div>
  );
};

export default Logout;
