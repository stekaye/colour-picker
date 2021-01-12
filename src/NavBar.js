import React, {Component} from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex"
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({format: evt.target.value});
    this.props.handleChange(evt.target.value);
  }

  render() {
    const {changeLevel, level} = this.props;
    const {format} = this.state;
    return (
      <nav className="NavBar">
        <div className="logo">
          <a href='#'>reactcolourpicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider defaultValue={level} min={100} max={900} onAfterChange={changeLevel} step={100}/>
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
      </nav>
    )
  }
}

export default NavBar;
