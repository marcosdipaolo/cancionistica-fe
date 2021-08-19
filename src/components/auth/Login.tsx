import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { useStore } from "../../stores/helpers/useStore";
import SectionTitle from "../shared/SectionTitle";

const Login: FC = () => {
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");

  const { dataStore: { userStore } } = useStore();

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    userStore.login({ email, password });
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
                  disabled={ userStore.loggingIn }>
                  { userStore.loggingIn ? (<span className="spinner-grow text-white m-0" role="status" aria-hidden="true" />) : "" }
                  { userStore.loggingIn ? "" : "Login" }
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
