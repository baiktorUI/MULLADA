const BingoBoard = ({ markedNumbers, showQuinaMessage }) => {
  return (
    <div className={`bingo-board ${showQuinaMessage ? 'disabled' : ''}`}>
      {[...Array(90)].map((_, index) => {
        const number = index + 1;
        const isMarked = markedNumbers.includes(number);

        return (
          <div
            key={number}
            className={`bingo-number ${isMarked ? 'marked' : ''} ${
              !isMarked && showQuinaMessage ? 'faded' : ''
            }`}
          >
            {number.toString().padStart(2, '0')}
          </div>
        );
      })}
    </div>
  );
};

export default BingoBoard;
