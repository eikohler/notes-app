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

  // Update state variables functions
  const updateList = (data:any) => {
    if(data !== null){      
      const sameTitles = noteList.filter((note:any) => note.title === data.title);      
      const index = noteList.findIndex((note:any) => note.id === noteID);
      
      if(sameTitles.length !== 0){
        const i = sameTitles.findIndex((note:any) => note.id === noteID);
        if(i <= -1){
          const numArr = [0];
          for (let i = 0; i < sameTitles.length; i++) numArr[i] = i+1;          
          const titleNumbers = sameTitles.map((note:any) => {return note.number});
          const remainingNumbers = numArr.filter((x:any) => !titleNumbers.includes(x));          
          data.number = remainingNumbers.length !== 0 ? remainingNumbers[0] : sameTitles.length+1;          
        }else{
          data.number = sameTitles[i].number;
        }
      }

      if(index > -1){
        setNoteList(noteList.map((note:any) => {
          if (note.id === noteID) {
            return { ...note, title: data.title, content: data.content, number: data.number };
          } else {        
            return note;
          }
        }));
      }else{
        setNoteList([...noteList, data]);
      }
    }else{
      setNoteList(noteList.filter((note:any) => note.id !== noteID));
    }
  };
  const deleteNote = (id:any) => {    
    setNoteList(noteList.filter((note:any) => note.id !== id));
    if(id === noteID) newNote();
  }
  const loadNote = (id:any) => {
    const i = noteList.findIndex((note:any) => note.id === id);
    setNoteID(id);
    setContent(noteList[i].content);
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
    // console.log(noteList);
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
          <button onClick={newNote}>New Note</button>
          <Notelist 
            noteList={noteList} 
            loadNote={loadNote}
            deleteNote={deleteNote}
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
            updateList={updateList}
          />
        </div>
      </Section>
    </Container>
  );
}

export default Main;