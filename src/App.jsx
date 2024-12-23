import React, { useState, useRef, useCallback } from 'react';
import './styles/App.css';
import LogoImage from './assets/logo.png';
import BingoBoard from './components/BingoBoard';
import CurrentNumber from './components/CurrentNumber';
import PreviousNumbers from './components/PreviousNumbers';
import useKeyboardControls from './hooks/useKeyboardControls';
import { launchFireworks, launchSchoolPride, stopConfetti } from './utils/confetti';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [previousNumbers, setPreviousNumbers] = useState([]);
  const [markedNumbers, setMarkedNumbers] = useState([]);
  const [showLiniaCantada, setShowLiniaCantada] = useState(false);
  const [showQuinaMessage, setShowQuinaMessage] = useState(false);
  const [animate, setAnimate] = useState(false);

  const fireworksIntervalRef = useRef(null);
  const schoolPrideAnimationRef = useRef(null);

  // Función para resetear el juego
  const resetGame = () => {
    setCurrentNumber(null);
    setMarkedNumbers([]);
    setPreviousNumbers([]);
    setAnimate(false);
  };

  // Función para generar un número aleatorio no utilizado
  const generateRandomNumber = () => {
    if (markedNumbers.length >= 90) {
      resetGame(); // Reseteamos cuando se han usado todos los números
      return generateRandomNumber(); // Generamos el primer número del nuevo juego
    }
    
    let number;
    do {
      number = Math.floor(Math.random() * 90) + 1;
    } while (markedNumbers.includes(number));
    return number;
  };

  // Manejador para marcar un nuevo número aleatorio
  const handleNewNumber = useCallback(() => {
    if (!showQuinaMessage) {
      const newNumber = generateRandomNumber();
      if (newNumber) {
        setCurrentNumber(newNumber);
        setMarkedNumbers(prev => [...prev, newNumber]);
        setPreviousNumbers(prev => [newNumber, ...prev.slice(0, 4)]);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500);
      }
    }
  }, [showQuinaMessage, markedNumbers]);

  const handleUndo = useCallback(() => {
    if (!showQuinaMessage && markedNumbers.length > 0) {
      const updatedMarkedNumbers = markedNumbers.slice(0, -1);
      const lastMarkedNumber = updatedMarkedNumbers[updatedMarkedNumbers.length - 1] || null;
      setMarkedNumbers(updatedMarkedNumbers);
      setPreviousNumbers(updatedMarkedNumbers.slice(-5));
      setCurrentNumber(lastMarkedNumber);
    }
  }, [markedNumbers, showQuinaMessage]);

  // Efecto para manejar los controles de teclado
  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleNewNumber();
      } else if (event.key === 'Backspace' || event.key === 'Delete') {
        handleUndo();
      } else if (event.key === 'l' || event.key === 'L') {
        setShowLiniaCantada(prev => !prev);
      } else if (event.key === 'q' || event.key === 'Q') {
        setShowQuinaMessage(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNewNumber, handleUndo]);

  React.useEffect(() => {
    if (showLiniaCantada) {
      launchFireworks(fireworksIntervalRef);
    } else {
      stopConfetti(fireworksIntervalRef, { current: null });
    }
  }, [showLiniaCantada]);

  React.useEffect(() => {
    if (showQuinaMessage) {
      launchFireworks(fireworksIntervalRef);
      launchSchoolPride(schoolPrideAnimationRef);
    } else {
      stopConfetti(fireworksIntervalRef, schoolPrideAnimationRef);
    }
  }, [showQuinaMessage]);

  return (
    <div className="app-container">
      <div className="current-number-box">
        <CurrentNumber 
          number={currentNumber} 
          animate={animate} 
          showQuinaMessage={showQuinaMessage} 
        />
      </div>

      <div className="side-box">
        <PreviousNumbers 
          numbers={previousNumbers} 
          showQuinaMessage={showQuinaMessage} 
        />
      </div>

      <div className={`large-box ${showQuinaMessage ? 'highlight' : ''}`}>
        <BingoBoard 
          markedNumbers={markedNumbers} 
          onNumberClick={() => {}} 
          showQuinaMessage={showQuinaMessage} 
        />
      </div>

      <div className="small-box">
        {showQuinaMessage ? (
          <span className="han-cantat-quina">HAN CANTAT QUINA! 🎉🎉🎉</span>
        ) : (
          showLiniaCantada && (
            <span className={`linia-cantada ${showLiniaCantada ? 'show' : ''}`}>
              LÍNIA CANTADA!! 🎉🎉
            </span>
          )
        )}
      </div>

      <div className="additional-box">
        <a 
          href="https://cursa-camells.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src={LogoImage} 
            alt="Logo Quina Tongo" 
            className="logo-image" 
          />
        </a>
      </div>
    </div>
  );
};

export default App;