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
  arr = arr.slice(1, 7);
  return arr.join('');
}

export {changeLightness, hslToHex, getColorLuminance, getHTMLTextStr};