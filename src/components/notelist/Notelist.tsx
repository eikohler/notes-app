// import { useEffect } from "react";

const Notelist = (props:any) => {

    const {noteList, updateID, updateContent} = props;

    return (
        <>
            {noteList.map((note:any) => {
                console.log(noteList);
                return(
                    <div 
                        key={"wrapper-"+note.id} 
                        onClick={() => {
                            const i = noteList.findIndex((item:any) => item.id === note.id);
                            updateContent(noteList[i].content);
                            updateID(note.id);
                        }}>
                        <p key={"title-"+note.id}>{note.title}</p>
                    </div>
                )
            })}
        </>
    )
}

export default Notelist;