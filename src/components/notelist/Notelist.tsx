const Notelist = (props:any) => {

    const {noteList, loadNote, deleteNote} = props;

    return (
        <>
            {noteList.map((note:any) => {
                return(
                    <div key={"wrapper-"+note.id}>                   
                        <p key={"title-"+note.id} onClick={() => loadNote(note.id)}>
                            {note.title}{note.number !== 1 && " "+note.number}
                        </p>
                        <button key={"remove-"+note.id} onClick={()=> deleteNote(note.id)}>Delete</button>
                    </div>
                )
            })}
        </>
    )
}

export default Notelist;