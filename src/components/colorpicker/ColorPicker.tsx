import { useState, useEffect, useRef } from 'react'
import {changeLightness, hslToHex, getColorLuminance} from '../../helper/helperFunctions';
const RandColors = require('get-random-colors');
const { contrastColor } = require('contrast-color');

const ColorPicker = (props:any) => {  

  const {setNoteColors, noteID, noteColors, cpActive} = props;
  
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

  const [rangeActive, setRangeActive] = useState(false);

  /* When bg color state is changed:
  Save bg color to local storage
  Update document body's background color
  Update Text color and resize bar color
  Update input slider background */
  useEffect(() => {
    const newFGColor = getFGColor();

    localStorage.setItem('bg_color', bgColor);
    
    document.body.style.backgroundColor = bgColor;
    document.getElementById('notePad')!.style.color = newFGColor;
    document.getElementById('resizeBar')!.style.backgroundColor = newFGColor;
    slider.current.style.background = `linear-gradient(90deg, rgba(255, 255, 255, 0.5) ${luminance-4}%, 
    rgba(255,255,255,0.1) ${luminance}%)`;

    // Updates the color of the note in the list
    setNoteColors({bgColor: bgColor, fgColor: newFGColor});
  }, [bgColor]);

  useEffect(() => {
    if(noteColors.bgColor != null){
      const newLuminance = getColorLuminance(noteColors.bgColor);
      setLuminance(newLuminance);
      setNextBGColor(changeLightness(newLuminance, nextBGColor));
      setbgColor(noteColors.bgColor);    
    }
  }, [noteID]);

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
  }

  return (
    <div id="color-picker" className={`${cpActive ? "active" : ""}`}>
      <div className="mobile-spacer"></div>
      <div id="luminace-range">
        <input type="range" min="1" max="100" ref={slider} className={`${rangeActive ? "active" : ''}`}
        value={luminance} onChange={(event)=>updateLuminance(event)}         
        onTouchStart={()=>setRangeActive(true)} onTouchEnd={()=>setRangeActive(false)} />
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