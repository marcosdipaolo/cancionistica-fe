import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useStore } from "../../stores/helpers/useStore";
import SectionTitle from "../shared/SectionTitle";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login: FC = () => {
  const { dataStore: { userStore } } = useStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email('La dirección de email no es valida').required('El email es un campo requerido.'),
      password: Yup.string().required('La contraseña es un campo requerido.'),
    }),
    onSubmit: ({ email, password }) => {
      userStore.login({ email, password });
    }
  });

  const renderError = (field: ("email" | "password")) => {
    return formik.touched[ field ] && formik.errors[ field ]
      ? (<div className="invalid-feedback">{formik.errors[ field ]}</div>)
      : null;
  }

  return (
    <div>
      <form onSubmit={ formik.handleSubmit }>
        <SectionTitle title="Iniciá Sesión" />
        <div className="container">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Escribí tu email"
                  className={`form-control${formik.touched.email && formik.errors.email ? ' is-invalid' : ' mb-5'}`}
                  { ...formik.getFieldProps("email") }
                />
                {renderError("email")}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Escribí tu contraseña"
                  className={`form-control${formik.touched.password && formik.errors.password ? ' is-invalid' : ''}`}
                  { ...formik.getFieldProps("password") }
                  />
                  {renderError("password")}
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
