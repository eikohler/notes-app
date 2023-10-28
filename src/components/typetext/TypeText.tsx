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
    const buffer = 1;

    useEffect(() => {        
        const delay = ((0.1*chars.length)+buffer)*1000;

        // Current Problem: Plays first title twice

        console.log(delay);

        const timer = setTimeout(function(){
            setAnimClass('anim-in');
            setTimeout(function(){
                setAnimClass('anim-out');
                setTimeout(function(){
                    setIndex(index + 1 < textArr.length ? index + 1 : 0);
                    setChars(textArr[index].split(''));
                    setInitialWait(0);
                    setAnimClass('');
                }, delay);
            }, delay);
        }, initialWait);  
        
        return () => {            
            clearTimeout(timer);
        };
        
    }, [chars]);

    return (
        <div id="ph-text" className={animClass}>{            
            chars.map((char:any, i:any)=>{return(
                <span style={{
                    animationDelay: animClass == ('' || 'anim-in') ? (i*0.1)+'s' : (((chars.length-1)-i)*0.1)+'s'
                }} 
                key={char+i}>{char}</span>
            )})
        }</div>
    )
}

export default TypeText