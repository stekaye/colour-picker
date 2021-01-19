import React, {Component} from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Picker} from 'emoji-mart';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'form',
      open: true,
      newPaletteName: "",
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.addEmojiAndSubmit = this.addEmojiAndSubmit.bind(this);
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

  handleClickOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  showEmojiPicker() {
    this.setState({stage: 'emoji'})
  }

  addEmojiAndSubmit(emoji) {
    let newPaletteObject = {  paletteName: this.state.newPaletteName,
                              emoji: emoji.native }
    this.props.handleSubmit(newPaletteObject)
    this.setState({stage: ''})
  }

  render() {
    const {newPaletteName, stage} = this.state;
    const {hideForm} = this.props;
    return (
      <div>
        <Dialog open={stage === 'emoji'} onClose={hideForm}>
          <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
          <Picker onSelect={this.addEmojiAndSubmit}/>
        </Dialog>
        <Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new awesome palette. Make sure it's unique!
              </DialogContentText>
              <TextValidator 
                name="newPaletteName"
                label="Palette Name"
                value={newPaletteName} 
                onChange={this.handleChange}
                fullWidth
                margin='normal'
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter a palette name', 'Name already used!']}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    )
  }
}

export default PaletteMetaForm;


