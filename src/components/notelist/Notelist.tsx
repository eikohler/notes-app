import parse from 'html-react-parser';

const Notelist = (props:any) => {

    const {noteList, loadNote, deleteNote} = props;

    return (
        <>
            {noteList.map((note:any, index:any) => {
                return(
                    <div onClick={() => loadNote(note.id)}                    
                    key={"wrapper-"+note.id} className="note-wrapper"
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