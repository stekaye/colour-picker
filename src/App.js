import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedPalettes from './seedPalettes';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';
import {generatePalette} from './colorHelpers';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedPalettes
    }
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    })
  }

  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage);
    //Then add/sync to local storage
  }

  syncLocalStorage() {
    //Save palettes to local storage.
    //NB local storage requires strings.
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={(routeProps) => <PaletteList paletteList={this.state.palettes} {...routeProps}/>} />
        <Route 
          exact 
          path="/palette/new" 
          render={(routeProps) => <NewPaletteForm 
                                    savePalette={this.savePalette} 
                                    palettes={this.state.palettes} 
                                    {...routeProps}
                                  />} 
          />
        <Route 
          exact 
          path="/palette/:id" 
          render={routeProps => (<Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>)}
        />
        <Route 
          exact 
          path="/palette/:paletteId/:colorId" 
          render={routeProps => (<SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} {...routeProps}/>)}
        />
        <Redirect to="/"></Redirect>
      </Switch>
    )
  }
}

export default App;
