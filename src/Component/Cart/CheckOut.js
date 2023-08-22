import { useRef, useState } from "react";
import styles from "./CheckOut.module.css";
const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;
const CheckOut = (props) => {
  const [formInputsValid, setFormInputsValid] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);
    setFormInputsValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };
  const nameControlClass = `${styles.control} ${
    formInputsValid.name ? "" : styles.invalid
  }`;
  const streetControlClass = `${styles.control} ${
    formInputsValid.street ? "" : styles.invalid
  }`;
  const postalCodeControlClass = `${styles.control} ${
    formInputsValid.postalCode ? "" : styles.invalid
  }`;
  const cityControlClass = `${styles.control} ${
    formInputsValid.city ? "" : styles.invalid
  }`;

  return (
    <form onSubmit={submitHandler}>
      <div className={nameControlClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValid.name && <p>Please Enter Valid Name</p>}
      </div>
      <div className={streetControlClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValid.street && <p>Please Enter Valid Street</p>}
      </div>
      <div className={postalCodeControlClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValid.postalCode && <p>Please Enter Valid Postal Code</p>}
      </div>
      <div className={cityControlClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValid.city && <p>Please Enter Valid City</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.click}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default CheckOut;
