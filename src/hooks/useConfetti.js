import confetti from 'canvas-confetti';

// Confeti continuo para "Línia Cantada"
export const startLiniaConfetti = (intervalRef) => {
  const end = Date.now() + 3000; // 3 segundos
  
  intervalRef.current = setInterval(() => {
    confetti({
      particleCount: 150,
      startVelocity: 30,
      spread: 360,
      ticks: 160,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      },
      zIndex: 1000
    });

    if (Date.now() >= end) {
      clearInterval(intervalRef.current);
    }
  }, 250);
};

// Confeti lateral para "Quina"
export const startQuinaConfetti = (intervalRef) => {
  const colors = ['#E94E18', '#312C86', '#FFFFFF'];
  const end = Date.now() + 10000; // 10 segundos

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });

    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      intervalRef.current = requestAnimationFrame(frame);
    }
  };

  frame();
};

// Detener todo el confeti
export const stopAllConfetti = (liniaRef, quinaRef) => {
  if (liniaRef?.current) {
    clearInterval(liniaRef.current);
  }
  if (quinaRef?.current) {
    cancelAnimationFrame(quinaRef.current);
  }
  confetti.reset();
};
