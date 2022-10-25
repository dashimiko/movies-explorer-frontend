import {useState, useEffect} from 'react';

const getWindowWidth = () => {
  const {innerWidth: width, innerHeight: height} = window;
  return {width, height};
}

function useWindowWidth () {

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleWindowSize = () => {
      setWindowWidth(getWindowWidth());
    };

  let resizeTime;

  const resizeController = () => {
    if (!resizeTime) {
      resizeTime = setTimeout(() => {
        resizeTime = null;
        handleWindowSize();
      }, 1000)}
    };

  window.addEventListener('resize', resizeController);

  return () => window.removeEventListener('resize', handleWindowSize)
}, []);
  return windowWidth;
}


export default useWindowWidth;
