import React, {useReducer, useState, useCallback} from "react";
import axios from "axios";

import {INGREDIENTS_URL, DELETE_INGREDIENTS_URL} from "../constants";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

const ingredientReducer = (currentState, action) => {
    switch (action.type) {
        case "SET":
            return action.ingredients;
        case "ADD":
            return [...currentState, action.ingredient]
        case "DELETE":
            return currentState.filter(ingredient => ingredient.id !== action.id);
        default:
            throw new Error("SHOULD NOT GET HERE!");
    }
};

const Ingredients = () => {
    const [ingredientsState, dispatch] = useReducer(ingredientReducer, []);

    const [isLoadingState, setIsLoadingState] = useState(false);
    const [errorState, setErrorState] = useState();

    //Use callback caches the function so it is not re-created when the component re-renders.
    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        dispatch({type: "SET", ingredients: filteredIngredients});
    }, []);

    const addIngredientHandler = (ingredient) => {
        setIsLoadingState(true);
        axios.post(INGREDIENTS_URL, JSON.stringify({ingredient})).then(response => {
            setIsLoadingState(false);
            dispatch({type: "ADD", ingredient: {id: response.data.name, ...ingredient}})
        }).catch(error => {
            setErrorState("Something went wrong when adding an ingredient");
        });

    };

    const removeIngredientHandler = (ingredientId) => {
        setIsLoadingState(true);
        axios.delete(DELETE_INGREDIENTS_URL(ingredientId)).then(response => {
            setIsLoadingState(false);
            dispatch({type: "DELETE", id: ingredientId})
        }).catch(error => {
            setErrorState("Something went wrong when deleting an ingredient");
        });
    };

    const clearError = () => {
        setErrorState(null);
        setIsLoadingState(false);
    }

    return (
        <div className="App">
            {errorState && <ErrorModal onClose={clearError}>{errorState}</ErrorModal>}
            <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoadingState}/>

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler}/>
                <IngredientList
                    ingredients={ingredientsState}
                    onRemoveItem={removeIngredientHandler}/>
            </section>
        </div>
    );
};

export default Ingredients;
