import { useState } from 'react';
import { Container, Section, Bar, Resizer } from '@column-resizer/react';
import Notepad from '../notepad/Notepad';

function Main() {
  const [ barActive, setBarActive ] = useState(false);
  const [ barHidden, setBarHidden ] = useState(false);

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
      <Section id="noteList" className="column" defaultSize={500}>
        <div className="inner">
          <h1>Notes</h1>          
        </div>
      </Section>
        <Bar 
          size={5} 
          className={`resize-bar ${barHidden && !barActive ? "hidden" : ""}`}
          expandInteractiveArea={{right: 5, left: 5}} 
        />
      <Section id="notePad" className="column" minSize={300}>
        <div className="inner">
          <h1>Write</h1>
          <Notepad />
        </div>
      </Section>
    </Container>
  );
}

export default Main;