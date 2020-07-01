import * as actionTypes from "../actions/actionTypes";

const initialState = {
    results: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result * 2}) //Do Data transformation logic in the reducer, not in the action creators. This multiplication makes no sense, but is left here as an example.
            };
        case actionTypes.DELETE_RESULT:
            const updatedArray = state.results.filter((result => result.id !== action.resultId));
            return {
                ...state,
                results: updatedArray
            };
        default:
            return state;
    }
};

export default reducer;