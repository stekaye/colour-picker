import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
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

const drawerWidth = 420;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "teal",
      colors: this.props.palettes[0].colors,
      open: false,
      newColorName: "",
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteColor = this.deleteColor.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.state.colors.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.state.colors.every(
        ({color}) => color !== this.state.currentColor
      )
    );
  }

  handleDrawerOpen() {
    this.setState({open: true})
  };

  handleDrawerClose() {
    this.setState({open: false})
  };

  updateCurrentColor(newColor) {
    this.setState({currentColor: newColor.hex})
  }

  addNewColor() {
    //Create newColour OBJECT
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    //Add to existing array
    if (this.state.colors.length < this.props.maxColors) {
      this.setState({colors: [...this.state.colors, newColor], newColorName: ""});
    }
    
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

  handleSubmit(newPaletteName) {
    let newPalette = {
      paletteName: newPaletteName,
      colors: this.state.colors,
      id: newPaletteName.toLowerCase().replace(/ /g, "-")
    }
    this.props.savePalette(newPalette)
    this.props.history.push("/")
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
          classes={classes} 
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
          <Divider />
          <Typography variant="h4">
            Design your Palette
          </Typography>
          <div>
            <Button variant="contained" color="secondary" onClick={this.clearPalette}>
              Clear Palette
            </Button>
            <Button variant="contained" color="primary" onClick={this.addRandomColor} disabled={paletteIsFull}>
              Random Colour
            </Button>
          </div>
          <ChromePicker 
            color={this.state.currentColor} 
            onChange={this.updateCurrentColor} 
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator 
              name="newColorName"
              value={this.state.newColorName} 
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={['Enter a colour name', 'Name should be unique', 'Colour already used']}
            />
            <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            disabled={paletteIsFull}
            style={{backgroundColor: paletteIsFull ? "grey" : this.state.currentColor}} 
          >
            {paletteIsFull ? 'Palette Full' : 'Add Colour'}
          </Button>
        </ValidatorForm>

        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
            <DraggableColorList 
              colors={colors} 
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
