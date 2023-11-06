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

    return (
        <>
            {noteList.map((note:any, i:any) => {
                return(
                    <div onClick={() => loadNote(note.id)}
                    key={"wrapper-"+note.id} 
                    className={`note-wrapper 
                    ${noteID == note.id ? 'active' : ''}
                    ${dragIndex === i ? 'dragging' : ''}
                    ${dragIndex !== -1 ? 'no-hover' : ''}`}
                    onDragStart={(e) => {setDragIndex(i); loadNote(note.id); setHoverIndex(-1)}}
                    onDragEnter={(e) => setDragOverIndex(i)}
                    onDragEnd={(e)=>{setDragIndex(-1); setDragOverIndex(-1); }}
                    draggable
                    onMouseEnter={() => setHoverIndex(dragIndex == -1 ? i : -1)}
                    onMouseLeave={() => setHoverIndex(-1)}
                    style={{
                        backgroundColor: hoverIndex === i || noteID == note.id ? note.colors.bgColor : '#2a2b2a',                        
                        color: hoverIndex === i || noteID == note.id ? note.colors.fgColor : '#fff',
                    }}>
                        <p key={"title-"+note.id} className="title">{note.title}</p>
                        <div className="text-content" key={"text"+note.id}>{parse(note.text)}</div>                        
                        {/* <button key={"remove-"+note.id} onClick={()=> deleteNote(note.id)}>Delete</button> */}
                    </div>
                )
            })}
            <div className="note-wrapper empty"></div>        
        </>
    )
}

export default Notelist;