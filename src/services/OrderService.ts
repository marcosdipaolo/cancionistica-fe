import { AxiosResponse } from "axios";
import { injectable } from "inversify";
import cancionistica from "../api/cancionistica";

export interface IOrderService {
  getOrders(): Promise<AxiosResponse<OrderResponse[]>>
}

export interface OrderResponse {
  id: string
  user_id: string
  preference_id: string 
}

@injectable()
export class OrderService implements IOrderService {
  getOrders(): Promise<AxiosResponse<OrderResponse[]>> {
    return cancionistica.get("/api/orders");
  }
}