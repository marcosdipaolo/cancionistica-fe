import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import * as Yup from "yup";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import history from "../../history";
import { IAuthService } from "../../services/AuthService";
import { useStore } from "../../stores/helpers/useStore";
import SectionTitle from "../shared/SectionTitle";

const ResetPasswordForm: FC = () => {

  const { token }: { token: string; } = useParams();

  const authService = useInjection<IAuthService>(TYPES.authService);
  const { dataStore: { userStore } } = useStore();

  const [ sending, setSending ] = useState(false);
  const [ emails, setEmails ] = useState<string[]>([]);

  useEffect(() => {
    authService.emails().then((emails: string[]) => {
      setEmails(emails);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: ""
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email("El email ingresado no es válido")
        .required("El email es requerido")
        .oneOf(emails, "Este mail no está registrado en Cancionistica.com"),
      password: Yup.string().min(6, "Mínimo de 6 caracteres").required("Campo requerido"),
      passwordConfirmation: Yup.string().oneOf([ Yup.ref('password'), null ], 'Contraseñas deben coincidir'),
    }),
    onSubmit: async (values) => {
      setSending(true);
      const res = await authService.resetPassword({ ...values, token });
      if (res.status === 200) {
        userStore.logout(false);
        history.push("/login");
      }

    }
  });
  return (
    <div className="container">
      <SectionTitle title="Restaurar Contraseña" />
      <form onSubmit={ formik.handleSubmit } className="mt-2">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="form-group">
              <input
                type="text"
                className={ `form-control${formik.touched.email && formik.errors.email ? ' is-invalid' : ''}` }
                { ...formik.getFieldProps("email") }
                placeholder="Escribí tu email"
              />
              {
                formik.touched.email && formik.errors.email
                  ? <div className="invalid-feedback">{ formik.errors.email }</div>
                  : ''
              }
            </div>
            <div className="form-group">
              <input
                type="password"
                className={ `form-control${formik.touched.password && formik.errors.password ? ' is-invalid' : ''}` }
                { ...formik.getFieldProps("password") }
                placeholder="Escribí tu contraseña"
              />
              {
                formik.touched.password && formik.errors.password
                  ? <div className="invalid-feedback">{ formik.errors.password }</div>
                  : ''
              }
            </div>
            <div className="form-group">
              <input
                type="password"
                className={ `form-control${formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? ' is-invalid' : ''}` }
                { ...formik.getFieldProps("passwordConfirmation") }
                placeholder="Confirmá   tu contraseña"
              />
              {
                formik.touched.passwordConfirmation && formik.errors.passwordConfirmation
                  ? <div className="invalid-feedback">{ formik.errors.passwordConfirmation }</div>
                  : ''
              }
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary d-block w-100 mt-5" style={ { height: "45px" } }
                disabled={ sending }>
                { sending ? (<span className="spinner-grow text-white m-0" role="status" aria-hidden="true" />) : "" }
                { sending ? "" : "Enviar" }
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;