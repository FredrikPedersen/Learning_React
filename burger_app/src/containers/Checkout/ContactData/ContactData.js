import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import axios from "../../../axios-orders";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault(); //Placeholder code to prevent submition of the form
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                <Input inputtype="input" type="text" name="name" placeholder="Your Name"/>
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