import { useCallback, useEffect } from 'react';

const KeyboardControls = ({ setShowLiniaCantada, setShowQuinaMessage, drawNextNumber }) => {
  const handleKeyPress = useCallback((event) => {
    console.log('Tecla presionada:', event.key); // Para debug
    
    // Normalizar la tecla a minúsculas
    const key = event.key.toLowerCase();
    
    if (key === 'l') {
      event.preventDefault();
      setShowLiniaCantada(prev => !prev);
    } else if (key === 'q') {
      event.preventDefault();
      setShowQuinaMessage(prev => !prev);
    } else if (key === 'enter') {
      event.preventDefault();
      console.log('Enter detectado, llamando drawNextNumber');
      drawNextNumber();
    }
  }, [setShowLiniaCantada, setShowQuinaMessage, drawNextNumber]);

  useEffect(() => {
    console.log('KeyboardControls montado');
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      console.log('KeyboardControls desmontado');
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return null;
};

export default KeyboardControls;
