import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person'


class App extends Component {
    state = {
        persons: [
            {name: 'Fredrik', age: 25},
            {name: "Anders", age: 23}
        ],
        showPersons: false
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

        return (
            <div className="App">
                <h1>Hi, I'm a React App</h1>
                <button
                    style={style}
                    onClick={this.togglePersonsHandler}>Switch Names</button>
                {
                    this.state.showPersons ?
                        <div>
                            <Person
                                name={this.state.persons[0].name}
                                age={this.state.persons[0].age}
                                click={this.switchNameHandler.bind(this, 'Fredrika')}>
                                My Hobbies: React</Person>
                            <Person
                                name={this.state.persons[1].name}
                                age={this.state.persons[1].age}
                                changed={this.nameChangedHandler}/>
                        </div> : null
                }
            </div>
        )
    }
}

export default App;
