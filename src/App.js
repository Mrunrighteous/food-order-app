import React, { useState } from "react";
import Cart from "./Component/Cart/Cart";
import Header from "./Component/Layout/Header";
import Meal from "./Component/Meals/Meal";
import CartProvider from "./store/CartProvider";
const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meal />
      </main>
    </CartProvider>
  );
};
export default App;
