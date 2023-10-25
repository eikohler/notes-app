import { useState } from 'react';
import { Container, Section, Bar, Resizer } from '@column-resizer/react';
import Notepad from '../notepad/Notepad';

function Main() {
  const [ barActive, setBarActive ] = useState(false);
  const [ barHidden, setBarHidden ] = useState(false);

  const [ noteList, setNoteList ] = useState(JSON.parse(localStorage.getItem("noteList")!) || []);
  const [ noteID, setNoteID ] = useState(noteList.length > 0 ? noteList[noteList.length-1].id + 1 : 0);
  const [ content, setContent ] = useState('');

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
          {noteList.map((note:any) => {
            return(
              <div key={"wrapper-"+note.id} onClick={() => {
                  const i = noteList.findIndex((item:any) => item.id === note.id);
                  setContent(noteList[i].content);
                  setNoteID(note.id);
                }}>
                <p key={"title-"+note.id}>{note.title}</p>
              </div>
            )
          })}
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
          <Notepad noteList={noteList} noteID={noteID} content={content} />
        </div>
      </Section>
    </Container>
  );
}

export default Main;