import React, {Component} from 'react';
import chroma from 'chroma-js';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import './ColorBox.css'

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
    const {background, name, color, paletteId, id, showMoreLink} = this.props;
    const {copied} = this.state;
    const isDark = chroma(background).luminance() <= 0.08;
    const isLight = chroma(background).luminance() >= 0.7;
    // const moreLink =  <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
    //                     <span className={'see-more ${isLight && "dark-text"}'}>MORE</span>
    //                   </Link>
    return (
      <CopyToClipboard text={color} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{background}}>

        <div 
          className={`copy-overlay ${copied && "show"}`}
          style={{background}}>
        </div>
        <div className={`copy-message ${copied && "show"}`}>
          <h1>Copied!</h1>
          <p className={`${isLight && "dark-text"}`}>{background}</p>
        </div>

          <div className="copy-container">
            <div className='box-content'>
              <span className={isDark && 'light-text'}>{name}</span>
            </div>
            <button className={`copy-btn ${isLight && "dark-text"}`}>Copy</button>
          </div>
          {showMoreLink && ( 
            <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
              <span className={`see-more`}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    )
  }
}

export default ColorBox;
