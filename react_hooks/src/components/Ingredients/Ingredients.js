import React, {useState, useEffect} from "react";
import axios from "axios";

import {INGREDIENTS_URL} from "../constants";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
    const [ingredientsState, setIngredientsState] = useState([]);

    useEffect(() => {
        axios.get(INGREDIENTS_URL).then(response => {
            const loadedIngredients = [];
            for (const key in response.data) {
                loadedIngredients.push({
                    id: key,
                    title: response.data[key].ingredient.title,
                    amount: response.data[key].ingredient.amount
                });
            }
            setIngredientsState(loadedIngredients);
        });
    }, []);


    /*  Uses ingredientsState as a dependency, thus re-rendering the component whenever the dependency changes.
        Do not use a state as a dependency in a real case, that would as always lead to an infinite loop.
        This is just an example.

    useEffect(() => {
        console.log("RE-RENDERING INGREDIENTS COMPONENT", ingredientsState);
    }, [ingredientsState]); */

    const filteredIngredientsHandler = (filteredIngredients) => {
        setIngredientsState(filteredIngredients);
    };

    const addIngredientHandler = (ingredient) => {
        axios.post(INGREDIENTS_URL, JSON.stringify({ingredient})).then(response => {
            setIngredientsState(prevIngredients => [
                ...prevIngredients,
                {id: response.data.name, ...ingredient}
            ]);
        });

    };

    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler}/>

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler}/>
                <IngredientList ingredients={ingredientsState} onRemoveItem={() => {}}/>
            </section>
        </div>
    );
};

export default Ingredients;
