import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles/NavBarStyles';
import 'rc-slider/assets/index.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex",
      open: false
    }
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(evt) {
    this.setState({format: evt.target.value, open: true});
    this.props.handleChange(evt.target.value);
  }

  closeSnackbar() {
    this.setState({open: false});
  }

  render() {
    const {changeLevel, level, displaySlider, classes} = this.props;
    const {format} = this.state;
    const slider =  <div className={classes.sliderContainer}>
                      <span>Level: {level}</span>
                      <div className={classes.slider}>
                        <Slider defaultValue={level} min={100} max={900} onAfterChange={changeLevel} step={100}/>
                      </div>
                    </div>
    return (
      <nav className={classes.NavBar}>
        <div className={classes.logo}>
          <Link to='/'>reactcolourpicker</Link>
        </div>
        {displaySlider && slider}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar 
          anchorOrigin={{vertical: "bottom", horizontal: "left"}} 
          open={this.state.open}
          autoHideDuration={2000}
          message={<span id="message-id">Format Changed to {format.toUpperCase()}!</span>}
          ContentProps={{"aria-describedby": "message-id"}}
          onClose={this.closeSnackbar}
          action={[
            <IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
              <CloseIcon />
            </IconButton>
          ]}
        />
      </nav>
    )
  }
}

export default withStyles(styles)(NavBar);
