import React, {Component} from 'react';
import chroma from 'chroma-js';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import './ColorBox.css';

const styles = {
  ColorBox: {
    cursor: 'pointer',
    display: 'inline-block',
    height: props => props.showingFullPalette ? '25%' : '50%',
    margin: '0 auto -3.5px auto',
    position: 'relative',
    textTransform: 'uppercase',
    width: '20%',
    '&:hover button': {
      opacity: '1',
      transition: '0.5s'
    }
  },
  copyText: {
    color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "#fff"
  },
  colorName: {
    color: props => chroma(props.background).luminance() <= 0.08 ? "#fff" : "rgba(0, 0, 0, 0.6)"
  },
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    border: 'none',
    bottom: '0px',
    color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "#fff",
    fontSize: '.7rem',
    height: '25px',
    lineHeight: '25px',
    margin: '5px',
    position: 'absolute',
    right: '0px',
    textAlign: 'center',
    width: '60px'
  },
  copyBtn: {
    background: 'rgba(255, 255, 255, 0.3)',
    border: 'none',
    color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0, 0, 0, 0.6)" : "#fff",
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '0.9rem',
    height: '30px',
    left: '50%',
    lineHeight: '30px',
    opacity: '0',
    outline: 'none',
    position: 'absolute',
    textAlign: 'center',
    textDecoration: 'none',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90px',
  },

}

//pass classes down to props

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {copied: false}
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({copied: false}), 1500)
    })
  }

  render() {
    const {background, name, color, paletteId, id, showingFullPalette, classes} = this.props;
    const {copied} = this.state;
    
    return (
      <CopyToClipboard text={color} onCopy={this.changeCopyState}>
        <div className={classes.ColorBox} style={{background}}>
          <div 
            className={`copy-overlay ${copied && "show"}`}
            style={{background}}>
          </div>
          <div className={`copy-message ${copied && "show"}`}>
            <h1>Copied!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div className="copy-container">
            <div className='box-content'>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyBtn}>Copy</button>
          </div>
          {showingFullPalette && ( 
            <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    )
  }
}

export default withStyles(styles)(ColorBox);
