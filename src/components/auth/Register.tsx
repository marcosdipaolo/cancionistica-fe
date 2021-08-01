import { FC, useState } from "react";
import { useStore } from "../../stores/helpers/useStore";
import SectionTitle from "../shared/SectionTitle";
import { AuthService } from "../../services/AuthService";
import { UserRegistrationResponse } from "../../stores/data-stores/UserStore";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react-lite";

const Register: FC = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
  const [ calling, setCalling ] = useState(false);
  const { dataStore: { userStore } } = useStore();

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    AuthService.register(
      { name, email, password, password_confirmation: passwordConfirmation }
    ).then((data: UserRegistrationResponse) => {
      setCalling(false);
      userStore.login(data);
    }).catch(err => console.log("catching"));
    setCalling(true);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <SectionTitle title="Registro" />
        <div className="row">
          <div className="col-md-2 offset-md-5 mb-5">
            <div className="form-group">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Tu nombre"
                className="form-control mb-5"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Tu email"
                className="form-control mb-5"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Tu contraseña"
                className="form-control mb-5"
              />
              <input
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
                type="password"
                placeholder="Confirmación de la contraseña"
                className="form-control"
              />
              <button type="submit" className="btn btn-primary mt-5 d-block w-100" disabled={calling}>
                {
                calling ? 
                <span 
                  className="spinner-border spinner-border-sm" 
                  role="status" 
                  aria-hidden="true">
                </span> : ''}
                Registrate
              </button>
            </div>
          </div>
        </div>
      </form>
      {userStore.loggedUser ? <Redirect to="/" /> : ''}
    </div>
  );
};

export default observer(Register);
