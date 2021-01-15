import chroma from 'chroma-js';

export default {
  ColorBox: {
    cursor: 'pointer',
    display: 'inline-block',
    height: props => props.showingFullPalette ? '25%' : '50%',
    margin: '0 auto -3.5px auto',
    position: 'relative',
    textTransform: 'uppercase',
    width: '20%',
    '&:hover button': {
      opacity: '1',
      transition: '0.5s'
    }
  },
  copyText: {
    color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "#fff"
  },
  colorName: {
    color: props => chroma(props.background).luminance() <= 0.08 ? "#fff" : "rgba(0, 0, 0, 0.6)"
  },
  boxContent: {
    bottom: '0px',
    color: 'black',
    fontSize: '.7rem',
    left: '0px',
    letterSpacing: '1px',
    padding: '10px',
    position: 'absolute',
    textAlign: 'left',
    width: '100%'
  },
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    border: 'none',
    bottom: '0px',
    color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "#fff",
    fontSize: '.7rem',
    height: '25px',
    lineHeight: '25px',
    margin: '5px',
    position: 'absolute',
    right: '0px',
    textAlign: 'center',
    width: '60px'
  },
  copyOverlay: {
    height: '100%',
    opacity: '0',
    transform: 'scale(0.1)',
    width: '100%',
    zIndex: '0',
  },
  overlayShow: {
    opacity: '1',
    position: 'absolute',
    transform: 'scale(50)',
    transition: 'transform 0.6s ease-in-out',
    zIndex: '10'
  },
  copyBtn: {
    background: 'rgba(255, 255, 255, 0.3)',
    border: 'none',
    color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "#fff",
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '0.9rem',
    height: '30px',
    left: '50%',
    lineHeight: '30px',
    opacity: '0',
    outline: 'none',
    position: 'absolute',
    textAlign: 'center',
    textDecoration: 'none',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90px',
  },
  copyMessage: {
    alignItems: 'center',
    bottom: '0',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '3rem',
    justifyContent: 'center',
    left: '0',
    opacity: '0',
    position: 'fixed',
    right: '0',
    top: '0',
    transform: 'scale(0.1)',
    '& h1': {
      background: 'rgba(255, 255, 255, 0.2)',
      fontWeight: '400',
      marginBottom: '0',
      padding: '1rem',
      textAlign: 'center',
      textShadow: '1px 2px black',
      width: '100%'
    },
    '& p': {
      fontSize: '2rem',
      fontWeight: '100',
      textTransform: 'lowercase',
    }
  },
  messageShow: {
    opacity: '1',
    transform: 'scale(1)',
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.3s',
    zIndex: '10'
  }
}
