import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curNumber, items) => {
    return curNumber + items.amount;
  }, 0);
  const btnClass = `${styles.button} ${btnIsHighlighted ? styles.bump : " "}`;
  useEffect(() => {
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClass} onClick={props.onClickShow}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
