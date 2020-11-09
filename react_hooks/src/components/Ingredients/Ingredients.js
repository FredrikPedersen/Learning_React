import React, {useState, useCallback} from "react";
import axios from "axios";

import {INGREDIENTS_URL, DELETE_INGREDIENTS_URL} from "../constants";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

const Ingredients = () => {
    const [ingredientsState, setIngredientsState] = useState([]);
    const [isLoadingState, setIsLoadingState] = useState(false);
    const [errorState, setErrorState] = useState();

    //Use callback caches the function so it is not re-created when the component re-renders.
    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        setIngredientsState(filteredIngredients);
    }, []);

    const addIngredientHandler = (ingredient) => {
        setIsLoadingState(true);
        axios.post(INGREDIENTS_URL, JSON.stringify({ingredient})).then(response => {
            setIsLoadingState(false);
            setIngredientsState(prevIngredients => [...prevIngredients, {id: response.data.name, ...ingredient}]);
        }).catch(error => {
            setErrorState("Something went wrong when adding an ingredient");
        });

    };

    const removeIngredientHandler = (ingredientId) => {
        setIsLoadingState(true);
        axios.delete(DELETE_INGREDIENTS_URL(ingredientId)).then(response => {
            setIsLoadingState(false);
            setIngredientsState(prevIngredients =>
                prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
            );
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
