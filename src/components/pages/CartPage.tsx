import { FC, useEffect } from "react";
import Page from "../shared/Page";
import { observer } from "mobx-react-lite";
import PersonalInfoForm from "../PersonalInfoForm";
import Cart from "../Cart";
import { useStore } from "../../stores/helpers/useStore";

const CartPage: FC = () => {
  const { dataStore: { userStore } } = useStore();
  useEffect(() => {
    userStore.loggedOrRedirect()
  }, []);
  return (
    <Page>
      {!userStore.personalInfo && (<PersonalInfoForm />)}
      <Cart />
    </Page>
  );
};

export default observer(CartPage);