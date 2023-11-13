import React from 'react';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {

    document.ontouchmove = (e) =>{
      setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const updateMousePosition = (ev:any) => {
      if(window.innerWidth > 767){
        setMousePosition({ x: ev.clientX, y: ev.clientY });
      }
    };    
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;