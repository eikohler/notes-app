import { useState, useEffect } from 'react'
const randColors = require('get-random-colors');

const ColorPicker = () => {

  const [ brightColor, setbrightColor ] = useState((randColors.getRandomColors(69, 1)).hexColorLists);
  // useEffect(() => {
  //   // document.getElementById('notePad')!.style.backgroundColor = brightColors[1];
  // });

  function updateBGColor(color:any){
    document.getElementById('notePad')!.style.backgroundColor = color;
    setbrightColor((randColors.getRandomColors(69, 1)).hexColorLists);
  }


  return (
    <div id="color-picker">
      <div onClick={() => updateBGColor(brightColor)} className="color-box" style={{backgroundColor: brightColor}}></div>      
    </div>
  )
}

export default ColorPicker