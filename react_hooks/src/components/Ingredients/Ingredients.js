import React, {useState, useCallback} from "react";
import axios from "axios";

import {INGREDIENTS_URL} from "../constants";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
    const [ingredientsState, setIngredientsState] = useState([]);

    /*  Uses ingredientsState as a dependency, thus re-rendering the component whenever the dependency changes.
        Do not use a state as a dependency in a real case, that would as always lead to an infinite loop.
        This is just an example.

    useEffect(() => {
        console.log("RE-RENDERING INGREDIENTS COMPONENT", ingredientsState);
    }, [ingredientsState]); */

    //Use callback caches the function so it is not re-created when the component re-renders.
    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        setIngredientsState(filteredIngredients);
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
                <Search onLoadIngredients={filteredIngredientsHandler}/>
                <IngredientList ingredients={ingredientsState} onRemoveItem={() => {}}/>
            </section>
        </div>
    );
};

export default Ingredients;
