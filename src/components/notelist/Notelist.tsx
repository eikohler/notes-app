import parse from 'html-react-parser';
import { useState, useRef } from 'react';

const Notelist = (props:any) => {

    const {noteID, noteList, loadNote, deleteNote, newOrderList} = props;
    const [showIndex, setShowIndex] = useState(-1);

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
            {noteList.map((note:any, i:any) => {                
                return(
                    <div onClick={() => loadNote(note.id)}                    
                    key={"wrapper-"+note.id} className={`note-wrapper ${noteID == note.id && 'active'}`}
                    onDragStart={(e) => dragStart(e, i)}
                    onDragEnter={(e) => dragEnter(e, i)}
                    onDragEnd={drop}
                    draggable
                    onMouseEnter={() => setShowIndex(i)}
                    onMouseLeave={() => setShowIndex(-1)}
                    style={{
                        backgroundColor: showIndex === i || noteID == note.id ? note.colors.bgColor : '#2a2b2a',                        
                        color: showIndex === i || noteID == note.id ? note.colors.fgColor : '#fff',
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