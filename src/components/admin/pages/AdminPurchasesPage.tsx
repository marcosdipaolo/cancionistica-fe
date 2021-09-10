import { FC, useEffect, useState } from "react";
import { useInjection } from "../../../container/inversify-hook";
import { TYPES } from "../../../container/types";
import { IOrderService } from "../../../services/OrderService";
import AdminPage from "../shared/AdminPage";

const AdminPurchasesPage: FC = () => {
  const orderService = useInjection<IOrderService>(TYPES.orderService);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    orderService.getOrders().then(({data}) => {
      setOrders(data)      
    });
  }, []);
  return (
    <AdminPage>
      <ul>
        {orders.map(order => <li>{order.id}</li>)}
      </ul>
    </AdminPage>
  );
};

export default AdminPurchasesPage;