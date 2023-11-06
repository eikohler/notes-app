import useMousePosition from '../../hooks/UseMousePosition';

const FloatingNote = (props: any) => {

    const {note, isDragging, colWidth} = props;
    const mousePosition = useMousePosition();

    return (
        <>
            {note && (
                <div className={
                `note-wrapper drag-note 
                ${isDragging ? 'move' : ''}
                ${mousePosition.x! > colWidth ? 'fly' : ''}`
                }
                style={{
                    backgroundColor: note.colors.bgColor,
                    color: note.colors.fgColor,
                    width: (colWidth-50)+"px",
                    left: mousePosition.x! > colWidth ? mousePosition.x! : '0px',
                    top: isDragging ? mousePosition.y! : '0px'
                }}>
                    <p className="title">{note.title}</p>
                </div>
            )}
        </>
    )
}

export default FloatingNote;