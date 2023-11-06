const TrashCan = (props:any) => {

    const {showTrash} = props;

    return (
        <div id="delete-note-container" className={`${showTrash ? 'active' : ''}`}>
            <section>
                <img id="tc-1" src={require(`../../images/trashcan_1.png`)} alt="Trash Can" />            
                <img id="tc-2" src={require(`../../images/trashcan_2.png`)} alt="Trash Can" />            
            </section>
        </div>
    )
}

export default TrashCan