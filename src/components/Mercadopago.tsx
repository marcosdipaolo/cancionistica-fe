import { FC, Fragment } from "react";

const Mercadopago: FC = () => { return (
  <Fragment>
    <script src="https://sdk.mercadopago.com/js/v2"></script>
    <script dangerouslySetInnerHTML={ { __html: "const mp = new MercadoPago('PUBLIC_KEY', {locale: 'es-AR'});mp.checkout({preference: {id:'YOUR_PREFERENCE_ID'},render: {container: '.cho-container', label: 'Pagar'}});" } } ></script>
  </Fragment>
)};

export default Mercadopago;