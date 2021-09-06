import { useFormik } from "formik";
import { FC, useState } from "react";
import { container } from "../container/inversify.config";
import { TYPES } from "../container/types";
import { IContactFormService } from "../services/ContactFormService";
import * as Yup from "yup";

const Contact: FC = () => {
  const contactFormService = container.get<IContactFormService>(TYPES.contactFormService);
  const [ sending, setSending ] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Mínimo 3 caracteres").required("El nombre es obligatorio"),
      email: Yup.string().email("El email ingresado no es válido").required("El email es obligatorio"),
      message: Yup.string().min(10, "Mínimo 10 caracteres").required("El mensaje es obligatorio")
    }),
    onSubmit: async ({ name, email, message }) => {
      try {
        setSending(true);
        await contactFormService.sendContactFormEmail({ name, email, message });
        setSending(false);
      } catch (err) {
        setSending(false);
        console.log(err);
      }
    }
  });

  const renderError = (field: ("email" | "name" | "message")) => {
    return formik.touched[ field ] && formik.errors[ field ]
      ? (<div className="invalid-feedback">{formik.errors[ field ]}</div>)
      : null;
  };

  return (
    <div id="fh5co-contact-section">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-md-push-1 animate-box">
            <h3>Mi dirección</h3>
            <ul className="contact-info">
              <li>
                <i className="icon-location-pin"></i>Aguirre 157 dto G,
                Villa Crespo, CABA
              </li>
              <li>
                <i className="icon-phone2"></i>+54 9 11 57987824
              </li>
              <li>
                <i className="icon-mail"></i>
                <a href="#">luchoguedes@gmail.com</a>
              </li>
              <li>
                <i className="icon-globe2"></i>
                <a href="#">cancionistica.com.ar</a>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-md-push-1 animate-box">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className={`form-group${formik.touched.name && formik.errors.name ? ' mb-0' : ''}`}>
                    <input
                      type="text"
                      className={`form-control${formik.touched.name && formik.errors.name ? ' is-invalid' : ''}`}
                      placeholder="Name"
                      {...formik.getFieldProps("name")}
                    />
                    {renderError("name")}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={`form-group${formik.touched.email && formik.errors.email ? ' mb-0' : ''}`}>
                    <input
                      type="text"
                      className={`form-control${formik.touched.email && formik.errors.email ? ' is-invalid' : ''}`}
                      placeholder="Email"
                      {...formik.getFieldProps("email")}
                    />
                    {renderError("email")}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea
                      className={`form-control${formik.touched.message && formik.errors.message ? ' is-invalid' : ''}`}
                      cols={30}
                      rows={7}
                      placeholder="Message"
                      {...formik.getFieldProps("message")}
                    />
                    {renderError("message")}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary" disabled={sending} style={{width: '80px'}}>
                      {sending ? <span className="spinner-grow spinner-grow-sm text-white mb-0" role="status" aria-hidden="true"></span> : 'Enviar'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
