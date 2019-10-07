import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'


class App extends Component{
  render() {
    return (
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p>This is really working!</p>
          <Person name="Fredrik" age="25">My Hobbies: React</Person>
        </div>
    );
  }
}

export default App;
