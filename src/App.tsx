import './App.scss';
import Main from './components/main/Main';
import { useEffect } from 'react';

const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

function App() {

  useEffect(() => {
    const body = document.querySelector('body');
    const main = document.querySelector('main');
    disableBodyScroll(body);
    enableBodyScroll(main);
  }, []);

  return (    
    <Main />    
  );
}

export default App;
