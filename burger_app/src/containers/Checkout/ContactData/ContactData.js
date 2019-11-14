import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import axios from "../../../axios-orders";

class ContactData extends Component {
    state = {
        orderForm: {
            //This code is very bloated. Consider using a function for creating the objects in a future project.
            name:  {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your name"
                },
                value: ""
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street address"
                },
                value: ""
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Zip Code"
                },
                value: ""
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: ""
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mailaddress"
                },
                value: ""
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                   options: [
                       {value: "fastest", displayValue: "Gotta Go Fast"},
                       {value: "cheapest", displayValue: "Imma save muh moneh"}
                       ]
                },
                value: ""
            },
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault(); //Placeholder code to prevent submition of the form
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        };

        axios.post("/orders.json", order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({loading: false});
            });
    };

    render() {
        let form = (
            <form>
                <Input elementType="..." elementConfig="..." value="..."/>
                <Input inputtype="input" type="text" name="email" placeholder="Your Email"/>
                <Input inputtype="input" type="text" name="street" placeholder="Your Street"/>
                <Input inputtype="input" type="text" name="postalCode" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;