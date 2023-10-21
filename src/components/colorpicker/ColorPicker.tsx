import { useState, useEffect } from 'react'
const RandColors = require('get-random-colors');
const { contrastColor } = require('contrast-color');

const ColorPicker = () => {

  const [ luminance, setLuminance ] = useState(69);
  const [ bgColor, setbgColor ] = useState(getRandomColor);
  const [ fgColor, setfgColor ] = useState("#000");

  function getRandomColor(){
    return (RandColors.getRandomColors(luminance, 1)).hslColorLists[0];
  }

  function updateBGColor(color:any){
    document.body.style.backgroundColor = color;
    document.getElementById('notePad')!.style.color = fgColor;
    document.getElementById('resizeBar')!.style.backgroundColor = fgColor;
    setbgColor(getRandomColor);
  }

  function updateLuminance(event:any){
    const value = parseInt(event.target.value);
    setLuminance(value);
    setbgColor(changeLightness(value, bgColor));
    setfgColor(contrastColor({ bgColor: hslToHex(bgColor) }));
  }

  const changeLightness = (newLightness:any, hslStr:any) => {
    const [hue, saturation] = hslStr.match(/\d+/g).map(Number);  
    return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
  };

  function hslToHex(hslStr:any) {
    let [h, s, l] = hslStr.match(/\d+/g).map(Number);
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n:any) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }


  return (
    <div id="color-picker">
      <div id="luminace-range">
        <input type="range" min="1" max="100" 
        value={luminance} onChange={(event) => updateLuminance(event)} />
      </div>
      <div onClick={() => updateBGColor(bgColor)} 
      className="color-box" style={{backgroundColor: bgColor}}></div>      
    </div>
  )
}

export default ColorPicker