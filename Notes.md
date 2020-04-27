# React - The Complete Guide - Notes

*Note: These notes are very much incomplete, as taking notes from Udemy courses are a habbit I picked up long after I started this course. Most notes are from section 15 and onwards*

## Routing:
1. npm install --save react-router-dom
2. Wrap every component you want to use routing in with BrowserRouter. Will most likely be done inn App or Index.

## Section 14: Redux

### 268 - Understanding State Types

 - When should Redux be used for state management?
 - We usually have three types of state:
	- Local UI State (Show/Hide backdrop) - (Mostly) Handled within the components
	- Persistent State (All users, all posts...) - Stored on server, relevant slices managed via Redux
	- Client State (Is Authenticated? Filters set?) - Managed via Redux

- In some cases, using Redux is overkill, and it is less used in smaller simple projects.

### 275/276 - Installing Redux and Basic Setup

```Bash
npm install --save redux react-redux
```


 - An empty reducer
```Javascript
const initialState = {
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case "SOME_ACTION":
			return {
				...state,
				someStateValue: state.someStateValue + 1
			};
		default:
			return state;
	}
};

export default reducer;
````

- Configure index.js to utilize the reducer in the application
```Javascript

import aReducer from "./store/reducers/areducer";
import anotherReducer from "./store/reducers/anotherReducer";

//if multiple reducers
const rootReducer = combineReducers({
    reducer1: aReducer,
    reducer2: anotherReducer
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
```

- In the component utilizing Redux for store management:
```Javascript
import { connect } from "react-redux";

const component = () => {
};

const mapStateToProps = state => {
	return {
		someStateValue: state.value
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onSomeAction: () => dispatch({type: "SOME_ACTION"})
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
```