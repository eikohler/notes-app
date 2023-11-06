const truncate = require('html-truncate');

function changeLightness(newLightness:any, hslStr:any){
  const [hue, saturation] = hslStr.match(/\d+/g).map(Number);  
  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
};

function getColorLuminance(hslStr:any){
  const [hue, saturation, luminance] = hslStr.match(/\d+/g).map(Number);  
  return luminance;
}

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

function getHTMLTextStr(str:any){
  let temp = document.createElement('div');
  temp.innerHTML = str;
  let arr = Array.prototype.map.call(temp.childNodes, function(node) {
      return node.nodeType === 1 
          ? node.outerHTML
          : node.nodeValue;
  });
  const text = arr.slice(1, arr.length).find(el => el != null && el != '<p><br></p>');
  return text != null ? truncate(text, 70) : "";
}

function getNextID(list:any){
  const arr = list.map((note:any)=> note.id);
  return Math.max(...arr) + 1;
}

function getDiff(a:any, b:any){
  return 100*Math.abs((a-b)/((a+b)/2));
}

export {changeLightness, hslToHex, getColorLuminance, getHTMLTextStr, getNextID, getDiff};