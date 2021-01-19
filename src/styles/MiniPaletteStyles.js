export default {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    '&:hover svg': {
      opacity: 1
    },
  },
  colors: {
    backgroundColor: '#dae1e4',
    borderRadius: '5px',
    height: '120px',
    overflow: 'hidden',
    width: '100%'
  },
  title: {
    alignItems: 'center',
    color: 'black',
    display: 'flex',
    fontSize: '0.7rem',
    justifyContent: 'space-between',
    margin: '0',
    paddingTop: '0.5rem',
    position: 'relative'
  },
  emoji: {
    fontSize: '1.5rem',
    marginLeft: '0.5rem'
  },
  miniColor: {
    display: 'inline-block',
    height: '25%',
    margin: '0 auto -3.5px',
    position:'relative',
    width: '20%'
  },
  deleteIcon: {
    backgroundColor: "#eb3d30",
    color: "white",
    height: '16px',
    opacity: 0,
    padding: '8px',
    position: 'absolute',
    right: '0px',
    top: '0px',
    width: '16px',
    zIndex: 10
  }
}
