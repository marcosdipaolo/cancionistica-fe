import { FC } from "react";
import OrdersTable from "../OrdersTable";
import AdminPage from "../shared/AdminPage";

const AdminPurchasesPage: FC = () => {
  
  return (
    <AdminPage>
      <OrdersTable/>
    </AdminPage>
  );
};

export default AdminPurchasesPage;