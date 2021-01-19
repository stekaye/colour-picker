import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {arrayMove} from 'react-sortable-hoc';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/NewPaletteFormStyles';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  constructor(props) {
    super(props);
    this.state = {
      colors: this.props.palettes[0].colors,
      open: false,
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteColor = this.deleteColor.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  handleDrawerOpen() {
    this.setState({open: true})
  };

  handleDrawerClose() {
    this.setState({open: false})
  };

  addNewColor(newColor) {
    //Add to existing array
    this.setState({colors: [...this.state.colors, newColor]});
  }

  deleteColor(name) {
    let newColors = this.state.colors.filter(color => {
      return color.name !== name
    })
    this.setState({colors: newColors})
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(newPalette) {
    newPalette.colors = this.state.colors;
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  clearPalette() {
    this.setState({colors: []})
  }

  addRandomColor() {
    const allColors = this.props.palettes.map(palette => palette.colors).flat();
    let randomInd = Math.floor(Math.random() * allColors.length);
    let randomColor = allColors[randomInd];
    if (this.state.colors.length < this.props.maxColors) {
      this.setState({colors: [...this.state.colors, randomColor]})
    }
  }

  render() {
    const {classes, maxColors, palettes} = this.props;
    const {open, colors} = this.state;
    const paletteIsFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav 
          open={open} 
          palettes={palettes} 
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>  

          <div className={classes.drawerContainer}>
            <Divider />
            <Typography variant="h5" gutterBottom>
              Design your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button 
                className={classes.button} 
                variant="contained" 
                color="secondary" 
                onClick={this.clearPalette}
              >
                Clear Palette
              </Button>
              <Button 
                className={classes.button} 
                variant="contained" 
                color="primary" 
                onClick={this.addRandomColor} 
                disabled={paletteIsFull}
              >
                Random Colour
              </Button>
            </div>

            <ColorPickerForm 
              addNewColor={this.addNewColor}
              colors={this.state.colors}
              paletteIsFull={paletteIsFull}
              updateCurrentColor={this.updateCurrentColor} 
            />
          </div>
          
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
            <DraggableColorList 
              colors={colors} 
              distance={20}
              //Not counted as drag unless dragged more than 20px. Prevents bug with delete sometimes not triggering.
              deleteColor={this.deleteColor}
              axis='xy'
              onSortEnd={this.onSortEnd}
            />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withThemes: true })(NewPaletteForm);
