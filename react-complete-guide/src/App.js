import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'


class App extends Component {
    state = {
        persons: [
            {name: 'Fredrik', age: 25},
            {name: "Anders", age: 23}
        ]
    };

    switchNameHandler = (newName) => {
        this.setState({
            persons: [
                {name: newName, age: 28},
                {name: "Andrine", age: 24}
            ]
        })
    };

    nameChangedHandler = (event) => {
        this.setState({
            persons: [
                {name: 'Fredrik', age: 28},
                {name: event.target.value, age: 24}
            ]
        })
    };

    render() {
        return(
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <button onClick={() => this.switchNameHandler('Fredrikke')}>Switch Names</button>
                <Person
                    name={this.state.persons[0].name}
                    age={this.state.persons[0].age}
                    click={this.switchNameHandler.bind(this, 'Fredrika')}>
                    My Hobbies: React</Person>
                <Person
                    name={this.state.persons[1].name}
                    age={this.state.persons[1].age}
                    changed={this.nameChangedHandler}/>
            </div>
        )
    }
}

export default App;
