import React, {Component} from "react";
import styles from "./App.css";
import Persons from "../Components/Persons/Persons";
import Cockpit from "../Components/Cockpit/Cockpit";


class App extends Component {

    constructor(props) {
        super(props);
        console.log("[App.js] constructor");
    }

    //State may also be set in the constructor using this.state = ...
    //Using the constructor to set state is still useful if you want to set state based on data from props
    //Modern JS-practice is however to do it outside of the constructor like the following code:
    state = {
        persons: [
            {id: "1", name: "Fredrik", age: 25},
            {id: "2", name: "Anders", age: 23},
            {id: "3", name: "Signe", age: 22}
        ],
        showPersons: false,
        showCockpit: true
    };

    static getDerivedStateFromProps(props, state) {
        console.log("[App.js] getDerivedStateFromProps ", props);
        return state;
    }

    componentDidMount() {
        console.log("[App.js] componentDidMount")
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("[App.js] shouldComponentUpdate");
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("[App.js] componentDidUpdate");
    }

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
        console.log("[App.js] render");
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}/>
        }

        return (
            <div className={styles.app}>
                <button onClick={() =>  {this.state.showCockpit ? this.setState({showCockpit: false}) : this.setState({showCockpit: true})}}>Remove Cockpit</button>
                {this.state.showCockpit ? (
                    <Cockpit
                    title = {this.props.appTitle}
                    showPersons = {this.state.showPersons}
                    persons = {this.state.persons}
                    clicked = {this.togglePersonsHandler}/>
                    ) : null
                }

                {persons}
            </div>
        );
    }
}

export default App;
