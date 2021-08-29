import { FC, useEffect, useState } from "react";
import Page from "../shared/Page";
import { useMercadopago } from 'react-sdk-mercadopago';
import { useStore } from "../../stores/helpers/useStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import { ICourseService } from "../../services/CourseService";
import { Course } from "../../models/Course";

const PrePurchasePage: FC = () => {
  const { dataStore: { paymentStore } } = useStore();
  const mercadopago = useMercadopago.v2(process.env.REACT_APP_MP_PUBLIC_KEY!, {
    locale: 'es-AR'
  });
  const { id } = useParams<{ id: string; }>();
  const courseService = useInjection<ICourseService>(TYPES.courseService);
  const [ course, setCourse ] = useState<Course>();
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL;
  const { dataStore: { userStore } } = useStore();

  useEffect(() => {
    courseService.getCourse(id).then(({ data }) => {
      setCourse(data);
    });
  }, []);

  useEffect(() => {
    if (course) {
      userStore.loggedOrRedirect().then(() => {
        paymentStore.getMercadopagoPreferenceId(course);
      });
    }
    return () => {
      paymentStore.clearPreferenceId();
    };
  }, [ course ]);

  useEffect(() => {
    if (mercadopago && paymentStore.preferenceId) {
      mercadopago.checkout({
        preference: {
          id: paymentStore.preferenceId
        },
        render: {
          container: '.cho-container',
          label: 'Comprar',
        }
      });
    }
  }, [ mercadopago, paymentStore.preferenceId ]);

  if (!course || !paymentStore.preferenceId) {
    return (
      <Page>
        <div className="container d-flex" style={{ height: 'calc(100vh - 200px)', fontSize: '50px', color: '#5D7A91' }}>
          <i className="spinner d-inline-block icon-spinner9 m-auto" />
        </div>
        <div className="cho-container d-none"></div>
      </Page>
    );
  }

  const image = course.images.find(img => img.size === "thumbnail");

  return (
    <Page>
      <div className="container mb-4">
        <div>
          <h1 className="text-center">Estás comprando un<br />módulo de Cancionística</h1>
          <hr style={{ backgroundColor: "#b2b2b2", color: "#b2b2b2" }} />
          <div className="info-container pt-4 d-flex justify-content-between">
            <div className="image">
              <img src={`${backendBaseUrl}/${image?.path || ""}`} alt="" width="300" />
            </div>
            <div className="content flex-fill px-4">
              <h4>{course.title}</h4>
              <h6>{course.sub_title}</h6>
              <p>Precio: $ {course.price}.-</p>
              <div className="cho-container"></div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default observer(PrePurchasePage);