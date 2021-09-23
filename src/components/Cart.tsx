import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Course } from "../models/Course";
import { useStore } from "../stores/helpers/useStore";

const Cart: FC = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL;
  const { dataStore: { userStore, cartStore, courseStore } } = useStore();
  const [ cartInactive, setCartInactive ] = useState(true);

  useEffect(() => {
    setCartInactive((!userStore.personalInfo) || (!userStore.getLoggedUser()?.emailVerifiedAt));
  }, [ userStore.personalInfo ]);

  const renderCoursesInCart = () => (
    <>
      { cartStore.cart.map((course: Course) => {
        const image = course.images.find(img => img.size === "thumbnail");
        return (
          <div className="cart-item" key={ course.id }>
            <hr style={ { backgroundColor: "#b2b2b2", color: "#b2b2b2" } } />
            <div className="info-container d-flex justify-content-between">
              <div className="image" style={ { backgroundImage: `url(${backendBaseUrl}/${image?.path || ""})` } }>
              </div>
              <div className="content flex-fill px-4">
                <Link to={ `/courses/${course.id}` }><h4>{ course.title }</h4></Link>
                <h6>{ course.sub_title }</h6>
                <p>Precio: $ { course.price }.-</p>
              </div>
              <i style={ { cursor: 'pointer' } } onClick={ () => cartStore.removeFromCart(course) } className="icon-bin float-end text-danger" />
            </div>
          </div>
        );
      }) }
    </>
  );

  const renderCourseThumb = (course: Course) => {
    return course.images.find(image => image.size === "thumbnail");
  };

  const message = () => {
    const verified = !!userStore.getLoggedUser()?.emailVerifiedAt;
    const info = !!userStore.personalInfo;
    return (
      <>
        <i className="icon-info fs-3" /><br /> Por favor {
          !(info) && <><strong>completá la información personal</strong> en el formulario de arriba<br /></>
        } {
          (!verified) && (!info) && "y "
        }{
          !(verified) && <Link to="/admin"><strong><em><u>verificá tu dirección de correo electrónico</u></em></strong></Link>
        } para poder comprar.
      </>
    );
  };

  return (
    <div className="mt-5">
      <div className={ `container cart-detail mb-4` }>
        <div className="row">
          <div className={ `cart-content col-md-8` }>
            { !cartStore.cart.length && (
              <>
                <br />
                <h3 className="text-center">No hay cursos seleccionados para ser comprados</h3>
                <br />
              </>
            ) }
            { !!cartStore.cart.length && (
              <>{ renderCoursesInCart() }</>
            ) }
            <br />

            <p className="text-center text-danger mt-4" style={ { display: cartInactive ? "block" : "none", fontSize: "16px" } } >
              { message() }
            </p>
            {!!cartStore.cart.length && <div className="text-center">
              { cartInactive ? 
                <button className="btn" id="go-shopping" disabled>ir a comprar</button> : 
                <Link to="/purchase"><button className="btn" id="go-shopping">ir a comprar</button></Link>
              }
            </div>}
          </div>
          <div className="sidebar col-md-4">
            { courseStore.courses.filter(course => !cartStore.isInCart(course)).map(course => (
              <article key={ course.id } className="p-2 clearfix">
                <div className="sidebar-course-thumb" style={ {
                  backgroundImage: `url(${backendBaseUrl}/${renderCourseThumb(course)?.path})`
                } }></div>
                <div className="info">{ course.title }
                  <i onClick={ () => cartStore.addToCart(course) } className="icon-cart float-end"></i>
                </div>
              </article>
            )) }
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default observer(Cart);