import parse from 'html-react-parser';
import {changeLightness} from '../../helper/helperFunctions';
import { useEffect, useState } from 'react';

const FloatingNote = (props: any) => {

    const {note, isDragging, mousePosition, scaleDiff, width} = props;        
    const [flyBGColor, setFlyBGColor] = useState('');

    useEffect(() => {
        if(note){
            if(note.colors.fgColor === "#000000"){
                setFlyBGColor(changeLightness(50, note.colors.bgColor));
            }else{
                setFlyBGColor(changeLightness(20, note.colors.bgColor));
            }
        }
    }, [note]);

    return (
        <>
            {note && (
                <div className={
                `note-wrapper drag-note 
                ${isDragging ? 'move' : ''}
                ${window.innerWidth > 767 ? mousePosition.x > width ? 'fly' : '' : ''}`
                }
                style={{
                    backgroundColor: window.innerWidth > 767 ? mousePosition.x > width ? flyBGColor : note.colors.bgColor
                    : note.colors.bgColor,                    
                    color: note.colors.fgColor,

                    width: window.innerWidth > 767 ? mousePosition.x > width ? "150px" : (width-50)+"px"
                    : isDragging ? "100px" : (width-50)+"px",

                    left: window.innerWidth > 767 ? mousePosition.x > width ? mousePosition.x : '0px' 
                    : isDragging ? mousePosition.x : '0px',

                    top: isDragging ? mousePosition.y : '0px',

                    transform: window.innerWidth > 767 
                    ? mousePosition.x > width ? `scale(${scaleDiff}) translate(-50%, -50%)` : 'translate(0px, -50%)'
                    : 'translate(-90%, -50%)'
                }}>
                    <p className="title">{note.title}</p>
                    <div className="text-content">{parse(note.text)}</div>
                </div>
            )}
        </>
    )
}

export default FloatingNote;