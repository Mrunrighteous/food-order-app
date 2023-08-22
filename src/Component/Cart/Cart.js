import React, { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";
const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  const checkOutHandler = () => {
    setIsCheckOut(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitted(true);
    await fetch(
      "https://food-ordering-app-1e8e1-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearItems();
  };
  const modalView = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Cancel
      </button>
      {hasItems && (
        <button className={styles.button} onClick={checkOutHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOut click={props.onHideCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckOut && modalView}
    </Fragment>
  );
  const isSubmittingModalContent = <p>Sending Order data...</p>;
  const isSubmittedModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHideCart}>
          Cancel
        </button>
      </div>
    </Fragment>
  );
  return (
    <Modal onClickHide={props.onHideCart}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {isSubmitted && !isSubmitting && isSubmittedModalContent}
    </Modal>
  );
};
export default Cart;
