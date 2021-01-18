import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 420;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    alignItems: 'center',
    flexDirection: 'row',
    height: '64px',
    justifyContent: 'space-between'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navBtns: {
    marginRight: '1rem'
  },
  button: {
    margin: '0 0.5rem'
  },
  link: {
    textDecoration: 'none'
  }
})

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {formShowing: false}
    this.showForm = this.showForm.bind(this);
  }

showForm() {
    this.setState({ formShowing: true })
  }

  render() {
    const {classes, open, palettes, handleSubmit} = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color="default"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create a Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
              <Link to='/' className={classes.link}>
                <Button variant="contained" color="secondary" className={classes.button}>Go Back</Button>
              </Link>
              <Button variant="contained" color="primary" onClick={this.showForm} className={classes.button}>
                Save Palette
              </Button>
            </div>
        </AppBar>

        {this.state.formShowing && <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit}/>}

      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);
