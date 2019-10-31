import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person'


class App extends Component {
    state = {
        persons: [
            {id: '1', name: 'Fredrik', age: 25},
            {id: '2', name: "Anders", age: 23}
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

        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };

        let persons = null;
        if(this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            click = {() => this.deletePersonHandler(index)}
                            name = {person.name}
                            age = {person.age}
                            key = {person.id}
                            change = {(event) => this.nameChangedHandler(event, person.id)}/>
                    })}
                </div>
            );
        }

        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <button
                    style={style}
                    onClick={this.togglePersonsHandler}>
                    Toggle Persons
                </button>
                {persons}
            </div>
        )
    }
}

export default App;
