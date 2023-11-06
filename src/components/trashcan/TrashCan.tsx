import {useEffect, useState, useRef} from 'react';

const TrashCan = (props:any) => {

    const {showTrash, scaleDiff, updateTrashCoords, deleteNote} = props;
    const [noteInTrash, setNoteInTrash] = useState(false);
    const noteInTrashRef = useRef<any>();
    noteInTrashRef.current = noteInTrash;

    useEffect(() => {        
        const coords = document.getElementById('trash-can')!.getBoundingClientRect();
        const x = coords.x + (coords.width / 2);
        const y = coords.y + (coords.height / 2);
        updateTrashCoords({ x, y });
    }, []);

    useEffect(() => {        
        noteInTrashRef.current = noteInTrash;
    }, [noteInTrash]);

    const handleMouseEnter = () => {
        if(showTrash){
            setNoteInTrash(true);
            document.addEventListener("mouseup", ()=>{                
                if(noteInTrashRef.current){deleteNote();}
            }, { once: true });
        }
    }

    const handleMouseLeave = () => { setNoteInTrash(false); }

    return (
        <div id="delete-note-container" 
        className={`${showTrash ? 'active' : ''} ${scaleDiff <= 0.5 ? 'inner-active' : ''}`}>            
            <section id="trash-can" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img id="tc-1" src={require(`../../images/trashcan_1.png`)} alt="Trash Can" />            
                <img id="tc-2" src={require(`../../images/trashcan_2.png`)} alt="Trash Can" />            
            </section>
        </div>
    )
}

export default TrashCan