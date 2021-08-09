import { FC, useEffect } from "react";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import { IAuthService } from "../../services/AuthService";
import { useStore } from "../../stores/helpers/useStore";
import { NotificationType } from "../../services/NotificationService";
import { INotificationService } from "../../services/NotificationService";
import { useHistory } from "react-router-dom";

const Logout: FC = () => {
  const notiService = useInjection<INotificationService>(TYPES.notificationService);
  const authService = useInjection<IAuthService>(TYPES.authService);
  const { dataStore: { userStore } } = useStore();
  const history = useHistory();
  useEffect(() => {
    try {
      notiService.createNotification(NotificationType.SUCCESS, "Has cerrado sesión");
      authService.logout();
      userStore.logout();
    } catch ( err ) {
      notiService.createNotification(NotificationType.ERROR, err.message);
    }
    history.push("/");
  }, [ notiService, authService, userStore, history ]);
  return (
    <div>{ }</div>
  );
};

export default Logout;
