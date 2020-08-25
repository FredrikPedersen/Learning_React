import * as actionTypes from "../actions/actionTypes";
import { updateObject} from "../utility";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

//Each case can be extracted into their own functions for better readability
const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedAddedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedAddedIngredients = updateObject(state.ingredients, updatedAddedIngredient);
            const updatedAddedState = {
                ingredients: updatedAddedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };

            return updateObject(state, updatedAddedState);

        case actionTypes.REMOVE_INGREDIENT:
            const updatedRemovedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedRemovedIngredients = updateObject(state.ingredients, updatedRemovedIngredient);
            const updatedRemovedState = {
                ingredients: updatedRemovedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };

            return updateObject(state, updatedRemovedState);

        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false
            });

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {
                error: true
            });

        default:
            return state;
    }
};

export default burgerBuilderReducer;