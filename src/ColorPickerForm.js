import React, {Component} from 'react';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {withStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "teal",
      newColorName: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.props.colors.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.props.colors.every(
        ({color}) => color !== this.state.currentColor
      )
    );
  }

  updateCurrentColor(newColor) {
    this.setState({currentColor: newColor.hex})
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit() {
    //Create newColour OBJECT
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    this.props.addNewColor(newColor)
    this.setState({newColorName: ""})
  }

  render() {
    const {paletteIsFull, classes} = this.props;
    const {currentColor, newColorName} = this.state
    return (
      <div className={classes.formContainer}>
        <ChromePicker 
          color={currentColor} 
          onChange={this.updateCurrentColor} 
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit} ref='form' instantValidate={false}>
          <TextValidator 
            className={classes.colorNameInput}
            placeholder="Colour Name"
            margin="normal"
            name="newColorName"
            variant="filled"
            value={newColorName} 
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['Enter a colour name', 'Name should be unique', 'Colour already used']}
          />
          <Button 
            className={classes.addColor}
            variant="contained" 
            color="primary" 
            type="submit"
            disabled={paletteIsFull}
            style={{backgroundColor: paletteIsFull ? "grey" : currentColor}} 
          >
            {paletteIsFull ? 'Palette Full' : 'Add Colour'}
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPickerForm);
