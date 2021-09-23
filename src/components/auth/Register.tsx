import { FC, useEffect, useState } from "react";
import { useStore } from "../../stores/helpers/useStore";
import SectionTitle from "../shared/SectionTitle";
import { observer } from "mobx-react-lite";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useInjection } from "../../container/inversify-hook";
import { IAuthService } from "../../services/AuthService";
import { TYPES } from "../../container/types";
import { Link } from "react-router-dom";
import history from "../../history";

const Register: FC = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const { dataStore: { userStore } } = useStore();
  const authService = useInjection<IAuthService>(TYPES.authService);
  const [ emails, setEmails ] = useState<string[]>([]);

  useEffect(() => {
    authService.emails();
  }, []);

  useEffect(() => {
    if (userStore.getLoggedUser()) {
      history.push("/");
    }
  }, [ userStore.getLoggedUser() ]);


  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().min(2, "Mínimo de 2 caracteres").required("Campo requerido"),
      password: Yup.string().min(6, "Mínimo de 6 caracteres").required("Campo requerido"),
      passwordConfirmation: Yup.string().oneOf([ Yup.ref('password'), null ], 'Contraseñas deben coincidir'),
      email: Yup.string()
        .email('La dirección de email no es valida')
        .required('El email es un campo requerido.')
        .notOneOf(emails || [], "Este mail ya existe")
    }),
    onSubmit: ({ name, email, password, passwordConfirmation }) => {
      userStore.register({ name, email, password, passwordConfirmation });
    }
  });

  const renderError = (field: ("name" | "password" | "email" | "passwordConfirmation")) => {
    return formik.touched[ field ] && formik.errors[ field ]
      ? (<div className="invalid-feedback">{ formik.errors[ field ] }</div>)
      : null;
  };


  return (
    <div className="container">
      <form onSubmit={ formik.handleSubmit }>
        <SectionTitle title="Registro" />
        <div className="row">
          <div className="col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-5">
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre de usuario"
                className={ `form-control${formik.touched.name && formik.errors.name ? ' is-invalid' : ' mb-5'}` }
                { ...formik.getFieldProps("name") }
              />
              { renderError("name") }
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Tu email"
                className={ `form-control${formik.touched.email && formik.errors.email ? ' is-invalid' : ' mb-5'}` }
                { ...formik.getFieldProps("email") }
              />
              { renderError("email") }
            </div>
            <div className="form-group ">
              <input
                type="password"
                placeholder="Tu contraseña"
                className={ `form-control${formik.touched.password && formik.errors.password ? ' is-invalid' : ' mb-5'}` }
                { ...formik.getFieldProps("password") }
              />
              { renderError("password") }
            </div>
            <div className="form-group ">
              <input
                type="password"
                placeholder="Confirmación de la contraseña"
                className={ `form-control${formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? ' is-invalid' : ' mb-5'}` }
                { ...formik.getFieldProps("passwordConfirmation") }
              />
              { renderError("passwordConfirmation") }
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary d-block w-100 mt-5" style={ { height: "45px" } }
                disabled={ userStore.registering }>
                { userStore.registering ? (<span className="spinner-grow text-white m-0" role="status" aria-hidden="true" />) : "" }
                { userStore.registering ? "" : "Register" }
              </button>
              <div className="links">
                <Link to="/login"><small>Tenés una cuenta? Iniciá sesión</small></Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div >
  );
};

export default observer(Register);
