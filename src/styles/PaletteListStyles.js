import sizes from './sizes'

export default {
  root: {
    alignItems: 'flex-start',
    backgroundColor: "blue",
    display: 'flex',
    height: "100vh",
    justifyContent: 'center'
  },
  container: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '50%',
    [sizes.down('xl')]: {
      width: '80%'
    },
    [sizes.down('xs')]: {
      width: '75%'
    }
  }, 
  nav: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    '& a': {
      color: 'white',
      textDecoration: 'none'
    },
  },
  palettes: {
    boxSizing: 'border-box',
    display: 'grid',
    gridGap: '2.5rem',
    gridTemplateColumns: 'repeat(3, 30%)',
    width: '100%',
    [sizes.down('ms')]: {
      gridTemplateColumns: 'repeat(2, 50%)',
    },
    [sizes.down('xs')]: {
      gridGap: '1rem',
      gridTemplateColumns: 'repeat(1, 100%)',
    }
  }
};
