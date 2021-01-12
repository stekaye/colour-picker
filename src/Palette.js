import React, {Component} from 'react';
import NavBar from './NavBar';
import ColorBox from './ColorBox';
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
        <NavBar changeLevel={this.changeLevel} level={level}/>
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        {/* Footer goes here */}
      </div>
    )
  }
}

export default Palette;
