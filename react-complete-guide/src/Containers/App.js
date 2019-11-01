import React, {Component} from "react";
import classes from "./App.css";
import Person from "../Components/Persons/Person/Person";
import ErrorBoundary from "../Components/ErrorBoundary/ErrorBoundary";


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
        let btnClass = "";

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            key={person.id}
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            change={(event) => this.nameChangedHandler(event, person.id)}/>
                    })}
                </div>
            );

            btnClass = classes.red;
        }

        let assignedClasses = [];
        if (this.state.persons.length <= 2) {
            assignedClasses.push(classes.bold);
        }
        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes.red);
        }

        let counterText = "There are " + this.state.persons.length + " persons in the list!";
        if (this.state.persons.length === 0) {
            counterText += " :( ";
        }

        //NOTE! assignedClasses.join turns the assignedClasses-array into a single String with a space between each element!
        return (
            <div className={classes.app}>
                <h1>Hi, I'm a React App</h1>
                <p className={assignedClasses.join(' ')}>{counterText}</p>
                <button
                    className={btnClass}
                    onClick={this.togglePersonsHandler}>
                    Toggle Persons
                </button>
                {persons}
            </div>
        );
    }
}

export default App;
