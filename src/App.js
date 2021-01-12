import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Palette from './Palette';
import seedPalettes from './seedPalettes';
import {generatePalette} from './colorHelpers';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>Palette List Here</h1>}/>
        <Route exact path="/palette/:id" render={() => <h1>Individual</h1>}/>
        <Redirect to="/"></Redirect>
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedPalettes[4])}/>
      // </div>
    )
  }
}

export default App;
