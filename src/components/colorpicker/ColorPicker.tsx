import { useState, useEffect } from 'react'
const randColors = require('get-random-colors');

const ColorPicker = () => {

  const [ luminance, setLuminance ] = useState(69);
  const [ brightColor, setbrightColor ] = useState(getRandomColor);

  function getRandomColor(){
    return (randColors.getRandomColors(luminance, 1)).hslColorLists[0];
  }

  function updateBGColor(color:any){
    document.body.style.backgroundColor = color;
    setbrightColor(getRandomColor);
  }

  const changeLightness = (newLightness:any, hslStr:any) => {
    const [hue, saturation] = hslStr.match(/\d+/g).map(Number);  
    return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
  };


  return (
    <div id="color-picker">
      <div id="luminace-range">
        <input 
          type="range"
          min="1" 
          max="100"
          value={luminance}
          onChange={(event) => {
            const value = parseInt(event.target.value);
            setLuminance(value);
            setbrightColor(changeLightness(value, brightColor));
          }}
        />
      </div>
      <div onClick={() => updateBGColor(brightColor)} className="color-box" style={{backgroundColor: brightColor}}></div>      
    </div>
  )
}

export default ColorPicker