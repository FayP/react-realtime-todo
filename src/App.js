import React, { Component } from 'react';

import './App.css';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TodoToolbar from './components/TodoToolbar';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';

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
            <Paper zDepth={1} className="App-listcontainer--paper">
              <TodoList />
              <Divider />
              <TodoFooter />
            </Paper>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
