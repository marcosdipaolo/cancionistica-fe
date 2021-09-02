import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useStore } from "../stores/helpers/useStore";

const CartIcon: FC = () => {
  const { dataStore: { cartStore } } = useStore();
  return (
    <div className="cart-icon">
        <i className="icon-cart" />
        <span className="cart-indicator">{ cartStore.cart.length }</span>
    </div>
  );
};

export default observer(CartIcon);