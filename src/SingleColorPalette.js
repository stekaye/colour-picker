import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import Footer from './Footer';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteStyles';



class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {format: 'hex'}
    this.changeFormat = this.changeFormat.bind(this);
    this._shades = this.gatherShades(this.props.palette, this.props.match.params.colorId)
  }

  changeFormat(val) {
    this.setState({format: val})
  }

  gatherShades(palette, colorToFilterBy) {
    let shadesArray = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shadesArray = shadesArray.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }
    //return all colours from index 1.
    return shadesArray.slice(1);
  }

  render() {
    const {format} = this.state;
    const {paletteName, emoji, id} = this.props.palette;
    const {classes} = this.props;
    const colorBoxes = this._shades.map(shade => (<ColorBox 
      background={shade[format]} 
      color={shade.hex} 
      name={shade.name} 
      key={shade.name}
      showingFullPalette={false}
    />))
    return (
      <div className={classes.Palette}>
        <NavBar handleChange={this.changeFormat} displaySlider={false}/>
        <div className={classes.PaletteColors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>Go Back</Link>
          </div>
        </div>
        <Footer paletteName={paletteName} emoji={emoji}/>
      </div>
    )
  }
}

export default withStyles(styles)(SingleColorPalette);
