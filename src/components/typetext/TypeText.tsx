import { useEffect, useState, useRef } from "react";

const TypeText = () => {

    // For editor placeholder text     
    const textArr = [
        'masterpiece', 
        'story', 
        'art', 
        'song', 
        'plan',
        'adventure'
    ];
    const buffer = 2;
    const [index, setIndex] = useState(0);
    const [initialWait, setInitialWait] = useState(800);
    const [animClass, setAnimClass] = useState('');
    const [chars, setChars] = useState(textArr[index].split(''));

    useEffect(() => {                   
        const delay = ((0.1*chars.length)+buffer)*1000;

        console.log(delay);

        const timer = setTimeout(function(){
            setAnimClass('anim-in');
            setTimeout(function(){
                setAnimClass('anim-out');
                setTimeout(function(){
                    const newIndex = index + 1 < textArr.length ? index + 1 : 0;
                    setIndex(newIndex);
                    setChars(textArr[newIndex].split(''));
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