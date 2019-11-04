import React, {Component} from "react";

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

export default Person;