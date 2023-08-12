import React, { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";
const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    cartCtx.addItems({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;
