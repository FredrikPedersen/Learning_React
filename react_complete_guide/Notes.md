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

### Redux Thunk

 - Used for running Async code within Redux.

```Bash
npm install --save redux-thunk
```

 - In index.js:
	- Import thunk from redux-thunk.
	- Import applyMiddleware and compose (used for the redux devtools) from redux.
	- Create constant with compose enhancers (see [reudx devtools github page](https://github.com/zalmoxisus/redux-devtools-extension) under 1.2).
	- Pass composeEnhancers function as the second argument in createStore, then pass applyMiddleware function with thunk as an argument as the argument for composeEnhancers.

 - Index.js used in the course as per part 303:
 
```Javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import burgerBuilderReducer from "./store/reducers/burgerBuilder";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(burgerBuilderReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```