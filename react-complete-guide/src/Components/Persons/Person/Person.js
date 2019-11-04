import React, {Component} from "react";
import withClass from "../../../HigherOrderComponents/withClass";
import styles from "./Person.css"
import PropTypes from "prop-types";

class Person extends Component {
    render() {
        console.log("[Person.js rendering...");
        return (
            <>
                <p key="i1" onClick={this.props.click}>My name is {this.props.name}, and I am {this.props.age} years old!</p>
                <p key="i2">{this.props.children}</p>
                <input key="i3" type="text" onChange={this.props.change} value={this.props.name}/>
            </>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    changed: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number
};

export default withClass(Person, styles.Person);