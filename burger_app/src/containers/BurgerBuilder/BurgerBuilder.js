import React, {Component} from "react";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState = (ingredients) => {
        //Create a sum-array with the ingredients. The map method replaces the names of the ingredients with their values.
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0})
    };

    addIngredientHandler = (type) => {
        let count = this.state.ingredients[type];
        count += 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = count;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        let count = this.state.ingredients[type];

        if (count <= 0) { //Prevents negative values
            return;
        }

        count -= 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = count;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        const order =  {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Fredrik Pedersen",
                address: {
                    street: "Streetway 123",
                    zipCode: "1234",
                    country: "Norway"
                },
                email: "test@test.com"
            },
            deliveryMethod: "Gotta Go Fast"
        };

        axios.post("/orders.json", order)
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)});

        alert("Order recieved! :)");
        this.purchaseCancelHandler();
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}

        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>

                <Burger ingredients={this.state.ingredients}/>

                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                />

            </>
        );
    }
}

export default BurgerBuilder;