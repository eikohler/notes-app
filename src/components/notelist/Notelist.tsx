import parse from 'html-react-parser';
import { useState } from 'react';

const Notelist = (props:any) => {

    const {noteID, noteList, loadNote, deleteNote} = props;
    const [showIndex, setShowIndex] = useState(-1);

    return (
        <>
            {noteList.map((note:any, i:any) => {                
                return(
                    <div onClick={() => loadNote(note.id)}                    
                    key={"wrapper-"+note.id} className={`note-wrapper ${noteID == note.id && 'active'}`}
                    onMouseEnter={() => setShowIndex(i)}
                    onMouseLeave={() => setShowIndex(-1)}
                    style={{
                        backgroundColor: showIndex === i || noteID == note.id ? note.colors.bgColor : '#2a2b2a',                        
                        color: showIndex === i || noteID == note.id ? note.colors.fgColor : '#fff',
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