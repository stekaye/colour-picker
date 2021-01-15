export default {
  NavBar: {
    alignItems: 'center',
    display: 'flex',
    height: '6vh',
    justifyContent: 'flex-start'
  },
  logo: {
    alignItems: 'center',
    backgroundColor: '#eceff1',
    display: 'flex',
    fontFamily: 'Roboto',
    fontSize: '16px',
    height: '100%',
    marginRight: '15px',
    padding: '0 13px',
    '& a': {
      textDecoration: 'none',
      color: 'black'
    }
  },
  sliderContainer: {
    '& span': {
      fontFamily: 'Roboto',
      fontSize: '12px',
      fontWeight: '100',
      margin: '0 0 0 1rem'
    }
  },
  slider: {
    display: 'inline-block',
    margin: '0 10px',
    width: '280px',
    //Following styles must be in quotations as we are not creating unique classes. They must be the same to override the default styles given by Material UI.
    '& .rc-slider-rail': {
      height: '8px'
    },
    '& .rc-slider-track': {
      backgroundColor: 'transparent !important'
    },
    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus': {
      backgroundColor: 'green',
      border: '2px solid green',
      boxShadow: 'none',
      height: '13px',
      marginTop: '-3px',
      outline: 'none',
      width: '13px'
    }
  },
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem'
  }
}
