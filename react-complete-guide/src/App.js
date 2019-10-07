import React, { useState} from 'react';
import './App.css';
import Person from './Person/Person'


const App = (props) => {
    const [personsState, setPersonsState ] = useState( {
        persons: [
            { name: 'Fredrik', age: 25 },
            { name: "Anders", age: 23}
        ]
    });

    const [otherState, setOtherState] = useState('some other value');

    console.log(personsState, otherState);

    const switchNameHandler = () => {
        setPersonsState({
            persons: [
                { name: 'Fredrika', age: 28 },
                { name: "Andrine", age: 24}
            ]
        })
    };

    return (
        <div className="App">
            <h1>Hi, I'm a React App</h1>
            <button onClick={switchNameHandler}>Switch Names</button>
            <Person name={personsState.persons[0].name} age={personsState.persons[0].age}>My Hobbies: React</Person>
            <Person name={personsState.persons[1].name} age={personsState.persons[1].age}/>
        </div>
    );
};

/*
state = {
    persons: [
        { name: 'Fredrik', age: 25 },
        { name: "Anders", age: 23}
    ]
};

switchNameHandler = () => {
    this.setState({
        persons: [
            { name: 'Fredrika', age: 28 },
            { name: "Andrine", age: 24}
        ],
        otherState: 'some other value'
    })
};
 */
export default App;
