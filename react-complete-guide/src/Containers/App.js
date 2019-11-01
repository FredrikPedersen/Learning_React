import React, {Component} from "react";
import styles from "./App.css";
import Persons from "../Components/Persons/Persons";
import Cockpit from "../Components/Cockpit/Cockpit";


class App extends Component {
    state = {
        persons: [
            {id: "1", name: "Fredrik", age: 25},
            {id: "2", name: "Anders", age: 23},
            {id: "3", name: "Signe", age: 22}
        ],
        showPersons: false
    };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = { //Creates a copy of the person object at the given Index
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons})
    };

    deletePersonHandler = (personIndex) => {
        //const persons = this.state.persons.slice(); //Copies the persons array contained in state so we don't mutate the original array
        const persons = [...this.state.persons]; //Copies the persons array contained in state so we don't mutate the original array - using the spread operator

        //Never mutate the original state. Create a copy, change that, and then update the state. This is to make applications more predictable in behaviour
        persons.splice(personIndex, 1);
        this.setState({persons: persons})
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    render() {
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}/>
        }

        //NOTE! assignedClasses.join turns the assignedClasses-array into a single String with a space between each element!
        return (
            <div className={styles.app}>
                <Cockpit
                    showPersons = {this.state.showPersons}
                    persons = {this.state.persons}
                    clicked = {this.togglePersonsHandler}/>

                {persons}
            </div>
        );
    }
}

export default App;
