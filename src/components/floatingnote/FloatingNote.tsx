import parse from 'html-react-parser';
import useMousePosition from '../../hooks/UseMousePosition';
import {changeLightness, getDiff} from '../../helper/helperFunctions';

import { useEffect, useState } from 'react';

const FloatingNote = (props: any) => {

    const {note, isDragging, colWidth, trashCoords} = props;
    const [width, setWidth] = useState(colWidth >= 200 ? colWidth : 200);
    const [flyBGColor, setFlyBGColor] = useState('');
    const [scaleDiff, setScaleDiff] = useState(0);
    const mousePosition = useMousePosition();    

    useEffect(() => {
        setWidth(colWidth >= 200 ? colWidth : 200);
    }, [colWidth]);   

    useEffect(() => {
        if(mousePosition.x! > width && isDragging){
            const diff = ((getDiff(mousePosition.x, trashCoords.x) + getDiff(mousePosition.y, trashCoords.y))/2)/100;
            console.log(diff);
            setScaleDiff(diff);
        }else{
            setScaleDiff(0);
        }
    }, [mousePosition]);

    useEffect(() => {
        if(note){
            if(note.colors.fgColor === "#000000"){
                setFlyBGColor(changeLightness(80, note.colors.bgColor));
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
                ${mousePosition.x! > width ? 'fly' : ''}`
                }
                style={{
                    backgroundColor: mousePosition.x! > width ? flyBGColor : note.colors.bgColor,
                    color: note.colors.fgColor,
                    width: mousePosition.x! > width ? "150px" : (width-50)+"px",
                    left: mousePosition.x! > width ? mousePosition.x! : '0px',
                    top: isDragging ? mousePosition.y! : '0px',
                    transform: mousePosition.x! > width ?
                    `scale(${scaleDiff}) translate(-50%, -50%)` : 
                    'translate(0px, -50%)'
                }}>
                    <p className="title">{note.title}</p>
                    <div className="text-content">{parse(note.text)}</div>
                </div>
            )}
        </>
    )
}

export default FloatingNote;