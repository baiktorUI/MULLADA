const BingoBoard = ({ markedNumbers, onNumberClick, showQuinaMessage }) => {
  return (
    <div className={`bingo-board ${showQuinaMessage ? 'disabled' : ''}`}>
      {[...Array(90)].map((_, index) => {
        const number = index + 1;
        const isMarked = markedNumbers.includes(number);

        return (
          <div
            key={number}
            className={`bingo-number ${isMarked ? 'marked' : 'clickable'} ${
              !isMarked && showQuinaMessage ? 'faded' : ''
            }`}
            onClick={() => !isMarked && !showQuinaMessage && onNumberClick(number)}
          >
            {number.toString().padStart(2, '0')}
          </div>
        );
      })}
    </div>
  );
};

export default BingoBoard;
