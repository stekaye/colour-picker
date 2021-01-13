import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedPalettes from './seedPalettes';
import SingleColorPalette from './SingleColorPalette';
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
        <Route exact path="/" render={(routeProps) => <PaletteList paletteList={seedPalettes} {...routeProps}/>}/>
        <Route 
          exact 
          path="/palette/:id" 
          render={routeProps => (<Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>)}
        />
        <Route 
          exact 
          path="/palette/:paletteId/:colorId" 
          render={() => <SingleColorPalette/>}
        />
        <Redirect to="/"></Redirect>
      </Switch>
    )
  }
}

export default App;
