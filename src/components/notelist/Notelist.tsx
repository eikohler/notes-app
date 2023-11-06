import parse from 'html-react-parser';
import { useState, useEffect } from 'react';
import useMousePosition from '../../hooks/UseMousePosition';

const Notelist = (props:any) => {

    const {noteID, noteList, loadNote, deleteNote, newOrderList} = props;    
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [dragIndex, setDragIndex] = useState(-1);
    const [dragOverIndex, setDragOverIndex] = useState(-1);    

    const mousePosition = useMousePosition();

    useEffect(() => {
        if(dragOverIndex !== -1){
            const newList = [...noteList];
            const draggedItem = newList[dragIndex];
            newList.splice(dragIndex, 1);
            newList.splice(dragOverIndex, 0, draggedItem);
            newOrderList(newList);
            setDragIndex(dragOverIndex);
        }        
    }, [dragOverIndex]);

    useEffect(() => {
        console.log(dragIndex);
    }, [dragIndex]);

    return (
        <>
            {noteList.map((note:any, i:any) => {
                const hover = hoverIndex === i;
                const hovering = hoverIndex !== -1;
                const active = noteID === note.id;
                const isDragItem = dragIndex === i;
                const isDragging = dragIndex !== -1;
                return(
                    <div onClick={() => loadNote(note.id)}
                    key={"wrapper-"+note.id} 
                    className={`note-wrapper 
                        ${(active && (!hovering || isDragging)) ? 'active' : ''} 
                        ${isDragItem ? 'dragging' : ''}
                        ${isDragging ? 'no-hover' : ''}
                    `}
                    onDragStart={(e) => {e.preventDefault(); setDragIndex(i); loadNote(note.id);}}
                    draggable                
                    onMouseEnter={() => {
                        if(dragIndex !== -1){
                            setDragOverIndex(i);
                            setHoverIndex(-1);
                        }else{
                            setHoverIndex(i);
                        }
                    }}
                    onMouseUp={()=>{setDragIndex(-1); setDragOverIndex(-1);}}
                    onMouseLeave={() => setHoverIndex(-1)}
                    style={{
                        backgroundColor: hover || active
                        ? note.colors.bgColor 
                        : '#2a2b2a',

                        color: hover || active 
                        ? note.colors.fgColor 
                        : '#fff'
                    }}>
                        <p key={"title-"+note.id} className="title">{note.title}</p>
                        <div className="text-content" key={"text"+note.id}>{parse(note.text)}</div>
                    </div>
                )
            })}
        </>
    )
}

export default Notelist;