import { FC, useEffect } from "react";
import Page from "../shared/Page";
import { useMercadopago } from 'react-sdk-mercadopago';
import { useStore } from "../../stores/helpers/useStore";
import { observer } from "mobx-react-lite";

const PrePurchasePage: FC = () => {
  const { dataStore: { paymentStore } } = useStore();
  const mercadopago = useMercadopago.v2('TEST-c738662f-36d6-4931-a7f4-82205bc55a09', {
    locale: 'es-AR'
  });

  useEffect(() => {
    if (mercadopago && paymentStore.getPreferenceId()) {      
      mercadopago.checkout({
        preference: {
          id: paymentStore.getPreferenceId()
        },
        render: {
          container: '.cho-container',
          label: 'Pagar',
        }        
      });
    }
  }, [ mercadopago, paymentStore.getPreferenceId() ]);
  return (
    <Page>
      <div className="container">
        <div>
          <h1 className="text-center">Pre Compra</h1>
          <div className="cho-container"></div>
        </div>
      </div>
    </Page>
  );
};

export default observer(PrePurchasePage);