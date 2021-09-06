import { FC } from "react";
import Page from "../shared/Page";
import ResetPasswordRequestForm from "../auth/ResetPasswordRequestForm";

const ResetPasswordRequestPage: FC = () => {
    return (
        <Page>
            <ResetPasswordRequestForm />
        </Page>
    );
};

export default ResetPasswordRequestPage;