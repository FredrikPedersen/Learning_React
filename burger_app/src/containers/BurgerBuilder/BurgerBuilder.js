import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import modal from '../../components/UI/Modal/Modal';
import orderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const BurgerBuilder = (props) => {
    const {onInitIngredients} = props;
    const [purchasingState, setPurchasingState] = useState(false);

    //Pass no dependencies to useEffect to ensure it only runs once when the component is mounted.
    //Replaces componentDidMount
    useEffect(() => {
        onInitIngredients();
    },[onInitIngredients]);

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasingState(true);
        } else {
            props.onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasingState(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push("/checkout");
    };

    const disabledInfo = {
        ...props.ings
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

    if (props.ings) {
        burger = (
            <>
                <Burger ingredients={props.ings}/>
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                    price={props.price}
                />
            </>
        );
        orderSummary = (
            <orderSummary
                ingredients={props.ings}
                price={props.price}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
            />
        );
    }
    // {salad: true, meat: false, ...}
    return (
        <>
            <modal
                show={purchasingState}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </modal>
            {burger}
        </>
    );
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));