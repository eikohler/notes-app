import {useEffect, useState, useRef} from 'react';

const TrashCan = (props:any) => {

    const {showTrash, scaleDiff, updateTrashCoords, deleteNote, mousePosition} = props;
    const [noteInTrash, setNoteInTrash] = useState(false);
    const noteInTrashRef = useRef<any>();
    noteInTrashRef.current = noteInTrash;
    
    const trashRef = useRef<any>();

    const [xPos, setXPos] = useState<any>(null);

    useEffect(() => {        
        const newCoords = document.getElementById('trash-can')!.getBoundingClientRect();
        const x = newCoords.x + (newCoords.width / 2);
        const y = newCoords.y + (newCoords.height / 2);
        setXPos(x);
        updateTrashCoords({ x, y });
    }, []);

    useEffect(() => {        
        noteInTrashRef.current = noteInTrash;
        console.log(noteInTrashRef.current);
    }, [noteInTrash]);

    // Mobile Event Listener
    useEffect(() => {
        if(window.innerWidth <= 767 && showTrash){
            const bounds = trashRef.current.getBoundingClientRect();
            const x = mousePosition.x;
            const y = mousePosition.y;                        
            if((x >= bounds.left && x <= bounds.right) && (y >= bounds.top && y <= bounds.bottom)){
                setNoteInTrash(true);
                document.addEventListener("touchend", ()=>{                
                    if(noteInTrashRef.current){deleteNote();}
                }, { once: true });
            }else{
                setNoteInTrash(false);
            }
        }
    }, [mousePosition]);

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
        className={`
            ${showTrash ? 'active' : ''} 
            ${window.innerWidth > 767 ? scaleDiff <= 0.7 ? 'inner-active' : '' 
            : noteInTrash ? 'inner-active' : ''}
            ${xPos <= mousePosition.x && showTrash ? 'flip' : ''}
        `}>
            <section ref={trashRef} id="trash-can" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img id="tc-1" src={require(`../../images/trashcan_1.png`)} alt="Trash Can" />            
                <img id="tc-2" src={require(`../../images/trashcan_2.png`)} alt="Trash Can" />            
            </section>
        </div>
    )
}

export default TrashCan