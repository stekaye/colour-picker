import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deleteId: ""
    }
    this.goToPalette = this.goToPalette.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }

  openDialog(id) {
    this.setState({openDeleteDialog: true, deleteId: id})
  }

  closeDialog(){
    this.setState({openDeleteDialog: false, deleteId: ""})
  }

  handleDelete() {
    this.props.deletePalette(this.state.deleteId);
    this.closeDialog();
  }

  render() {
    const {paletteList, classes} = this.props;
    const {openDeleteDialog} = this.state;
    let miniPalette = paletteList.map(palette => (
      <CSSTransition key={palette.id} classNames='fade' timeout={500}>
        <MiniPalette 
          name={palette.paletteName} 
          emoji={palette.emoji} 
          colors={palette.colors} 
          key={palette.id} 
          id={palette.id}
          openDialog={this.openDialog}
          goToPalette={this.goToPalette}
        />
      </CSSTransition>
    ))
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colours</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {miniPalette}
          </TransitionGroup>
        </div>

        <Dialog open={openDeleteDialog} onClose={this.closeDialog} aria-labelledby="delete-dialog-title">
          <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                  <CheckIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Delete'/>
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
              <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                  <CloseIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Cancel'/>
            </ListItem>
          </List>
        </Dialog>

      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);
