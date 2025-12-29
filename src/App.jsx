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
  const [remainingNumbers, setRemainingNumbers] = useState([...Array(90)].map((_, i) => i + 1));
  const [animate, setAnimate] = useState(false);
  const [showLiniaCantada, setShowLiniaCantada] = useState(false);
  const [showQuinaMessage, setShowQuinaMessage] = useState(false);

  const liniaIntervalRef = useRef(null);
  const quinaIntervalRef = useRef(null);

  // Función para sacar el siguiente número aleatorio
  const drawNextNumber = useCallback(() => {
    if (remainingNumbers.length === 0) {
      // Reiniciar cuando se completen todos los números
      setCurrentNumber(null);
      setPreviousNumbers([]);
      setMarkedNumbers([]);
      setRemainingNumbers([...Array(90)].map((_, i) => i + 1));
      return;
    }

    // Seleccionar número aleatorio de los restantes
    const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
    const selectedNumber = remainingNumbers[randomIndex];

    // Actualizar estados
    setCurrentNumber(selectedNumber);
    setMarkedNumbers(prev => [...prev, selectedNumber]);
    setPreviousNumbers(prev => [selectedNumber, ...prev.slice(0, 4)]);
    setRemainingNumbers(prev => prev.filter((_, idx) => idx !== randomIndex));

    // Activar animación
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  }, [remainingNumbers]);

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
        drawNextNumber={drawNextNumber}
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
