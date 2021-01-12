import React, {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './NavBar.css';

class NavBar extends Component {
  render() {
    const {changeLevel, level} = this.props;
    return (
      <nav className="NavBar">
        <div className="logo">
          <a href='#'>reactcolourpicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
        </div>
        <div className="slider">
          <Slider defaultValue={level} min={100} max={900} onAfterChange={changeLevel} step={100}/>
        </div>
      </nav>
    )
  }
}

export default NavBar;
