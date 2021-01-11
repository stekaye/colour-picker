import React, {Component} from 'react';
import Palette from './Palette';
import seedPalettes from './seedPalettes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Palette {...seedPalettes[5]}/>
      </div>
    )
  }
}

export default App;
