import { FC } from "react";
import "../../sass/admin/style.scss";
import AdminRouter from "./AdminRouter";

const AdminApp: FC = () => (
  <div id="adminPanel">
    <AdminRouter />
  </div>
);

export default AdminApp;