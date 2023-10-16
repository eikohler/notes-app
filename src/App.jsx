import './App.scss';
import { Container, Section, Bar } from '@column-resizer/react';

function App() {

  return (
    <>
      <main>
        <Container className="notes-container">
          <Section className="notes-list" minSize={200} defaultSize={400} />
            <Bar size={6} className="resize-bar" />
          <Section className="note-pad" minSize={200} />
        </Container>
      </main>
    </>
  );
}

export default App;
