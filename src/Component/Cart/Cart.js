import React, { useContext } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const onRemoveHandler = (id) => {
    cartCtx.removeItems(id);
  };
  const onAddHandler = (item) => {
    cartCtx.addItems({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((items) => (
        <CartItem
          id={items.id}
          name={items.name}
          price={items.price}
          amount={items.amount}
          onRemove={onRemoveHandler.bind(null, items.id)}
          onAdd={onAddHandler.bind(null, items)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClickHide={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Cancel
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
