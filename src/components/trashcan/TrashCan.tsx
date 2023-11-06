import {useState, useEffect} from 'react';

const TrashCan = (props:any) => {

    const {showTrash, scaleDiff, updateTrashCoords} = props;

    useEffect(() => {        
        const coords = document.getElementById('trash-can')!.getBoundingClientRect();
        const x = coords.x + (coords.width / 2);
        const y = coords.y + (coords.height / 2);
        updateTrashCoords({ x, y });
    }, []);

    return (
        <div id="delete-note-container" 
        className={`${showTrash ? 'active' : ''} ${scaleDiff <= 0.5 ? 'inner-active' : ''}`}>            
            <section id="trash-can">
                <img id="tc-1" src={require(`../../images/trashcan_1.png`)} alt="Trash Can" />            
                <img id="tc-2" src={require(`../../images/trashcan_2.png`)} alt="Trash Can" />            
            </section>
        </div>
    )
}

export default TrashCan