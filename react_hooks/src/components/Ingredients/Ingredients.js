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
                <Search/>
                <IngredientList ingredients={ingredientsState} onRemoveItem={() => {}}/>
            </section>
        </div>
    );
};

export default Ingredients;
