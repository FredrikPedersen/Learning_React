import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    results: []
};

const deleteResult = (state, action) => {
    const updatedArray = state.results.filter((result => result.id !== action.resultId));
    return updateObject(state, {results: updatedArray});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, {results: state.results.concat({id: new Date(), value: action.result * 2})}); //Do Data transformation logic in the reducer, not in the action creators. This multiplication makes no sense, but is left here as an example.
        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);
        default:
            return state;
    }
};

export default reducer;