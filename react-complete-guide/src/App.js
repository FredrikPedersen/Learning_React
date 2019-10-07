import React, { Component } from 'react';
import './App.css';

class App extends Component{
  render() {
    return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Hi, I\'m a React App!'));
  }
}

export default App;
