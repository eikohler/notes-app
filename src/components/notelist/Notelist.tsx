const Notelist = (props:any) => {

    const {noteList, loadNote, deleteNote} = props;

    return (
        <>
            {noteList.map((note:any) => {
                return(<>
                    <div onClick={() => loadNote(note.id)} 
                    key={"wrapper-"+note.id} className="note-wrapper"
                    style={{backgroundColor: note.color}}>                   
                        <p key={"title-"+note.id} className="title">
                            {note.title}
                        </p>
                        {/* <button key={"remove-"+note.id} onClick={()=> deleteNote(note.id)}>Delete</button> */}
                    </div>
                </>)
            })}
            <div className="note-wrapper empty"></div>        
        </>
    )
}

export default Notelist;