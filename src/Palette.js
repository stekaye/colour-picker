import React, {Component} from 'react';
import NavBar from './NavBar';
import ColorBox from './ColorBox';
import Footer from './Footer'
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
    const {colors, paletteName, emoji, id} = this.props.palette;
    const colorBoxes = colors[level].map(color => (
      <ColorBox background ={color[format]} color={color[format]} name ={color.name} paletteId={id} id={color.id} key={`${color.name}${color[format]}`} showMoreLink/>
    ))

    return (
      <div className="Palette">
        <NavBar changeLevel={this.changeLevel} handleChange={this.changeFormat} level={level} displaySlider/>
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        <Footer paletteName={paletteName} emoji={emoji}/>
      </div>
    )
  }
}

export default Palette;
