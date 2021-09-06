import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMercadopago } from "react-sdk-mercadopago/lib";
import { Course } from "../models/Course";
import { useStore } from "../stores/helpers/useStore";

const Cart: FC = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL;
  const mercadopago = useMercadopago.v2(process.env.REACT_APP_MP_PUBLIC_KEY!, {
    locale: 'es-AR'
  });
  const buttonContainer = useRef<HTMLDivElement>(null);
  const { dataStore: { userStore, cartStore, paymentStore } } = useStore();

  const [ cartInactive, setCartInactive ] = useState(true);

  useEffect(() => {
    userStore.loggedOrRedirect().then((logged) => {
      if (logged && cartStore.cart.length) {
        paymentStore.getMercadopagoPreferenceId();
      }
    });
    return () => {
      paymentStore.clearPreferenceId();
    };
  }, [ cartStore.cart.length ]);


  useEffect(() => {
    setCartInactive(!userStore.personalInfo);
  }, [ userStore.personalInfo ]);

  useEffect(() => {
    if (
      mercadopago
      && paymentStore.preferenceId
      && buttonContainer.current
      && !buttonContainer.current.children.length
    ) {
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
  }, [ mercadopago, paymentStore.preferenceId, buttonContainer ]);


  const renderCourses = () => (
    <>
      { cartStore.cart.map((course: Course) => {
        const image = course.images.find(img => img.size === "thumbnail");
        return (
          <div key={ course.id }>
            <hr style={ { backgroundColor: "#b2b2b2", color: "#b2b2b2" } } />
            <div className="info-container pt-4 d-flex justify-content-between">
              <div className="image" style={ { backgroundImage: `url(${backendBaseUrl}/${image?.path || ""})` } }>
              </div>
              <div className="content flex-fill px-4">
                <Link to={ `/courses/${course.id}` }><h4>{ course.title }</h4></Link>
                <h6>{ course.sub_title }</h6>
                <p>Precio: $ { course.price }.-</p>
              </div>
            </div>
          </div>
        );
      }) }
    </>
  );

  if (!cartStore.cart.length) {
    return (
        <div className="container mt-5">
          <h3 className="text-center">No hay cursos seleccionados para ser comprados</h3>
        </div>
    );
  }

  if (!paymentStore.preferenceId && cartStore.cart.length) {
    return (
      <>
        <div className="container d-flex" style={ { height: 'calc(100vh - 200px)', fontSize: '50px', color: '#5D7A91' } }>
          <i className="spinner d-inline-block icon-spinner9 m-auto" />
        </div>
        <div className="cho-container d-none"></div>
      </>
    );
  }

  return (
    <div className={ `container cart-detail mb-4${cartInactive ? ' disabled' : ''}` }>
      { renderCourses() }
      <br />
      <div ref={ buttonContainer } className={ `cho-container text-center${cartInactive ? '  d-none' : ''}` }></div>
    </div>
  );
};

export default observer(Cart);