import { AxiosError, AxiosResponse } from "axios";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { useInjection } from "../../container/inversify-hook";
import { IAuthService } from "../../services/AuthService";
import { UserRegistrationResponse } from "../../stores/data-stores/UserStore";
import { useStore } from "../../stores/helpers/useStore";
import SectionTitle from "../shared/SectionTitle";
import { TYPES } from "../../container/types";
import { useHistory } from "react-router-dom";
import { INotificationService, NotificationType } from "../../services/NotificationService";

const Login: FC = () => {
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ calling, setCalling ] = useState(false);
  const history = useHistory();
  const notiService = useInjection<INotificationService>(TYPES.notificationService);

  const { dataStore: { userStore } } = useStore();

  const authService = useInjection<IAuthService>(TYPES.authService);

  const onSubmit = (e: { preventDefault: () => void; }) => {
    setCalling(true);
    e.preventDefault();
    authService.login(
      { email, password }
    ).then((res: AxiosResponse) => {
      notiService.createNotification(NotificationType.SUCCESS, "Has iniciado sesión exitosamente");
      const { data }: { data: UserRegistrationResponse; } = res;
      setCalling(false);
      userStore.login(data);
      history.push("/");
    }).catch(err => {
      let message;
      if (err.response) {
        switch (err.response.status) {
          case 422:
            message = "El formato de las credenciales no es correcto";
            break;
          case 403:
            message = "Las credenciales son incorrectas.";
            break;
          default:
            message = `Ocurrió un error de tipo ${err.response.status}`;
        }
      } else {
        message = "Ocurrió un error interno del servidor";
      }
      notiService.createNotification(NotificationType.ERROR, message);
      setCalling(false);
    });
  };

  return (
    <div>
      <form onSubmit={ onSubmit }>
        <SectionTitle title="Iniciá Sesión" />
        <div className="container">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <div className="form-group">
                <input
                  onChange={ (e) => setEmail(e.target.value) }
                  value={ email }
                  type="email"
                  placeholder="Escribí tu email"
                  className="form-control mb-5"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={ (e) => setPassword(e.target.value) }
                  value={ password }
                  type="password"
                  placeholder="Escribí tu contraseña"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary d-block w-100 mt-5" style={ { height: "45px" } }
                  disabled={ calling }>
                  { calling ? (<span className="spinner-grow text-white m-0" role="status" aria-hidden="true" />) : "" }
                  { calling ? "" : "Login" }
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default observer(Login);
