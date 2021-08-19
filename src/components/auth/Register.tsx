import { FC, useState } from "react";
import { useStore } from "../../stores/helpers/useStore";
import SectionTitle from "../shared/SectionTitle";
import { observer } from "mobx-react-lite";

const Register: FC = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('');

  const { dataStore: { userStore } } = useStore();

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    userStore.register({ name, email, password, password_confirmation: passwordConfirmation });
  };

  return (
    <div className="container">
      <form onSubmit={ onSubmit }>
        <SectionTitle title="Registro" />
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
            </div>
            <div className="form-group">
              <input
                onChange={ (e) => setEmail(e.target.value) }
                value={ email }
                type="email"
                placeholder="Tu email"
                className="form-control mb-5"
              />
            </div>
            <div className="form-group">
              <input
                onChange={ (e) => setPassword(e.target.value) }
                value={ password }
                type="password"
                placeholder="Tu contraseña"
                className="form-control mb-5"
              />
            </div>
            <div className="form-group">
              <input
                onChange={ (e) => setPasswordConfirmation(e.target.value) }
                value={ passwordConfirmation }
                type="password"
                placeholder="Confirmación de la contraseña"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary d-block w-100 mt-5" style={ { height: "45px" } }
                disabled={ userStore.registering }>
                { userStore.registering ? (<span className="spinner-grow text-white m-0" role="status" aria-hidden="true" />) : "" }
                { userStore.registering ? "" : "Register" }
              </button>
            </div>
          </div>
        </div>
      </form>
    </div >
  );
};

export default observer(Register);
