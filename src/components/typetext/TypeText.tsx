import { useEffect, useState } from "react";

const TypeText = () => {

    // For editor placeholder text     
    const startWordChars = "Your ".split('');
    const startAnimTime = (startWordChars.length*0.1)*1000;
    const textArr = [         
        'story', 
        'plan',
        'journal', 
        'checklist', 
        'vision',
        'adventure'
    ];
    const [index, setIndex] = useState(0);
    const [animClass, setAnimClass] = useState('');
    const [startAnimClass, setStartAnimClass] = useState('');
    const [chars, setChars] = useState(textArr[index].split(''));

    useEffect(() => {                   
        const delay = (0.1*chars.length)*1000; 
        let initialWait = 0;

        if(index === 0){
            initialWait = startAnimTime+1000;
            setTimeout(function(){
                setStartAnimClass('anim-in');
            }, 1000);
        }

        const timer = setTimeout(function(){
            setAnimClass('anim-in');
            setTimeout(function(){
                setAnimClass('anim-out');
                setTimeout(function(){
                    const newIndex = index + 1 < textArr.length ? index + 1 : 0;                    
                    setIndex(newIndex);
                    setAnimClass('');

                    if(newIndex === 0){
                        setStartAnimClass('anim-out');
                        setTimeout(function(){                            
                            setChars(textArr[newIndex].split(''));
                        }, startAnimTime);
                    }else{
                        setChars(textArr[newIndex].split(''));                                          
                    }
                }, delay+1000);
            }, delay+2000);
        }, initialWait);  
        
        return () => {            
            clearTimeout(timer);
        };
        
    }, [chars]);


    return (
        <div className={`placeHolderAnim`}>
            <h1><div className={`text ${startAnimClass}`}>{            
                startWordChars.map((char:any, i:any)=>{return(
                    <span style={{
                        animationDelay: startAnimClass == ('' || 'anim-in')
                        ? (i*0.1)+'s' 
                        : (((startWordChars.length-1)-i)*0.1)+'s'
                    }}
                    key={char+i}>{char}</span>
                )})
            }</div>
            <div className={`text ${animClass}`}>{            
                chars.map((char:any, i:any)=>{return(
                    <span style={{
                        animationDelay: animClass == ('' || 'anim-in') 
                        ? (i*0.1)+'s' 
                        : (((chars.length-1)-i)*0.1)+'s'
                    }} 
                    key={char+i}>{char}</span>
                )})
            }</div></h1>
        </div>
    )
}

export default TypeText