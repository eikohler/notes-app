import { useState, useEffect, useRef } from 'react'
import {changeLightness, hslToHex, getColorLuminance} from '../../helper/helperFunctions';
const RandColors = require('get-random-colors');
const { contrastColor } = require('contrast-color');

const ColorPicker = () => {  

  // To update the input slider element
  const slider = useRef<any>(null);

  // Get last used color and luminance from local storage
  // Set luminance to last stored color luminance, if none defaults to 69
  // Set bg color to last stored, if none gets random color
  const color = localStorage.getItem('bg_color'),
  storedLuminance = color ? getColorLuminance(color) : 69,
  storedColor = color || getRandomColor;
  
  // Set state variables
  const [ luminance, setLuminance ] = useState(storedLuminance);
  const [ bgColor, setbgColor ] = useState(storedColor);
  const [ nextBGColor, setNextBGColor ] = useState(getRandomColor);
  const [ fgColor, setfgColor ] = useState(getFGColor);

  /* When bg color state is changed:
  Save bg color to local storage
  Update document body's background color
  Update Text color and resize bar color
  Update input slider background */
  useEffect(() => {
    localStorage.setItem('bg_color', bgColor);
    document.body.style.backgroundColor = bgColor;
    document.getElementById('notePad')!.style.color = fgColor;
    document.getElementById('resizeBar')!.style.backgroundColor = fgColor;
    slider.current.style.background = `linear-gradient(90deg, rgba(0, 0, 0, 0.3) ${luminance-4}%, 
    rgba(255,255,255,0) ${luminance}%)`;
  }, [bgColor]); 

  function getRandomColor(){
    return (RandColors.getRandomColors(luminance, 1)).hslColorLists[0];
  }
  function getFGColor(){
    return contrastColor({ bgColor: hslToHex(bgColor) });
  }

  // Update state color's luminance value then update text color
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
        <input type="range" min="1" max="100" ref={slider}
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