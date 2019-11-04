import React, {PureComponent} from "react";
import Person from "./Person/Person";

class Persons extends PureComponent { //A pure component automatically checks for changes in all of the props
   /* static getDerivedStateFromProps(props, state) {
        console.log("[Persons.js] getDerivedStateFromProps");
        return state;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("[Persons.js] shouldComponentUpdate");
        return nextProps.persons !== this.props.persons || nextProps.changed !== this.props.changed || nextProps.clicked !== this.props.clicked;
    } */

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("[Persons.js] getSnapshotBeforeUpdate");
        return {message: "Snapshot!"};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("[Persons.js] componentDidUpdate");
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log("[Persons.js] componentWillUnmount");
    }

    render() {
        console.log("[Persons.js] rendering...");
        return this.props.persons.map((person, index) => {
            return (
                <Person
                    key={person.id}
                    click={() => this.props.clicked(index)}
                    name={person.name}
                    age={person.age}
                    change={(event) => this.props.changed(event, person.id)}
                    isAuth={this.props.isAuthenticated}
                />
            );
        });
    }
}

export default Persons;