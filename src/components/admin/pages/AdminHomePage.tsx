import { FC } from "react";
import ChangePasswordForm from "../../auth/ChangePassordForm";
import PersonalInfoForm from "../../PersonalInfoForm";
import AdminPage from "../shared/AdminPage";

const AdminHomePage: FC = () => (
  <AdminPage>
    <br />
    <PersonalInfoForm />
    <br />
    <hr />
    <br />
    <h3 className="text-center">Cambiar Contraseña</h3>
    <ChangePasswordForm />
  </AdminPage>
);

export default AdminHomePage;