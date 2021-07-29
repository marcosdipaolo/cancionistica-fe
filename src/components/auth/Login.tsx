import { FC } from "react";
import SectionTitle from "../shared/SectionTitle";

const Login: FC = () => (
    <div>
        <form>
            <SectionTitle title="Login"/>
            <div className="row">
                <div className="col-md-2 offset-md-5 mb-5">
                    <div className="form-group">
                        <input type="email" placeholder="Escribí tu email" className="form-control mb-5"/>
                        <input type="password" placeholder="Escribí tu contraseña" className="form-control"/>
                    </div>
                </div>
            </div>
        </form>
    </div>
);

export default Login;
