type GameBoardProps = {
  handleClickSelect: (rowIndex: number, colIndex: number) => void;
  board: string[][];
};

export function GameBoard({ handleClickSelect, board }: GameBoardProps) {
  return (
    <div>
      <menu className="flex gap-4 flex-col mt-4">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol className="flex gap-4">
              {row.map((col, colIndex) => (
                <li
                  className="bg-white w-[130px] h-[130px] rounded-xl text-[108px] leading-[120px] text-black flex items-center justify-center"
                  key={colIndex}
                >
                  <button
                    onClick={() => handleClickSelect(rowIndex, colIndex)}
                    className={`w-[130px] h-[130px] ${
                      col !== null ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={col !== null}
                  >
                    {col}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </menu>
    </div>
  );
}
