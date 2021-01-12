import React, {Component} from 'react';
import NavBar from './NavBar';
import ColorBox from './ColorBox';
import './Palette.css';


class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: 'hex'
    }
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(newLevel) {
    this.setState({level: newLevel})
  }

  changeFormat(val) {
    this.setState({format: val})
  }

  render() {
    const {level, format} = this.state;
    const {colors, paletteName, emoji} = this.props.palette;
    const colorBoxes = colors[level].map(color => (
      <ColorBox background ={color[format]} color={color[format]} name ={color.name} key={`${color.name}${color[format]}`} />
    ))

    return (
      <div className="Palette">
        <NavBar changeLevel={this.changeLevel} handleChange={this.changeFormat} level={level}/>
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        <footer className="Palette-footer">
          {paletteName}
          <span className="emoji">{emoji}</span>
        </footer>
      </div>
    )
  }
}

export default Palette;
