import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Palette from './Palette';
import seedPalettes from './seedPalettes';
import {generatePalette} from './colorHelpers';
import './App.css';

class App extends Component {
  findPalette(id) {
    return seedPalettes.find(function(palette) {
      return palette.id === id;
    })
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>Palette List Here</h1>}/>
        <Route 
          exact 
          path="/palette/:id" 
          render={routeProps => (<Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>)}
        />
        <Redirect to="/"></Redirect>
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedPalettes[4])}/>
      // </div>
    )
  }
}

export default App;
