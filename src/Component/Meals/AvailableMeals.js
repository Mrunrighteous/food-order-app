import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItem";
import styles from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meal, setMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMealData = async () => {
      const response = await fetch(
        "https://food-ordering-app-1e8e1-default-rtdb.asia-southeast1.firebasedatabase.app/meal.json"
      );
      if (!response.ok) {
        throw new Error();
      }
      const responseData = await response.json();
      const loadedData = [];
      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeal(loadedData);
      setIsLoading(false);
    };
    fetchMealData().catch((error) => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={styles.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={styles.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealList = meal.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
