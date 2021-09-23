import { FC, useEffect, useState } from "react";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import { Course } from "../../models/Course";
import { Order } from "../../models/Order";
import { IOrderService } from "../../services/OrderService";
import { useStore } from "../../stores/helpers/useStore";

const OrdersTable: FC<{ all?: boolean; }> = ({ all = false }) => {
  const orderService = useInjection<IOrderService>(TYPES.orderService);
  const { dataStore: { userStore } } = useStore();
  const [ orders, setOrders ] = useState([]);
  useEffect(() => {
    orderService.getOrders(all).then((orders: Order[]) => {
      console.log(orders);

      setOrders(orders);
    });
  }, [ all ]);

  return (
    <table className="table mt-5">
      <thead>
        <tr>
          <th>Información de la orden</th>
          <th>Detalle</th>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        { orders.map((order: Order) => (
          <tr key={ order.id }>
            <td className="order-info">
              <small className="p-0">
                <span>ID: { order.id }<br /></span>
                <span>Preferencia mercadopago:<br />{ order.preferenceId }</span><br />
                {userStore.isAdmin && (
                  <span style={{fontWeight: 500}}>
                    Usuario: {order.user.name + " <"}{order.user.email + ">"} <br />
                  </span>
                )}
              </small>
            </td>
            <td>
              <div>
                <ul className="list-group">
                  { order.courses.map((course: Course) => (
                    <li className="list-group-item" key={ course.id }>
                      <small className="d-inline-block">
                        <span className="title">{ course.title }</span><br />
                        <span className="price">Precio unitario: ${ course.price }.-</span><br />
                      </small>
                    </li>)
                  ) }
                </ul>
              </div>
            </td>
            <td>{ new Intl.DateTimeFormat("es-Ar").format(new Date(order.createdAt)) }</td>
            <td>${ order.amount }.-</td>
            <td>{ order.status }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
};

export default OrdersTable;