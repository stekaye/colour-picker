import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
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
      <CSSTransition key={palette.id} classNames='fade' timeout={500}>
        <MiniPalette 
          name={palette.paletteName} 
          emoji={palette.emoji} 
          colors={palette.colors} 
          key={palette.id} 
          id={palette.id}
          deletePalette={deletePalette}
          handleClick={() => this.goToPalette(palette.id)}
        />
      </CSSTransition>
    ))
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colours</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {miniPalette}
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);
