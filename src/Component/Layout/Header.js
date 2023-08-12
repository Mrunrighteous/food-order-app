import React, { Fragment } from "react";
import HeaderCartButton from "./HeaderCartButton";
import meal from "../../Assets/meals.jpg";
import styles from "./Header.module.css";
const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>ReactMeal</h1>
        <HeaderCartButton onClickShow={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={meal} alt="meal" />
      </div>
    </Fragment>
  );
};
export default Header;
