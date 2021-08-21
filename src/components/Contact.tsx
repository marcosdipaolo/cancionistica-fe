import { FC, SyntheticEvent, useState } from "react";
import { container } from "../container/inversify.config";
import { TYPES } from "../container/types";
import { IContactFormService } from "../services/ContactFormService";

const Contact: FC = () => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ message, setMessage ] = useState("");
  const contactFormService = container.get<IContactFormService>(TYPES.contactFormService);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      contactFormService.sendContactFormEmail({ name, email, message });
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = (): void => {
    setName("");
    setEmail("");
    setMessage("");
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
            <form onSubmit={ onSubmit }>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      onChange={ (e) => setName(e.target.value) }
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={ name }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      onChange={ (e) => setEmail(e.target.value) }
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={ email }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea
                      onChange={ (e) => setMessage(e.target.value) }
                      className="form-control"
                      cols={ 30 }
                      rows={ 7 }
                      placeholder="Message"
                      value={ message }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">Enviar</button>
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
