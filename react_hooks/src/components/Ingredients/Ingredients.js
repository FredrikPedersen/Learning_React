import React, {useReducer, useCallback, useMemo} from "react";
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

    //useCallBack forces the function to only be rebuilt when it's dependencies change (in this case: dispatchHttp, but that one never changes).
    //Note that components dependent on this function must use React.memo to utilize this.
    const addIngredientHandler = useCallback((ingredient) => {
        dispatchHttp({type: "SEND"})

        axios.post(INGREDIENTS_URL, JSON.stringify({ingredient})).then(response => {
            dispatchHttp({type: "RESPONSE"})
            dispatchIngredients({type: "ADD", ingredient: {id: response.data.name, ...ingredient}})

        }).catch(error => {
            dispatchHttp({type: "ERROR", errorMessage: "Something went wrong when adding an ingredient"});
        });

    }, []);

    //useCallBack forces the function to only be rebuilt when it's dependencies change (in this case: dispatchHttp, but that one never changes).
    //Note that components dependent on this function must use React.memo to utilize this.
    const removeIngredientHandler = useCallback((ingredientId) => {
        dispatchHttp({type: "SEND"})

        axios.delete(DELETE_INGREDIENTS_URL(ingredientId)).then(response => {
            dispatchHttp({type: "RESPONSE"})
            dispatchIngredients({type: "DELETE", id: ingredientId})

        }).catch(error => {
            dispatchHttp({type: "ERROR", errorMessage: "Something went wrong when deleting an ingredient"});
        });
    }, []);

    const clearError = useCallback(() => {
        dispatchHttp({type: "CLEAR"})
    }, [])

    //useMemo specifies data to be remembered, and only change when it's dependencies change.
    //In this case we have wrapped removeIngredientHandler in useCallback to it never changes.
    const ingredientList = useMemo(() => {
        return (
            <IngredientList ingredients={ingredientsState} onRemoveItem={removeIngredientHandler}/>
        );
    }, [ingredientsState])

    return (
        <div className="App">
            {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
            <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading}/>

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler}/>
                {ingredientList}
            </section>
        </div>
    );
};

export default Ingredients;
