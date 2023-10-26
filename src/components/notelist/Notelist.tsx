const Notelist = (props:any) => {

    const {noteList, loadNote} = props;

    return (
        <>
            {noteList.map((note:any) => {
                return(
                    <div 
                        key={"wrapper-"+note.id} 
                        onClick={() => loadNote(note.id)}>
                        <p key={"title-"+note.id}>{note.title}</p>
                    </div>
                )
            })}
        </>
    )
}

export default Notelist;