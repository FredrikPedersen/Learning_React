import React, {useState} from "react";

import Card from "../UI/Card";
import LoadingIndicator from "../UI/LoadingIndicator";
import "./IngredientForm.css";

const IngredientForm = React.memo(props => {
    const [enteredTitleState, setEnteredTitleState] = useState("");
    const [enteredAmountState, setEnteredAmountState] = useState("");

    const submitHandler = event => {
        event.preventDefault();
        props.onAddIngredient({title: enteredTitleState, amount: enteredAmountState})
    };

    return (
        <section className="ingredient-form">
            <Card>
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <label htmlFor="title">Name</label>
                        <input type="text"
                               id="title"
                               value={enteredTitleState}
                               onChange={event => {setEnteredTitleState(event.target.value)}}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount">Amount</label>
                        <input type="number"
                               id="amount"
                               value={enteredAmountState}
                               onChange={event => {setEnteredAmountState(event.target.value)}}/>
                    </div>
                    <div className="ingredient-form__actions">
                        <button type="submit">Add Ingredient</button>
                        {props.loading && <LoadingIndicator/>}
                    </div>
                </form>
            </Card>
        </section>
    );
});

export default IngredientForm;
