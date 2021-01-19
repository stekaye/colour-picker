import sizes from './sizes';
import chroma from 'chroma-js';

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
    },
    [sizes.down('lg')]: {
      height: '20%',
      width: '25%'
    },
    [sizes.down('md')]: {
      height: '10%',
      width: '50%'
    },
    [sizes.down('sm')]: {
      height: '5%',
      width: '100%'
    }
  },
  boxContent: {
    alignItems: 'center',
    bottom: '0px',
    color: props => chroma(props.color).luminance() <= 0.08 ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.6)",
    display: 'flex',
    fontSize: '.7rem',
    justifyContent: 'space-between',
    left: '0px',
    letterSpacing: '1px',
    padding: '10px',
    position: 'absolute',
    textAlign: 'left',
    width: '100%',
    [sizes.down('sm')]: {
      top: '2%',
    }
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out',
    marginRight: '15px'
  }
}

export default styles;
