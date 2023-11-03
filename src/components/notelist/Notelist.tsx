import parse from 'html-react-parser';
import { useState } from 'react';

const Notelist = (props:any) => {

    const {noteList, loadNote, deleteNote} = props;
    const [showIndex, setShowIndex] = useState(-1);

    return (
        <>
            {noteList.map((note:any, i:any) => {
                const defaultBGColor = note.colors.fgColor == '#000000' ? '#adaead' : '#2a2b2a';
                return(
                    <div onClick={() => loadNote(note.id)}                    
                    key={"wrapper-"+note.id} className="note-wrapper"
                    onMouseEnter={() => setShowIndex(i)}
                    onMouseLeave={() => setShowIndex(-1)}
                    style={{
                        backgroundColor: showIndex === i ? note.colors.bgColor : defaultBGColor,
                        color: note.colors.fgColor
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