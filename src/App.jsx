import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';
import BingoBoard from './components/BingoBoard';
import CurrentNumber from './components/CurrentNumber';
import PreviousNumbers from './components/PreviousNumbers';
import KeyboardControls from './components/KeyboardControls';
import { 
  startLiniaConfetti, 
  startQuinaConfetti, 
  stopAllConfetti 
} from './hooks/useConfetti';
import logo from './assets/logo.png';

function App() {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [previousNumbers, setPreviousNumbers] = useState([]);
  const [markedNumbers, setMarkedNumbers] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [showLiniaCantada, setShowLiniaCantada] = useState(false);
  const [showQuinaMessage, setShowQuinaMessage] = useState(false);

  const liniaIntervalRef = useRef(null);
  const quinaIntervalRef = useRef(null);

  // Función para marcar número con click
  const handleNumberClick = (number) => {
    // No permitir clicks si está activado el mensaje de Quina
    if (showQuinaMessage || markedNumbers.includes(number)) {
      return;
    }

    // Actualizar número actual
    setCurrentNumber(number);
    
    // Añadir a marcados
    setMarkedNumbers(prev => [...prev, number]);
    
    // Actualizar historial (máximo 5 números anteriores)
    setPreviousNumbers(prev => [number, ...prev.slice(0, 4)]);
    
    // Activar animación
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  // Función para deshacer último número
  const handleUndo = useCallback(() => {
    if (showQuinaMessage || markedNumbers.length === 0) {
      return;
    }

    // Remover último número marcado
    const newMarked = markedNumbers.slice(0, -1);
    const newPrevious = newMarked.slice(-5);
    const newCurrent = newMarked[newMarked.length - 1] || null;

    setMarkedNumbers(newMarked);
    setPreviousNumbers(newPrevious);
    setCurrentNumber(newCurrent);
  }, [markedNumbers, showQuinaMessage]);

  // Efectos de confeti
  useEffect(() => {
    if (showLiniaCantada) {
      startLiniaConfetti(liniaIntervalRef);
    } else {
      stopAllConfetti(liniaIntervalRef, { current: null });
    }
  }, [showLiniaCantada]);

  useEffect(() => {
    if (showQuinaMessage) {
      startLiniaConfetti(liniaIntervalRef);
      startQuinaConfetti(quinaIntervalRef);
    } else {
      stopAllConfetti(liniaIntervalRef, quinaIntervalRef);
    }
  }, [showQuinaMessage]);

  return (
    <div className="app-container">
      <KeyboardControls 
        setShowLiniaCantada={setShowLiniaCantada}
        setShowQuinaMessage={setShowQuinaMessage}
        handleUndo={handleUndo}
      />
      
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
          onNumberClick={handleNumberClick}
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
        <img src={logo} alt="Logo UuhQE" className="logo-image" />
      </div>
    </div>
  );
}

export default App;
