import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Toolbar from './components/Toolbar';
import List from './components/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ToDo App</h1>
        </header>
        <section>
          <Toolbar />
          <List />
        </section>
      </div>
    );
  }
}

export default App;
