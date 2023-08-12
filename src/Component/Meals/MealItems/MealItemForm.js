import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const inputAmountRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputAmountRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={inputAmountRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ ADD</button>
      {!amountIsValid && <p>Please Enter Valid Amount of Items (1-5)</p>}
    </form>
  );
};
export default MealItemForm;
