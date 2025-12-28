import { useCallback, useEffect } from 'react';

const KeyboardControls = ({ setShowLiniaCantada, setShowQuinaMessage, handleUndo }) => {
  const handleKeyPress = useCallback((event) => {
    switch (event.key.toLowerCase()) {
      case 'l':
        setShowLiniaCantada(prev => !prev);
        break;
      case 'q':
        setShowQuinaMessage(prev => !prev);
        break;
      case 'backspace':
        handleUndo();
        break;
      default:
        break;
    }
  }, [setShowLiniaCantada, setShowQuinaMessage, handleUndo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return null; // Este componente no renderiza nada
};

export default KeyboardControls;
