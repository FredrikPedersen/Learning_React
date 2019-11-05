import React from "react";
import styles from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {

    //Initially gives us an array of arrays with the number of each ingredient
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    });

    //Flattens the array so we only have a single array with a length equal to the number of ingredients
    transformedIngredients = transformedIngredients.reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    //Try commenting out the reduce-method to see what the nested arrays look like before getting flattened.
    console.log(transformedIngredients);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles.burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;