import React, {useReducer, useCallback, useMemo, useEffect} from "react";

import {INGREDIENTS_URL, DELETE_INGREDIENTS_URL} from "../constants";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http";

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

const Ingredients = () => {
    const [ingredientsState, dispatchIngredients] = useReducer(ingredientReducer, []);
    const {isLoading, error, data, sendRequest, reqExtra, reqIdentifier} = useHttp();

    useEffect(() => {
        if (!isLoading && !error) {
            if (reqIdentifier === "REMOVE_INGREDIENT") {
                dispatchIngredients({type: "DELETE", id: reqExtra})
            } else if (reqIdentifier === "ADD_INGREDIENT") {
                dispatchIngredients({
                    type: "ADD",
                    ingredient: {id: data.name, ...reqExtra}
                })
            }
        }
    }, [data, reqExtra, reqIdentifier, isLoading, error]);

    //Use callback caches the function so it is not re-created when the component re-renders.
    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        dispatchIngredients({type: "SET", ingredients: filteredIngredients});
    }, []);

    //useCallBack forces the function to only be rebuilt when it's dependencies change (in this case: dispatchHttp, but that one never changes).
    //Note that components dependent on this function must use React.memo to utilize this.
    const addIngredientHandler = useCallback((ingredient) => {
        sendRequest(INGREDIENTS_URL, "POST", JSON.stringify(ingredient), ingredient, "ADD_INGREDIENT");
    }, [sendRequest]);


    //useCallBack forces the function to only be rebuilt when it's dependencies change (in this case: dispatchHttp, but that one never changes).
    //Note that components dependent on this function must use React.memo to utilize this.
    const removeIngredientHandler = useCallback(ingredientId => {
        sendRequest(DELETE_INGREDIENTS_URL(ingredientId), "DELETE", null, ingredientId, "REMOVE_INGREDIENT");
    }, [sendRequest]);

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
            {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
            <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler}/>
                {ingredientList}
            </section>
        </div>
    );
};

export default Ingredients;
