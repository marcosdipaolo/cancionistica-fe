import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef } from "react";
import { useMercadopago } from "react-sdk-mercadopago/lib";
import { useStore } from "../stores/helpers/useStore";

const Mercadopago: FC = () => {
  const { dataStore: { userStore, cartStore, paymentStore } } = useStore();
  const mercadopago = useMercadopago.v2(process.env.REACT_APP_MP_PUBLIC_KEY!, {
    locale: 'es-AR'
  });
  const buttonContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    userStore.loggedOrRedirect().then((logged) => { 
      if (logged && cartStore.cart.length) {
        paymentStore.clearPreferenceId();
        paymentStore.getMercadopagoPreferenceId(cartStore.cart);
      }
      if (!cartStore.cart.length) {
        paymentStore.clearPreferenceId();
      }
    });
    return () => {
      paymentStore.clearPreferenceId();
    };
  }, []);

  useEffect(() => {
    if (mercadopago && paymentStore.preferenceId) {
      buttonContainer.current.innerHTML = "";
      mercadopago.checkout({
        preference: {
          id: paymentStore.preferenceId
        },
        render: {
          container: '.cho-container',
          label: 'Pagar',
        }
      });
    }
  }, [ paymentStore.preferenceId ]);


  return <div 
    ref={ buttonContainer } 
    className={ `cho-container text-center${!paymentStore.preferenceId ? '  d-none' : ''}` } 
  />
};

export default observer(Mercadopago);