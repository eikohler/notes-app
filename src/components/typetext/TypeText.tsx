import { useEffect, useState, useRef } from "react";

const TypeText = (props:any) => {

    const {text} = props;
    const [chars, setChars] = useState(text.split(''));        
    const [animClass, setAnimClass] = useState('');

    useEffect(() => {
        setChars(text.split(''));
        setTimeout(function(){
            setAnimClass('anim-in');
        }, 800);
    }, [text]);  

    useEffect(() => {
        const delay = ((chars.length)*0.2)*1000;
        console.log(delay);        
        setTimeout(function(){
            setAnimClass(animClass === 'anim-in' ? 'anim-out' : 'anim-in');
        }, delay);
    }, [animClass]);

    return (
        <div id="ph-text" className={animClass}>{
            chars.map((char:any, i:any)=>{return(
                <span style={{
                    animationDelay: animClass == ('' || 'anim-in') ? ((i+1)*0.1)+'s' : ((chars.length-i)*0.1)+'s'
                }} 
                key={char+i}>{char}</span>
            )})
        }</div>
    )
}

export default TypeText