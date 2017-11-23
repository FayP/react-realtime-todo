import React, { Component } from 'react';

import './App.css';

import TodoToolbar from './components/Toolbar';
import TodoList from './components/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Your Tasks Today</h1>
        </header>
        <section>
          <TodoToolbar />
          <div className="App-listcontainer">
            <TodoList />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
