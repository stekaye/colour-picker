import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css';


class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500
    }
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(newLevel) {
    this.setState({level: newLevel})
  }

  render() {
    const {level} = this.state;
    const {colors} = this.props.palette;
    const colorBoxes = colors[level].map(color => (
      <ColorBox background ={color.hex} color={color.hex} name ={color.name} key={`${color.name}${color.hex}`} />
    ))

    return (
      <div className="Palette">
        <div className="slider">
          <Slider defaultValue={level} min={100} max={900} onAfterChange={this.changeLevel} step={100}/>
        </div>
        {/* Navbar goes here */}
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        {/* Footer goes here */}
      </div>
    )
  }
}

export default Palette;
