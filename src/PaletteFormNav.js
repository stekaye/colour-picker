import React, {Component} from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {newPaletteName: ""}
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      this.props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    const {classes, open} = this.props;
    const {newPaletteName} = this.state;
    return (
      <div>
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
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
              <TextValidator 
                name="newPaletteName"
                label="Palette Name"
                value={this.state.newPaletteName} 
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter a palette name', 'Name already used!']}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
              <Link to='/'>
                <Button variant="contained" color="secondary">Go Back</Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default PaletteFormNav;
