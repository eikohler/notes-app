import { useState } from 'react';
import { Container, Section, Bar, Resizer } from '@column-resizer/react';

function Main() {
  const [ barActive, setBarActive ] = useState(false);

  const collapseCol = (resizer: Resizer) : void => {
    if (resizer.getSectionSize(0) < 100) {
      resizer.resizeSection(0, { toSize: 0 });
    } else if (resizer.getSectionSize(0) < 200) {
      resizer.resizeSection(0, { toSize: 200 });
    }
  }

  return (
    <Container 
      className={`notes-container ${barActive ? "active" : ""}`} 
      beforeApplyResizer={collapseCol}
      onActivate={() : void => setBarActive(true)}
      afterResizing={() : void => setBarActive(false)}
    >
      <Section className="notes-list" defaultSize={300} />
        <Bar size={5} className="resize-bar" expandInteractiveArea={{right: 5, left: 5}} />
      <Section className="note-pad" minSize={300} />
    </Container>
  );
}

export default Main;