import React, {useState, useEffect} from "react";
import axios from "axios";

import {INGREDIENTS_URL} from "../constants";
import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
    const {onLoadIngredients} = props;

    const [enteredFilterState, setEnteredFilterState] = useState("");

    useEffect(() => {
        const query =  enteredFilterState.length === 0 ? "" : `?orderBy="title"&equalTo="${enteredFilterState}"`;

        axios.get(INGREDIENTS_URL + query).then(response => {
            const loadedIngredients = [];

            for (const key in response.data) {
                loadedIngredients.push({
                    id: key,
                    title: response.data[key].ingredient.title,
                    amount: response.data[key].ingredient.amount
                });
            }
            onLoadIngredients(loadedIngredients);
        });
    }, [enteredFilterState, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilterState} onChange= {event => {setEnteredFilterState(event.target.value)}}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
