import { Container, Section, Bar, Resizer } from '@column-resizer/react';

function beforeApplyResizer(resizer: Resizer): void {
  if (resizer.getSectionSize(0) < 100) {
    resizer.resizeSection(0, { toSize: 0 });
  } else if (resizer.getSectionSize(0) < 200) {
    resizer.resizeSection(0, { toSize: 200 });
  }
}

function Main() {
  return (
    <Container className="notes-container" beforeApplyResizer={beforeApplyResizer}>
      <Section className="notes-list" defaultSize={300} />
        <Bar size={10} className="resize-bar" />
      <Section className="note-pad" minSize={300} />
    </Container>
  );
}

export default Main;