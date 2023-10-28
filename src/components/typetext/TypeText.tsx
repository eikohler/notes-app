import { useEffect, useState, useRef } from "react";

const TypeText = () => {

    // For editor placeholder text     
    const textArr = [
        'masterpiece', 
        'story', 
        'art', 
        'song', 
        'adventure', 
        'plan'
    ];
    const [index, setIndex] = useState(0);
    const [chars, setChars] = useState(textArr[index].split(''));        
    const [animClass, setAnimClass] = useState('');
    const [initialWait, setInitialWait] = useState(800);

    useEffect(() => {
        setChars(textArr[index].split(''));
        setInitialWait(0);
        setAnimClass('');
        
        const delay = ((chars.length)*0.2)*1000;

        setTimeout(function(){
            setAnimClass('anim-in');
            setTimeout(function(){
                setAnimClass('anim-out');
                setTimeout(function(){
                    setIndex(index + 1 < textArr.length ? index + 1 : 0);                    
                }, delay);
            }, delay);
        }, initialWait);        
        
    }, [index]);

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