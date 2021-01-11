import React, {Component} from 'react';
import './ColorBox.css'

class ColorBox extends Component {
  render() {
    const {background} = this.props;
    return (
      <div className="ColorBox" style={{background: background}}>
        <span>MORE</span>
      </div>
    )
  }
}

export default ColorBox;
