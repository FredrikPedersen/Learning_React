import React, {useReducer, useCallback} from "react";
import axios from "axios";

import {INGREDIENTS_URL, DELETE_INGREDIENTS_URL} from "../constants";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

const ingredientReducer = (currentIngredientsState, action) => {
    switch (action.type) {
        case "SET":
            return action.ingredients;
        case "ADD":
            return [...currentIngredientsState, action.ingredient];
        case "DELETE":
            return currentIngredientsState.filter(ingredient => ingredient.id !== action.id);
        default:
            throw new Error("SHOULD NOT GET HERE!");
    }
};

const httpReducer = (currentHttpState, action) => {
    switch (action.type) {
        case "SEND":
            return {loading: true, error: null};
        case "RESPONSE":
            return {...currentHttpState, loading: false};
        case "ERROR":
            return {loading: false, error: action.errorMessage};
        case "CLEAR":
            return {...currentHttpState, error: null}
        default:
            throw new Error("SHOULD NOT GET HERE!");
    }
};

const Ingredients = () => {
    const [ingredientsState, dispatchIngredients] = useReducer(ingredientReducer, []);
    const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});

    //Use callback caches the function so it is not re-created when the component re-renders.
    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        dispatchIngredients({type: "SET", ingredients: filteredIngredients});
    }, []);

    const addIngredientHandler = (ingredient) => {
        dispatchHttp({type: "SEND"})
        axios.post(INGREDIENTS_URL, JSON.stringify({ingredient})).then(response => {
            dispatchHttp({type: "RESPONSE"})
            dispatchIngredients({type: "ADD", ingredient: {id: response.data.name, ...ingredient}})
        }).catch(error => {
            dispatchHttp({type: "ERROR", errorMessage: "Something went wrong when adding an ingredient"});
        });

    };

    const removeIngredientHandler = (ingredientId) => {
        dispatchHttp({type: "SEND"})
        axios.delete(DELETE_INGREDIENTS_URL(ingredientId)).then(response => {
            dispatchHttp({type: "RESPONSE"})
            dispatchIngredients({type: "DELETE", id: ingredientId})
        }).catch(error => {
            dispatchHttp({type: "ERROR", errorMessage: "Something went wrong when deleting an ingredient"});
        });
    };

    const clearError = () => {
        dispatchHttp({type: "CLEAR"})
    }
    
    return (
        <div className="App">
            {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
            <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading}/>

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
