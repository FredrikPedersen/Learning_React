import React, {Component} from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../higherOrderComponents/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
       /* axios.get("https://react-burger-app-8f293.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            }) */
    }

    updatePurchaseState = (ingredients) => {
        //Create a sum-array with the ingredients. The map method replaces the names of the ingredients with their values.
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0})
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingredients[i]));
        }
        queryParams.push("price=" + this.props.price);
        const queryString = queryParams.join("&");

        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}

        let orderSummary = null;
        let burger = this.state.error ?
            <p style={{fontSize: "10em", textAlign: "center", fontWeight: "bold", color: "red"}}>Ingredients can't be
                loaded, please check you Internet connection!</p> : <Spinner/>;

        if (this.props.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.props.price}/>
                </>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
        onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));