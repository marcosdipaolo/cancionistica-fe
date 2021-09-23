import { FC, useEffect } from "react";
import { useInjection } from "../../../container/inversify-hook";
import { TYPES } from "../../../container/types";
import history from "../../../history";
import { authMessages } from "../../../messages/messages";
import { INotificationService, NotificationType } from "../../../services/NotificationService";
import { useStore } from "../../../stores/helpers/useStore";
import OrdersTable from "../OrdersTable";
import AdminPage from "../shared/AdminPage";

const AdminPaymentsPage: FC = () => {

  const { dataStore: { userStore } } = useStore();

  const notificationService = useInjection<INotificationService>(TYPES.notificationService);

  useEffect(() => {
    if(!userStore.isAdmin) {
      history.push("/admin");
      notificationService.createNotification(NotificationType.WARNING, authMessages.onlyAdmin);
    }
  }, []);

  return (
    <AdminPage>
      <OrdersTable all={ true } />
    </AdminPage>
  );
};

export default AdminPaymentsPage;