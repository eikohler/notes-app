import React from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {
    state = {
      background: '#fff',
    };
  
    handleChangeComplete = (color:any) => {
      this.setState({ background: color.hex });
    };
  
    render() {
      return (
        <div id="color-picker">
            <SketchPicker
            color={ this.state.background }
            onChangeComplete={ this.handleChangeComplete }
            />
        </div>
      );
    }
}

export default ColorPicker;