import { injectable } from "inversify";
import cancionistica from "../api/cancionistica";
import { snakeToCamelObj } from "../helpers/snakeToCamel";
import { Order } from "../models/Order";

export interface IOrderService {
  getOrders(all: boolean): Promise<Order[]>;
}
export interface OrderResponse {
  id: string;
  user_id: string;
  preference_id: string;
}

@injectable()
export class OrderService implements IOrderService {
  async getOrders(all: boolean = false): Promise<Order[]> {
    const { data } = await cancionistica.get<OrderResponse[]>(`/api/orders${all ? "-all" : ""}`);
    return data.map(order => snakeToCamelObj<OrderResponse, Order>(order));
  }
}