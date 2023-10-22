import { useState, useEffect } from 'react'
import {changeLightness, hslToHex} from '../../helper/helperFunctions';
const RandColors = require('get-random-colors');
const { contrastColor } = require('contrast-color');

const ColorPicker = () => {  

  const [ luminance, setLuminance ] = useState(69);
  const [ bgColor, setbgColor ] = useState(getRandomColor);
  const [ nextBGColor, setNextBGColor ] = useState(getRandomColor);
  const [ fgColor, setfgColor ] = useState(getFGColor);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.getElementById('notePad')!.style.color = fgColor;
    document.getElementById('resizeBar')!.style.backgroundColor = fgColor;
  }, [bgColor]);

  function getRandomColor(){
    return (RandColors.getRandomColors(luminance, 1)).hslColorLists[0];
  }

  function getFGColor(){
    return contrastColor({ bgColor: hslToHex(bgColor) });
  }

  function updateLuminance(event:any){
    const value = parseInt(event.target.value);
    setLuminance(value);
    setNextBGColor(changeLightness(value, nextBGColor));
    setbgColor(changeLightness(value, bgColor));
    setfgColor(getFGColor);
  }

  return (
    <div id="color-picker">
      <div id="luminace-range">
        <input type="range" min="1" max="100" 
        value={luminance} onChange={(event) => updateLuminance(event)} />
      </div>
      <div onClick={() => {
        setbgColor(nextBGColor);
        setNextBGColor(getRandomColor);
      }}
      className="color-box" style={{backgroundColor: nextBGColor}}></div>      
    </div>
  )
}

export default ColorPicker