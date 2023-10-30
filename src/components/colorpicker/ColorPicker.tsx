import { useState, useEffect, useRef } from 'react'
import {changeLightness, hslToHex, getColorLuminance} from '../../helper/helperFunctions';
const RandColors = require('get-random-colors');
const { contrastColor } = require('contrast-color');

const ColorPicker = (props:any) => {  

  const {setNoteColors, noteID, content, noteColors} = props;
  const [ luminance, setLuminance ] = useState(69);

  // To update the input slider element
  const slider = useRef<any>(null);
  const startColor = getRandomColor();
  
  // Set state variables
  const [ bgColor, setbgColor ] = useState(startColor);
  const [ nextBGColor, setNextBGColor ] = useState(startColor);
  const [ fgColor, setfgColor ] = useState(getFGColor);

  /* When bg color state is changed:
  Save bg color to local storage
  Update document body's background color
  Update Text color and resize bar color
  Update input slider background */
  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.getElementById('notePad')!.style.color = fgColor;
    document.getElementById('resizeBar')!.style.backgroundColor = fgColor;
    slider.current.style.background = `linear-gradient(90deg, rgba(0, 0, 0, 0.3) ${luminance-4}%, 
    rgba(255,255,255,0) ${luminance}%)`;

    // Updates the color of the note in the list
    setNoteColors({bgColor: bgColor, fgColor: fgColor});
  }, [bgColor]);

  useEffect(() => {
    if(content == ""){
      setbgColor(nextBGColor);
      setNextBGColor(getRandomColor);
    }else{
      setfgColor(noteColors.fgColor);
      setLuminance(getColorLuminance(noteColors.bgColor));
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