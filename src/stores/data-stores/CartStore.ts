import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { TYPES } from "../../container/types";
import { Course } from "../../models/Course";
import { INotificationService, NotificationType } from "../../services/NotificationService";

@injectable()
export class CartStore {
  private localCart: Course[] = [];
  @inject(TYPES.notificationService) private notificationService!: INotificationService;
  constructor() {
    makeAutoObservable(this);
    this.localCart = this.cart;
  }

  get cart(): Course[] {
    return this.localCart.length ? this.localCart : this.getPersistedCart();
  }

  addToCart(course: Course) {
    if (this.isInCart(course)) {
      this.notificationService.createNotification(NotificationType.ERROR, "El curso ya está en el carrito");
      return;
    }
    this.localCart.push(course);
    this.persistCart();
  }

  removeFromCart(course: Course) {
    const index = this.localCart.indexOf(course);
    this.localCart.splice(index, 1);
    this.persistCart();
  }

  emptyCart() {
    this.localCart = [];
    this.persistCart();
  }

  isInCart(course: Course): boolean {
    return !!this.localCart.find((_course: Course) => { return course.id === _course.id; });
  }

  private persistCart() {
    window.localStorage.setItem("cart", JSON.stringify(this.localCart));
  }

  private getPersistedCart(): Course[] {
    const storedCart = window.localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }

  get total(): number {
    return this.cart.reduce((carry: number, course: Course) => { carry += course.price; return carry; }, 0);
  }
}