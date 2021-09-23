import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import OrderDetail from "../OrderDetail";
import Mercadopago from "../Mercadopago";
import Page from "../shared/Page";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/helpers/useStore";

const PurchasePage: FC = () => {
  const { dataStore: { paymentStore } } = useStore();

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  return (
    <Page>
      <div className="container">
        { !paymentStore.preferenceId && (
          <>
            <div className="container d-flex" style={ { height: '200px', fontSize: '50px', color: '#5D7A91' } }>
              <i className="spinner d-inline-block icon-spinner9 m-auto" />
            </div>
            <div className="cho-container d-none"></div>
          </>
        ) }
        { paymentStore.preferenceId && (<OrderDetail />) }
        <br />
        <div className="d-flex justify-content-end">
          <div className="text-center me-2">
            <Link to="/courses/pre-purchase" className="btn btn-primary text-uppercase">Volver al carrito</Link>
          </div>
          <Mercadopago />
        </div>
      </div>
    </Page>);
};

export default observer(PurchasePage);