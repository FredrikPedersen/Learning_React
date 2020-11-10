import React, {useState, useEffect, useRef} from "react";

import {INGREDIENTS_URL} from "../constants";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";
import "./Search.css";

const Search = React.memo(props => {
    const {onLoadIngredients} = props;
    const [enteredFilterState, setEnteredFilterState] = useState("");
    const inputRef = useRef();
    const {isLoading, data, error, sendRequest, clear} = useHttp();

    //useEffect allows us to perform side effects. See documentation.
    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilterState === inputRef.current.value) {
                const query = enteredFilterState.length === 0 ? "" : `?orderBy="title"&equalTo="${enteredFilterState}"`;
                sendRequest(INGREDIENTS_URL + query, "GET");
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [enteredFilterState, inputRef, sendRequest]);

    useEffect(() => {
        if (!isLoading && !error && data) {
            const loadedIngredients = [];
            for (const key in data) {
                loadedIngredients.push({
                    id: key,
                    title: data[key].ingredient.title,
                    amount: data[key].ingredient.amount
                });
            }
            onLoadIngredients(loadedIngredients);
        }
    }, [data, isLoading, error, onLoadIngredients]);


    return (
        <section className="search">
            {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    {isLoading && <span>...Loading</span>}
                    <input
                        ref={inputRef}
                        type="text"
                        value={enteredFilterState} onChange={event => {
                        setEnteredFilterState(event.target.value)
                    }}/>
                </div>
            </Card>
        </section>
    );
});

export default Search;
