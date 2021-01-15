import React from 'react';
import {withStyles} from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';

function MiniPalette(props) {
  const {classes, name, emoji, colors} = props;
  const miniGrid = colors.map(color => (
    <div 
      className={classes.miniColor} 
      style={{backgroundColor: color.color}} 
      key={color.name}
    />
  ))
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>
        {miniGrid}
      </div>
      <h5 className={classes.title}>{name} <span className={classes.emoji}>{emoji}</span></h5>
    </div>
  )
}

export default withStyles(styles)(MiniPalette);