import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ColorBox.css'

class ColorBox extends Component {
  render() {
    const {background, name, color} = this.props;
    return (
      <CopyToClipboard text={color}>
        <div className="ColorBox" style={{background}}>
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-btn">Copy</button>
          </div>
          <span className="see-more">More</span>
        </div>
      </CopyToClipboard>
    )
  }
}

export default ColorBox;
