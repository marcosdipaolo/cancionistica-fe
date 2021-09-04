import { FC } from "react";
import { useStore } from "../../stores/helpers/useStore";
import SectionTitle from "../shared/SectionTitle";
import { observer } from "mobx-react-lite";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useInjection } from "../../container/inversify-hook";
import { IAuthService } from "../../services/AuthService";
import { TYPES } from "../../container/types";

const Register: FC = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const { dataStore: { userStore } } = useStore();

  const authService = useInjection<IAuthService>(TYPES.authService);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().min(2, "Mínimo de 2 caracteres").required("Campo requerido"),
      password: Yup.string().min(6, "Mínimo de 6 caracteres").required("Campo requerido"),
      passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Contraseñas deben coincidir'),
      email: Yup.string()
              .email('La dirección de email no es valida')
              .required('El email es un campo requerido.')
              .test('email', 'Este mail ya existe', function (value) {
                return new Promise((resolve, reject) => {
                  authService.emailExists(value!).then((data) => {
                      resolve(!data)
                  }).catch((err) => {
                      resolve(true)
                  })
              })
            }),
    }),
    onSubmit: ({ name, email, password, passwordConfirmation }) => {
      userStore.register({ name, email, password, password_confirmation: passwordConfirmation });
    }
  });

  const renderError = (field: ("name" | "password" | "email" | "passwordConfirmation")) => {
    return formik.touched[ field ] && formik.errors[ field ]
      ? (<div className="invalid-feedback">{formik.errors[ field ]}</div>)
      : null;
  }
  

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
                className={`form-control${formik.touched.name && formik.errors.name ? ' is-invalid' : ' mb-5'}`}
                { ...formik.getFieldProps("name") }
              />
              { renderError("name") }
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Tu email"
                className={`form-control${formik.touched.email && formik.errors.email ? ' is-invalid' : ' mb-5'}`}
                { ...formik.getFieldProps("email") }
              />
              { renderError("email") }
            </div>
            <div className="form-group ">
              <input
                type="password"
                placeholder="Tu contraseña"
                className={`form-control${formik.touched.password && formik.errors.password ? ' is-invalid' : ' mb-5'}`}
                { ...formik.getFieldProps("password") }
              />
              { renderError("password") }
            </div>
            <div className="form-group ">
              <input
                type="password"
                placeholder="Confirmación de la contraseña"
                className={`form-control${formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? ' is-invalid' : ' mb-5'}`}
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
            </div>
          </div>
        </div>
      </form>
    </div >
  );
};

export default observer(Register);
