import parse from 'html-react-parser';
import React, { useState, useRef } from 'react';

const Notelist = (props:any) => {

    const {noteList, loadNote, deleteNote, newOrderList} = props;
    const dragItem = useRef<any>();
    const dragOverItem = useRef<any>();

    const dragStart = (e:any, position:any) => {
        dragItem.current = position;
    };
    
    const dragEnter = (e:any, position:any) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    const drop = (e:any) => {
        const copyListItems = [...noteList];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        newOrderList(copyListItems);
    };

    return (
        <>
            {noteList.map((note:any, index:any) => {
                return(
                    <div onClick={() => loadNote(note.id)}                    
                    key={"wrapper-"+note.id} 
                    className="note-wrapper"
                    onDragStart={(e) => dragStart(e, index)}
                    onDragEnter={(e) => dragEnter(e, index)}
                    onDragEnd={drop}
                    draggable
                    style={{
                        backgroundColor: note.colors.bgColor,
                        color: note.colors.fgColor                    
                    }}>
                        <p key={"title-"+note.id} className="title">{note.title}</p>
                        <div key={"text"+note.id}>{parse(note.text)}</div>                        
                        {/* <button key={"remove-"+note.id} onClick={()=> deleteNote(note.id)}>Delete</button> */}
                    </div>
                )
            })}
            <div className="note-wrapper empty"></div>        
        </>
    )
}

export default Notelist;