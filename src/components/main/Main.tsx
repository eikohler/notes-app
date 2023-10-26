import { useState, useEffect } from 'react';
import { Container, Section, Bar, Resizer } from '@column-resizer/react';
import Notepad from '../notepad/Notepad';
import Notelist from '../notelist/Notelist';

function Main() {
  const [ barActive, setBarActive ] = useState(false);
  const [ barHidden, setBarHidden ] = useState(false);  

  const [ noteList, setNoteList ] = useState(JSON.parse(localStorage.getItem("noteList")!) || []);
  const [ noteID, setNoteID ] = useState(noteList.length > 0 ? noteList[noteList.length-1].id + 1 : 0);
  const [ content, setContent ] = useState('');

  // Update state variables functions
  // const addToList = (data:any) => {setNoteList([...noteList, data]);};
  // const removeFromList = () => {setNoteList(noteList.filter((note:any) => note.id !== noteID));};
  const updateList = (data:any) => {
    data.id = noteID;
    setContent(data.content);
    const index = noteList.findIndex((note:any) => note.id === noteID);
    if(index > -1){  
      setNoteList(noteList.map((note:any) => {
        if (note.id === noteID) {
          return { ...note, title: data.title, content: data.content };
        } else {        
          return note;
        }
      }));
    }else{
      setNoteList([...noteList, data]);
    }
  };
  const updateID = (data:any) => setNoteID(data);
  const updateContent = (data:any) => setContent(data);

  function saveList(){
    // Save note list to local storage
    const exportList = JSON.stringify(noteList);
    localStorage.setItem("noteList", exportList);
  }

  useEffect(() => {
    console.log(noteList);
  }, [noteList]);

  const collapseCol = (resizer: Resizer) : void => {
    if (resizer.getSectionSize(0) < 100) {
      resizer.resizeSection(0, { toSize: 0 });
      setBarHidden(true);
    } else if (resizer.getSectionSize(0) < 200) {
      resizer.resizeSection(0, { toSize: 200 });
      setBarHidden(false);
    }
  }

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
            updateID={updateID}
            updateContent={updateContent}
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
            content={content}
            updateList={updateList}
          />
        </div>
      </Section>
    </Container>
  );
}

export default Main;