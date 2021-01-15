import React, {Component} from 'react';
import {withStyles} from '@material-ui/styles';
import {SortableElement} from 'react-sortable-hoc'
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  DraggableColorBox: {
    cursor: 'pointer',
    display: 'inline-block',
    height: '25%',
    margin: '0 auto -5px auto',
    position: 'relative',
    textTransform: 'uppercase',
    width: '20%',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.2)'
    }
  },
  boxContent: {
    alignItems: 'center',
    bottom: '0px',
    color: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    fontSize: '.7rem',
    justifyContent: 'space-between',
    left: '0px',
    letterSpacing: '1px',
    padding: '10px',
    position: 'absolute',
    textAlign: 'left',
    width: '100%'
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out'
  }
}

const DraggableColorBox = SortableElement((props) => {
  const {classes, color, name, handleClick} = props;
  return (
    <div className={classes.DraggableColorBox} style={{backgroundColor: color}}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <span className={classes.deleteIcon} onClick={handleClick}><DeleteIcon/></span>
      </div>
      
    </div>
  )
})

export default withStyles(styles)(DraggableColorBox);
