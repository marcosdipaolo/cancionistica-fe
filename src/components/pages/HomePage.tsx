import { FC, useEffect } from "react";
import Slider from "../Slider";
import Intro from "../Intro";
import Services from "../services/Services";
import Page from "../shared/Page";
import Courses from "../courses/Courses";
import { RouteComponentProps } from "react-router-dom";
import { parseQS } from "../../helpers/queryStringParser";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import { IPaymentService } from "../../services/PaymentService";
import { INotificationService, NotificationType } from "../../services/NotificationService";

export interface MercadoPagoResponse {
  collection_id: string,
  collection_status: string,
  payment_id: string,
  status: string,
  external_reference: string,
  payment_type: string,
  merchant_order_id: string,
  preference_id: string,
  site_id: string,
  processing_mode: string,
  merchant_account_id: string,
}

const HomePage: FC<RouteComponentProps> = ({ location }) => {
  const paymentService = useInjection<IPaymentService>(TYPES.paymentService);
  const notificationService = useInjection<INotificationService>(TYPES.notificationService);
  const parsed = parseQS(location.search);
  useEffect(() => {
    if ('preference_id' in parsed) {
      paymentService.postMPResponse(parsed);
      notificationService.createNotification(NotificationType.SUCCESS, "Su pago se inició correctamente");
      console.log("notifying");      
    }
  }, [parsed]);

  return (
    <Page>
      <Intro
        title="Lorem ipsum dolor sit amet, consectetur."
        paragraph="Lorem ipsum dolor sit amet, consectetur."
      />
      <Slider />
      <Services />
      <Courses />
    </Page>
  );
};
export default HomePage;
