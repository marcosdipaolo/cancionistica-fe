import { FC } from "react";
import ChangePasswordForm from "../../auth/ChangePassordForm";
import PersonalInfoForm from "../../PersonalInfoForm";
import ResendEmailVerification from "../ResendEmailVerification";
import AdminPage from "../shared/AdminPage";
import Separator from "../shared/Separator";

const AdminHomePage: FC = () => (
  <AdminPage>
    <br />
    <PersonalInfoForm />
    <Separator />
    <ChangePasswordForm />
    <Separator />
    <ResendEmailVerification />
    <Separator />
  </AdminPage>
);

export default AdminHomePage;