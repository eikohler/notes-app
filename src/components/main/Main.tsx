import { useState, useEffect } from 'react';
import { Container, Section, Bar, Resizer } from '@column-resizer/react';
import Notepad from '../notepad/Notepad';
import Notelist from '../notelist/Notelist';

function Main() {
  const [ barActive, setBarActive ] = useState(false);
  const [ barHidden, setBarHidden ] = useState(false);  

  const [ noteList, setNoteList ] = useState(JSON.parse(localStorage.getItem("noteList")!) || []);
  const [ noteID, setNoteID ] = useState(noteList.length > 0 ? noteList[noteList.length-1].id + 1 : 0);
  const [ content, setContent ] = useState("");
  const [ noteColors, setNoteColors ] = useState({});

  // Update state variables functions
  const updateList = (data:any) => {
    if(data !== null){      
      const index = noteList.findIndex((note:any) => note.id === noteID);

      // Updates pre-existing note
      if(index > -1){
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

  const newOrderList = (data:any) =>{
    setNoteList([...data]);
  }

  const updateNoteColors = (colors:any) =>{
    const index = noteList.findIndex((note:any) => note.id === noteID);
    if(index > -1){
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
    const id = noteList.length > 0 ? noteList[noteList.length-1].id + 1 : 0;
    setNoteID(id);
    setContent("");
  };
  
  const collapseCol = (resizer: Resizer) : void => {
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

  return (
    <Container 
      className={`columns-container ${barActive ? "active" : ""}`}
      beforeApplyResizer={collapseCol}
      onActivate={() : void => setBarActive(true)}
      afterResizing={() : void => setBarActive(false)}
    >
      <Section id="noteList" className="column" defaultSize={300}>
        <div className="inner">          
          <Notelist 
            noteList={noteList} 
            loadNote={loadNote}
            deleteNote={deleteNote}
            newOrderList={newOrderList}
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
  );
}

export default Main;