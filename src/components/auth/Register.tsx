import { FC, useState } from "react";
import { useStore } from "../../stores/helpers/useStore";
import SectionTitle from "../shared/SectionTitle";
import { IAuthService } from "../../services/AuthService";
import { UserRegistrationResponse } from "../../stores/data-stores/UserStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import { useHistory } from "react-router-dom";

const Register: FC = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
  const [ calling, setCalling ] = useState(false);
  const history = useHistory();

  const { dataStore: { userStore } } = useStore();

  const authService = useInjection<IAuthService>(TYPES.authService);

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    authService.register(
      { name, email, password, password_confirmation: passwordConfirmation }
    ).then(({ data }: { data: UserRegistrationResponse }) => {
      setCalling(false);
      userStore.login(data);
      history.push("/");
    }).catch(err => console.log(err));
    setCalling(true);
  };

  return (
    <div className="container">
      <form onSubmit={ onSubmit }>
        <SectionTitle title="Registro"/>
        <div className="row">
          <div className="col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-5">
            <div className="form-group">
              <input
                onChange={ (e) => setName(e.target.value) }
                value={ name }
                type="text"
                placeholder="Tu nombre"
                className="form-control mb-5"
              />
              <input
                onChange={ (e) => setEmail(e.target.value) }
                value={ email }
                type="email"
                placeholder="Tu email"
                className="form-control mb-5"
              />
              <input
                onChange={ (e) => setPassword(e.target.value) }
                value={ password }
                type="password"
                placeholder="Tu contraseña"
                className="form-control mb-5"
              />
              <input
                onChange={ (e) => setPasswordConfirmation(e.target.value) }
                value={ passwordConfirmation }
                type="password"
                placeholder="Confirmación de la contraseña"
                className="form-control"
              />
              <div className="form-group">
                <button type="submit" className="btn btn-primary d-block w-100 mt-5" style={ { height: "45px" } }
                        disabled={ calling }>
                  { calling ? (<span className="spinner-grow text-white m-0" role="status" aria-hidden="true" />) : "" }
                  { calling ? "" : "Register" }
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default observer(Register);
