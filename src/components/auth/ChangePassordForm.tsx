import { useFormik } from "formik";
import { FC, useState } from "react";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import history from "../../history";
import { IAuthService } from "../../services/AuthService";
import { useStore } from "../../stores/helpers/useStore";
import * as Yup from "yup";
import { INotificationService, NotificationType } from "../../services/NotificationService";

const ChangePasswordForm: FC = () => {
  const [ sending, setSending ] = useState(false);
  const authService = useInjection<IAuthService>(TYPES.authService);
  const notificationService = useInjection<INotificationService>(TYPES.notificationService);
  const { dataStore: { userStore } } = useStore();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
    onSubmit: async (values) => {
      setSending(true);
      try {
        const response = await authService.changePassword(values);
        if (response.status === 200) {
          notificationService.createNotification(NotificationType.SUCCESS, "Tu contraseña se actualizó correctamente");
          userStore.logout(false);
          history.push("/login");
        }
      } catch (err) {
        notificationService.createNotification(NotificationType.SUCCESS, "Hubo un problema actualizando tu contraseña");
      }
      setSending(false);
    },
    validationSchema: Yup.object({
      oldPassword: Yup
        .string()
        .required("La contraseña actual es requerida")
        .test('oldPassword', 'Contraseña actual incorrecta', function (value) {
          return new Promise((resolve, reject) => {
            if (!value) { resolve(false); return; };
            authService.passwordMatches(value).then((valid) => {
              resolve(valid);
            }).catch((err) => {
              resolve(false);
            });
          });
        }),
      newPassword: Yup
        .string()
        .min(6, "Mínimo 6 caracteres")
        .required("La contraseña actual es requerida")
        .notOneOf([Yup.ref("oldPassword")], "La nueva debe ser diferente a la anterior"),
      newPasswordConfirmation: Yup
        .string()
        .required("La confirmación es requerida")
        .oneOf([ Yup.ref('newPassword'), null ], 'Las contraseñas nuevas deben coincidir'),
    })
  });

  const renderError = (field: ("oldPassword" | "newPassword" | "newPasswordConfirmation")) => {
    return formik.touched[ field ] && formik.errors[ field ]
      ? (<div className="invalid-feedback">{ formik.errors[ field ] }</div>)
      : null;
  };

  return (
    <div className="container">
      <form onSubmit={ formik.handleSubmit }>
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <input
                type="password"
                className={ `form-control${formik.touched.oldPassword && formik.errors.oldPassword ? ' is-invalid' : ''}` }
                placeholder="Contrseña actual..."
                { ...formik.getFieldProps("oldPassword") }
              />
              { renderError("oldPassword") }
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <input
                type="password"
                className={ `form-control${formik.touched.newPassword && formik.errors.newPassword ? ' is-invalid' : ''}` }
                placeholder="Contrseña nueva..."
                { ...formik.getFieldProps("newPassword") }
              />
              { renderError("newPassword") }
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <input
                type="password"
                className={ `form-control${formik.touched.newPasswordConfirmation && formik.errors.newPasswordConfirmation ? ' is-invalid' : ''}` }
                placeholder="Confirmación..."
                { ...formik.getFieldProps("newPasswordConfirmation") }
              />
              { renderError("newPasswordConfirmation") }
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <button type="submit" className="btn btn-primary w-100" style={ { height: '50px' } } disabled={ sending }>
                { sending ? (<span className="spinner-grow text-white m-0" role="status" aria-hidden="true" />) : "" }
                { sending ? "" : "Enviar" }</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;