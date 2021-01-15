export default {
  Palette: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  PaletteColors: {
    height: '90%'
  },
  goBack: {
    backgroundColor: 'black',
    cursor: 'pointer',
    display: 'inline-block',
    height: '50%',
    margin: '0 auto -3.5px auto',
    opacity: '1',
    position: 'relative',
    textTransform: 'uppercase',
    width: '20%',
    '& a': {
      background: 'rgba(255, 255, 255, 0.3)',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      display: 'inline-block',
      fontSize: '0.9rem',
      height: '30px',
      left: '50%',
      lineHeight: '30px',
      outline: 'none',
      position: 'absolute',
      textAlign: 'center',
      textDecoration: 'none',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90px'
    }
  }
}
