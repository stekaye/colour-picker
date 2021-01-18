import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.goToPalette = this.goToPalette.bind(this);
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }

  render() {
    const {paletteList, classes, deletePalette} = this.props;
    let miniPalette = paletteList.map(palette => (
      <MiniPalette 
        name={palette.paletteName} 
        emoji={palette.emoji} 
        colors={palette.colors} 
        key={palette.id} 
        id={palette.id}
        deletePalette={deletePalette}
        handleClick={() => this.goToPalette(palette.id)}/>
    ))
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colours</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {miniPalette}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);
