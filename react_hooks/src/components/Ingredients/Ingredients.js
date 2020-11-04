import React, {useState} from "react";
import axios from "axios";

import {DATABASE_URL} from "../constants";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
    const [ingredientsState, setIngredientsState] = useState([]);

    const addIngredientHandler = (ingredient) => {
        axios.post(DATABASE_URL + "ingredients.json", JSON.stringify({ingredient})).then(response => {
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
