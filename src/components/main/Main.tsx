import { useState, useEffect } from 'react';
import { Container, Section, Bar, Resizer } from '@column-resizer/react';
import Notepad from '../notepad/Notepad';
import Notelist from '../notelist/Notelist';
import {getNextID} from '../../helper/helperFunctions';
import useMousePosition from '../../hooks/UseMousePosition';

function Main() {
  const [ barActive, setBarActive ] = useState(false);
  const [ barHidden, setBarHidden ] = useState(false);  

  const [ noteList, setNoteList ] = useState(JSON.parse(localStorage.getItem("noteList")!) || []);
  const [ noteID, setNoteID ] = useState(noteList.length > 0 ? getNextID(noteList) : 0);
  const [ content, setContent ] = useState("");
  const [ noteColors, setNoteColors ] = useState({});
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const [colWidth, setColWidth] = useState(300);

  const mousePosition = useMousePosition();

  // Update state variables functions
  const updateList = (data:any) => {
    if(data !== null){
      // Updates pre-existing note
      if(activeIndex > -1){
        setNoteList(noteList.map((note:any) => {
          if (note.id === noteID) {
            return { ...note, 
              title: data.title, 
              content: data.content, 
              colors: data.colors,
              text: data.text
            };
          } else {        
            return note;
          }
        }));
        // Adds new note to the note list
      }else{
        setNoteList([...noteList, data]);
      }
      // Removes the note for having no characters
    }else{
      setNoteList(noteList.filter((note:any) => note.id !== noteID));
    }
  };

  const updateNoteColors = (colors:any) =>{
    if(activeIndex > -1){
      setNoteList(noteList.map((note:any) => {
        if (note.id === noteID) {
          return { ...note, colors: colors };
        } else {        
          return note;
        }
      }));
    }
  }
  const deleteNote = (id:any) => {    
    setNoteList(noteList.filter((note:any) => note.id !== id));
    if(id === noteID) newNote();
  }
  const loadNote = (id:any) => {
    const i = noteList.findIndex((note:any) => note.id === id);
    setNoteID(id);
    setContent(noteList[i].content);
    setNoteColors(noteList[i].colors);
  };
  const newNote = () =>{
    const id = noteList.length > 0 ? getNextID(noteList) : 0;    
    setNoteID(id);
    setContent("");    
  };

  const newOrderList = (data:any) =>{
    setNoteList([...data]);
  }

  const updateDragState = (data:any) => setIsDragging(data);
  
  const collapseCol = (resizer: Resizer) : void => {
    setColWidth(resizer.getSectionSize(0));
    if (resizer.getSectionSize(0) < 100) {
      resizer.resizeSection(0, { toSize: 0 });
      setBarHidden(true);
    } else if (resizer.getSectionSize(0) < 200) {
      resizer.resizeSection(0, { toSize: 200 });
      setBarHidden(false);
    }
  }

  useEffect(() => {
    // Save note list to local storage
    const exportList = JSON.stringify(noteList);
    localStorage.setItem("noteList", exportList);
  }, [noteList]);


  // Set the index of the active note in the list
  useEffect(() => {        
    setActiveIndex(noteList.findIndex((note:any) => note.id === noteID));
  }, [noteID, noteList]);  

  useEffect(() => {        
    console.log(colWidth);
  }, [colWidth]);  

  return (
    <>
      {activeIndex !== -1 && (
          <div className={`note-wrapper drag-note ${isDragging ? 'move' : ''}`}
          style={{
              backgroundColor: noteList[activeIndex].colors.bgColor,
              color: noteList[activeIndex].colors.fgColor,
              width: (colWidth-50)+"px",
              // left: mousePosition.x!,
              top: isDragging ? mousePosition.y! : '0px'
          }}>
              <p className="title">{noteList[activeIndex].title}</p>
          </div>
      )}
      <Container 
        className={`columns-container ${barActive ? "active" : ""}`}
        beforeApplyResizer={collapseCol}
        onActivate={() : void => setBarActive(true)}
        afterResizing={() : void => setBarActive(false)}
      >
        <Section id="noteList" className="column" defaultSize={300}>
          <div className="inner">          
            <Notelist 
              noteID={noteID}
              noteList={noteList} 
              loadNote={loadNote}
              deleteNote={deleteNote}
              newOrderList={newOrderList}
              updateDragState={updateDragState}
            />          
          </div>
        </Section>
          <Bar 
            id="resizeBar"
            size={5} 
            className={`resize-bar ${barHidden && !barActive ? "hidden" : ""}`}
            expandInteractiveArea={{right: 5, left: 5}} 
          />
        <Section id="notePad" className="column" minSize={300}>
          <div className="inner">
            <Notepad 
              noteID={noteID}
              content={content}
              noteColors={noteColors}
              updateList={updateList}
              updateNoteColors={updateNoteColors}
              newNote={newNote}
            />
          </div>
        </Section>
      </Container>
    </>
  );
}

export default Main;