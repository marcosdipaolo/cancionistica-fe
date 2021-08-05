import { AxiosResponse } from "axios";
import { observer } from "mobx-react-lite";
import { FC, Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { useInjection } from "../../container/inversify-hook";
import { IAuthService } from "../../services/AuthService";
import { UserRegistrationResponse } from "../../stores/data-stores/UserStore";
import { useStore } from "../../stores/helpers/useStore";
import Noti from "../messages/Noti";
import SectionTitle from "../shared/SectionTitle";
import { TYPES } from "../../container/types";

const Login: FC = () => {
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ calling, setCalling ] = useState(false);
  const [ unauthorized, setUnauthorized ] = useState(false);
  
  const { dataStore: { userStore } } = useStore();

  const authService = useInjection<IAuthService>(TYPES.authService);

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setUnauthorized(false);
    authService.login(
      { email, password }
    ).then((res: AxiosResponse) => {
      const { data }: { data: UserRegistrationResponse; } = res;
      userStore.login(data);
    }).catch(err => {
      setUnauthorized(true);
      setCalling(false);
    });
    setCalling(true);
  };

  const alertVisible = () => {
    setTimeout(() => {
      setUnauthorized(false);
    }, 5000);
    return unauthorized;
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <SectionTitle title="Iniciá Sesión"/>
        <div className="container">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <div className="form-group">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Escribí tu email"
                  className="form-control mb-5"
                />
              </div>
              <div className="form-group">

                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Escribí tu contraseña"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary d-block w-100 mt-5" style={{ height: "45px" }}
                        disabled={calling || unauthorized}>
                  {calling ? (<span className="spinner-grow text-white m-0" role="status" aria-hidden="true"/>) : ""}
                  {calling ? "" : <Fragment>Login</Fragment>}
                </button>
              </div>
              <Noti message="Credenciales no válidas" colorClass="danger" visible={alertVisible()}/>
            </div>
          </div>
        </div>
      </form>
      {userStore.loggedUser ? <Redirect to="/"/> : ""}
    </div>
  );
};

export default observer(Login);
