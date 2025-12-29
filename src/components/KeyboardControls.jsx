import { useCallback, useEffect } from 'react';

const KeyboardControls = ({ setShowLiniaCantada, setShowQuinaMessage, drawNextNumber }) => {
  const handleKeyPress = useCallback((event) => {
    switch (event.key.toLowerCase()) {
      case 'l':
        setShowLiniaCantada(prev => !prev);
        break;
      case 'q':
        setShowQuinaMessage(prev => !prev);
        break;
      case 'enter':
        drawNextNumber();
        break;
      default:
        break;
    }
  }, [setShowLiniaCantada, setShowQuinaMessage, drawNextNumber]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return null;
};

export default KeyboardControls;
