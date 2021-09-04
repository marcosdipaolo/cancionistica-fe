import { FC } from "react";
import Page from "../shared/Page";
import { observer } from "mobx-react-lite";
import PersonalInfoForm from "../PersonalInfoForm";
import Cart from "../Cart";

const PrePurchasePage: FC = () => {
  return (
    <Page>
      <PersonalInfoForm />
      <Cart />
    </Page>
  );
};

export default observer(PrePurchasePage);