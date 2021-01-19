import sizes from './sizes'
import bg from './bg.svg';

export default {
  root: {
    alignItems: 'flex-start',
    backgroundColor: '#08375b',
    backgroundImage: `url(${bg})`,
     /* background by SVGBackgrounds.com */
    display: 'flex',
    height: "100vh",
    justifyContent: 'center',
    overflow: 'scroll'
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
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 50%)',
    },
    [sizes.down('xs')]: {
      gridGap: '1.4rem',
      gridTemplateColumns: 'repeat(1, 100%)',
    }
  },
  heading: {
    fontSize: '1.6rem'
  }
};
