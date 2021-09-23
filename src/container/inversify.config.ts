import { Container } from "inversify";
import { IAuthService, AuthService } from "../services/AuthService";
import { ContactFormService, IContactFormService } from "../services/ContactFormService";
import { TYPES } from "./types";
import { INotificationService, NotificationService } from "../services/NotificationService";
import { BlogService, IBlogService } from "../services/BlogService";
import { DataStore } from "../stores/data-stores/DataStore";
import { UiStore } from "../stores/UiStore";
import { BlogStore } from "../stores/data-stores/BlogStore";
import { UserStore } from "../stores/data-stores/UserStore";
import { AdminUiStore } from "../stores/AdminUiStore";
import { RootStore } from "../stores/RootStore";
import { IPaymentService, PaymentService } from "../services/PaymentService";
import { PaymentStore } from "../stores/data-stores/PaymentStore";
import { CourseStore } from "../stores/data-stores/CourseStore";
import { CourseService, ICourseService } from "../services/CourseService";
import { IUserService, UserService } from "../services/UserService";
import { CartStore } from "../stores/data-stores/CartStore";
import { IOrderService, OrderService } from "../services/OrderService";
import { ILocalStorageService, LocalStorageService } from "../services/LocalStorageService";
import { EncryptionService, IEncryptionService } from "../services/EncryptionService";

const container = new Container();

container.bind<IAuthService>(TYPES.authService).to(AuthService);
container.bind<IContactFormService>(TYPES.contactFormService).to(ContactFormService);
container.bind<INotificationService>(TYPES.notificationService).to(NotificationService);
container.bind<IBlogService>(TYPES.blogService).to(BlogService);
container.bind<IPaymentService>(TYPES.paymentService).to(PaymentService);
container.bind<ICourseService>(TYPES.courseService).to(CourseService);
container.bind<IUserService>(TYPES.userService).to(UserService);
container.bind<IOrderService>(TYPES.orderService).to(OrderService);
container.bind<ILocalStorageService>(TYPES.localStorageService).to(LocalStorageService);
container.bind<IEncryptionService>(TYPES.encryptionService).to(EncryptionService);

container.bind<DataStore>(TYPES.dataStore).to(DataStore);
container.bind<CartStore>(TYPES.cartStore).to(CartStore);
container.bind<UiStore>(TYPES.uiStore).to(UiStore);
container.bind<AdminUiStore>(TYPES.adminUiStore).to(AdminUiStore);
container.bind<BlogStore>(TYPES.blogStore).to(BlogStore);
container.bind<CourseStore>(TYPES.courseStore).to(CourseStore);
container.bind<PaymentStore>(TYPES.paymentStore).to(PaymentStore);
container.bind<UserStore>(TYPES.userStore).to(UserStore);
container.bind<RootStore>(TYPES.rootStore).to(RootStore);

export { container };
