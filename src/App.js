import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
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
    this.deletePalette = this.deletePalette.bind(this);
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

  deletePalette(paletteId) {
    this.setState(st => ({
      palettes: st.palettes.filter(palette => palette.id !== paletteId)
    }), this.syncLocalStorage);
  }

  syncLocalStorage() {
    //Save palettes to local storage.
    //NB local storage requires strings.
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render() {
    return (
      <Route
        render={({location}) => (
          <TransitionGroup>
            <CSSTransition classNames="fade" timeout={500} key={location.key}>
              <Switch location={location}>
                <Route 
                  exact 
                  path="/" 
                  render={routeProps => (
                    <div className='page'>
                      <PaletteList 
                        paletteList={this.state.palettes}
                        deletePalette={this.deletePalette} 
                        {...routeProps}
                      />
                    </div>
                  )} 
                />
                <Route 
                  exact 
                  path="/palette/new" 
                  render={(routeProps) => (
                    <div className='page'>
                      <NewPaletteForm 
                        savePalette={this.savePalette} 
                        palettes={this.state.palettes} 
                        {...routeProps}
                      />
                    </div>
                  )} 
                />
                <Route 
                  exact 
                  path="/palette/:id" 
                  render={routeProps => (
                    <div className='page'>
                      <Palette 
                        palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                      />
                    </div>
                  )}
                />
                <Route 
                  exact 
                  path="/palette/:paletteId/:colorId" 
                  render={routeProps => (
                    <div className='page'>
                      <SingleColorPalette 
                        palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} 
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Redirect to="/"></Redirect>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    )
  }
}

export default App;
