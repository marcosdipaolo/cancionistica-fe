import { useFormik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import history from "../../history";
import { IAuthService } from "../../services/AuthService";

const ResetPasswordRequestForm: FC = () => {

    const authService = useInjection<IAuthService>(TYPES.authService);

    const [sending, setSending] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email("El email ingresado no es válido")
                .required("El email es requerido")
                .test('email', 'Este mail no es un mail registrado.', function (value) {
                    return new Promise((resolve, reject) => {
                        authService.emailExists(value!).then((data) => {
                            resolve(data);
                        }).catch((err) => {
                            resolve(false);
                        });
                    });
                })
        }),
        onSubmit: async (values) => {
            setSending(true);
            const res = await authService.resetPasswordRequest(values.email);
            setSending(false);
            if(res.status === 200) {
                history.push("/");
            }            
        }
    });
    return (
        <div className="container">
            <h3 className="text-center">Recuperar/Cambiar contraseña</h3>
            <form onSubmit={formik.handleSubmit} className="mt-2">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="form-group">
                            <input
                                type="text"
                                className={`form-control${formik.touched.email && formik.errors.email ? ' is-invalid' : ''}`}
                                {...formik.getFieldProps("email")}
                                placeholder="Escribí tu email"
                            />
                            {
                                formik.touched.email && formik.errors.email
                                    ? <div className="invalid-feedback">{formik.errors.email}</div>
                                    : ''
                            }
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary d-block w-100 mt-5" style={{ height: "45px" }}
                                disabled={sending}>
                                {sending ? (<span className="spinner-grow text-white m-0" role="status" aria-hidden="true" />) : ""}
                                {sending ? "" : "Enviar"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordRequestForm;