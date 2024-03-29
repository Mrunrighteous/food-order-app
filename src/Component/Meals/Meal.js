import React, { Fragment } from "react";
import MealsSummary from "./MealSummary";
import AvailableMeals from "./AvailableMeals";
const Meal = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};
export default Meal;
