import parse from 'html-react-parser';
import useMousePosition from '../../hooks/UseMousePosition';
import {useEffect, useState} from 'react';

const FloatingNote = (props: any) => {

    const {note, isDragging, colWidth} = props;
    const [width, setWidth] = useState(colWidth);
    const mousePosition = useMousePosition();

    useEffect(() => {
        setWidth(colWidth >= 200 ? colWidth : 200);
    }, [colWidth]);

    return (
        <>
            {note && (
                <div className={
                `note-wrapper drag-note 
                ${isDragging ? 'move' : ''}
                ${mousePosition.x! > width ? 'fly' : ''}`
                }
                style={{
                    backgroundColor: note.colors.bgColor,
                    color: note.colors.fgColor,
                    width: mousePosition.x! < width ? (width-50)+"px" : "150px",
                    left: mousePosition.x! > width ? mousePosition.x! : '0px',
                    top: isDragging ? mousePosition.y! : '0px'
                }}>
                    <p className="title">{note.title}</p>
                    <div className="text-content">{parse(note.text)}</div>
                </div>
            )}
        </>
    )
}

export default FloatingNote;