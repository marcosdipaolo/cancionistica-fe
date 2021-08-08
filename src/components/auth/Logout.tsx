import { FC } from "react";
import { Redirect } from "react-router-dom";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import { IAuthService } from "../../services/AuthService";
import { useStore } from "../../stores/helpers/useStore";
import { NotificationType } from "../../services/NotificationService";
import { INotificationService } from "../../services/NotificationService";

const Logout: FC = () => {
  const { dataStore: { userStore } } = useStore();
  const authService = useInjection<IAuthService>(TYPES.authService);
  const notiService = useInjection<INotificationService>(TYPES.notificationService);
  authService.logout();
  userStore.logout();
  notiService.createNotification(NotificationType.SUCCESS, "Has cerrado sesión.");
  return (
    <Redirect to="/"/>
  );
};

export default Logout;
