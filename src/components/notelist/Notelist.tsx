import parse from 'html-react-parser';
import { useState, useEffect, useRef } from 'react';

const Notelist = (props:any) => {

    const {noteID, noteList, loadNote, newOrderList, updateDragState, mousePosition} = props;    
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [dragIndex, setDragIndex] = useState(-1);
    const [dragOverIndex, setDragOverIndex] = useState(-1);   

    const notesRef = useRef<any>([]);

    useEffect(() => {
        notesRef.current = notesRef.current.slice(0, noteList.length);
    }, [noteList]);

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
        updateDragState(dragIndex !== -1);
        if(dragIndex !== -1){
            document.addEventListener("mouseup", ()=>{
                setDragIndex(-1); 
                setDragOverIndex(-1);
            }, { once: true });
        }
    }, [dragIndex]);

    useEffect(() => {
        if(window.innerWidth <= 767 && dragIndex !== -1){
            const x = mousePosition.x,
            y = mousePosition.y;            
            const i = notesRef.current.findIndex((note:any)=>{
                const bounds = note.getBoundingClientRect();
                return (x >= bounds.left && x <= bounds.right) && (y >= bounds.top && y <= bounds.bottom);
            });   
            if(i !== -1){
                setDragOverIndex(i);
            }
        }
    }, [mousePosition]);

    return (
        <>
            {noteList.map((note:any, i:any) => {
                const hover = hoverIndex === i;
                const hovering = hoverIndex !== -1;
                const active = noteID === note.id;
                const isDragging = dragIndex !== -1;

                return(
                    <div ref={el => notesRef.current[i] = el}                     
                    key={"wrapper-"+note.id} 
                    
                    className={`note-wrapper 
                        ${window.innerWidth > 767 ? (active && (!hovering || isDragging)) ? 'active' : ''
                        : active ? 'active' : ''}
                        ${isDragging ? 'dragging' : ''}
                    `}

                    // Mobile Touch Drag Settings
                    onTouchStart = {(e)=>{loadNote(note.id);}}
                    onTouchMove={(e)=> {
                        if(dragIndex === -1){
                            setDragIndex(i);
                        }
                    }}
                    onTouchEnd={(e)=> {setDragIndex(-1); setDragOverIndex(-1);}}

                    // Desktop Click Drag Settings
                    onClick={() => loadNote(note.id)}
                    onDragStart={(e) => {e.preventDefault(); setDragIndex(i); loadNote(note.id);}}
                    draggable                
                    onMouseEnter={(e) => {
                        if(dragIndex !== -1){
                            setDragOverIndex(i);
                            setHoverIndex(-1);
                        }else{
                            setHoverIndex(i);
                        }
                    }}
                    onMouseLeave={() => setHoverIndex(-1)}

                    // Styling
                    style={{
                        backgroundColor: window.innerWidth > 767 ? hover || active ? note.colors.bgColor : '#2a2b2a'
                        : active ? note.colors.bgColor : '#2a2b2a',

                        color: window.innerWidth > 767 ? hover || active ? note.colors.fgColor : '#fff'
                        : active ? note.colors.fgColor : '#fff',
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