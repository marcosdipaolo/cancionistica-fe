import { NotificationManager } from "react-notifications";
import { injectable } from "inversify";

export enum NotificationType {
  INFO	= 'info',
  SUCCESS	= 'success',
  WARNING	= 'warning',
  ERROR	= 'error'
}

export interface INotificationService {
  createNotification: (type: NotificationType, message: string) => void;
}

@injectable()
export class NotificationService implements INotificationService {
  createNotification = (type: NotificationType, message: string) => {
    switch ( type ) {
      case NotificationType.SUCCESS:
        NotificationManager.success(message, "", 3000);
        break;
      case NotificationType.ERROR:
        NotificationManager.error(message, "", 3000);
        break;
      case NotificationType.WARNING:
        NotificationManager.warning(message, "", 3000);
        break;
      default:
        NotificationManager.info(message, "", 3000);
        break;
    }
  };
}
